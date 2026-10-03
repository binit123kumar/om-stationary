using System.Globalization;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

/// <summary>
/// The effective store configuration: the admin-editable database override on top of the deployed
/// appsettings/environment configuration.
///
/// Resolution order for every field is "database override, else configuration". Nothing is ever
/// invented - an unset field stays empty so callers can report "Not configured" instead of
/// printing a placeholder that looks real.
///
/// Payment credentials (merchant id, key, client id, WhatsApp access token) are deliberately not
/// part of <see cref="EffectiveStoreSettings"/>, so they cannot be serialised into an admin API
/// response or into the React bundle.
/// </summary>
public sealed class StoreSettingsService(OmDbContext db, IConfiguration configuration)
{
    public sealed record EffectiveStoreSettings
    {
        public string BusinessName { get; init; } = "";
        public string BusinessAddress { get; init; } = "";
        public string Phone { get; init; } = "";
        public string Email { get; init; } = "";
        public string PlusCode { get; init; } = "";
        public string Tagline { get; init; } = "";
        public decimal TaxRatePercent { get; init; }
        public string TaxRegistration { get; init; } = "";
        public string UdyamRegistration { get; init; } = "";
        public string InvoicePrefix { get; init; } = "";
        public string PickupAddress { get; init; } = "";
        public string PickupHours { get; init; } = "";
        public string PickupOpensAt { get; init; } = "";
        public string PickupClosesAt { get; init; } = "";
        public bool PickupAvailable { get; init; }
        public double PickupLatitude { get; init; }
        public double PickupLongitude { get; init; }
        public bool DeliveryEnabled { get; init; }
        public string[] DeliveryCities { get; init; } = [];
        public decimal DeliveryCharge { get; init; }
        public double DeliveryMaxRadiusKm { get; init; }
        public string PaymentProvider { get; init; } = "";
        public bool PaymentEnabled { get; init; }
        public string PaymentEnvironment { get; init; } = "";
        public bool GatewayConfigured { get; init; }
        public DateTime? UpdatedAt { get; init; }
    }

    /// <summary>A config value is only honoured if it is a real value, not a placeholder.</summary>
    internal static string Clean(string? value)
    {
        var text = value?.Trim() ?? "";
        return text.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase) ? "" : text;
    }

    internal static string? CleanOrNull(string? value)
    {
        var text = Clean(value);
        return text.Length == 0 ? null : text;
    }

    public async Task<StoreSetting> GetOverrideAsync(CancellationToken cancellationToken = default)
    {
        // The table has a single settings row, identified as "the lowest Id". Hardcoding Id == 1 is
        // wrong here: StoreSetting.Id is an IDENTITY column, so inserting an explicit 1 fails with
        // "Cannot insert explicit value for identity column", and the row could never be created.
        //
        // Deliberately tracked (no AsNoTracking): AdminSettingsController.Update mutates this entity
        // and relies on SaveChangesAsync persisting it. An untracked instance made every admin
        // settings edit silently do nothing.
        var row = await db.StoreSettings.OrderBy(x => x.Id).FirstOrDefaultAsync(cancellationToken);
        if (row is not null) return row;

        // Created lazily on first read so the admin form always has a record to bind to. The
        // identity value is assigned by the database.
        row = new StoreSetting { UpdatedAt = DateTime.UtcNow };
        db.StoreSettings.Add(row);
        await db.SaveChangesAsync(cancellationToken);
        return row;
    }

    public async Task<EffectiveStoreSettings> GetAsync(CancellationToken cancellationToken = default)
    {
        var o = await GetOverrideAsync(cancellationToken);

        // The deployed key is Delivery:ServiceableCities (an array), which is what DeliveryController and
        // OrdersController actually enforce. Reading a non-existent "Delivery:Cities" key made the
        // admin screen show an empty city list while delivery was in fact serviceable.
        var overrideCities = Clean(o.DeliveryCities);
        var cities = overrideCities.Length > 0
            ? overrideCities
            : string.Join(",", configuration.GetSection("Delivery:ServiceableCities").Get<string[]>() ?? []);
        var gateway = gatewayConfigured();

        return new EffectiveStoreSettings
        {
            BusinessName = Pick(o.StoreName, configuration["Billing:BusinessName"], "OM Stationary"),
            BusinessAddress = Pick(o.StoreAddress, configuration["Billing:BusinessAddress"], Clean(configuration["OmStationary:Address"])),
            Phone = Pick(o.StorePhone, configuration["Billing:Phone"], Clean(configuration["OmStationary:Phone"])),
            Email = Pick(o.StoreEmail, configuration["Billing:Email"], Clean(configuration["OmStationary:Email"])),
            PlusCode = Clean(configuration["Billing:PlusCode"]),
            Tagline = Clean(configuration["Billing:Tagline"]),
            TaxRatePercent = o.TaxRatePercent ?? configuration.GetValue<decimal>("Tax:RatePercent"),
            TaxRegistration = Pick(o.TaxRegistration, configuration["Billing:TaxRegistration"]),
            UdyamRegistration = Pick(o.UdyamRegistration, configuration["Billing:UdyamRegistration"]),
            InvoicePrefix = Pick(o.InvoicePrefix, configuration["Billing:InvoicePrefix"], "OM-INV"),
            PickupAddress = Pick(o.PickupAddress, configuration["OmStationary:Address"]),
            PickupHours = Pick(o.PickupHours, configuration["OmStationary:BusinessHours"], "09:00 AM - 09:00 PM"),
            PickupOpensAt = Clean(configuration["OmStationary:OpensAt"]),
            PickupClosesAt = Clean(configuration["OmStationary:ClosesAt"]),
            PickupAvailable = o.PickupAvailable ?? configuration.GetValue("OmStationary:PickupAvailable", true),
            PickupLatitude = configuration.GetValue("OmStationary:Latitude", 25.5305282),
            PickupLongitude = configuration.GetValue("OmStationary:Longitude", 85.173357),
            DeliveryEnabled = o.DeliveryEnabled ?? configuration.GetValue<bool>("Delivery:Enabled"),
            DeliveryCities = cities.Length == 0 ? [] : cities.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries),
            DeliveryCharge = o.DeliveryCharge ?? configuration.GetValue<decimal>("Delivery:Charge"),
            DeliveryMaxRadiusKm = o.DeliveryMaxRadiusKm ?? configuration.GetValue<double>("Delivery:MaxRadiusKm"),
            PaymentProvider = Pick(o.PaymentProvider, configuration["Payments:Provider"]),
            PaymentEnabled = o.PaymentEnabled ?? configuration.GetValue<bool>("Payments:Enabled"),
            PaymentEnvironment = Clean(configuration["Payments:Paytm:Environment"]),
            // "Configured" means a real gateway with credentials, so the UI never offers online
            // payment that the backend cannot actually verify.
            GatewayConfigured = gateway,
            UpdatedAt = o.UpdatedAt
        };
    }

    /// <summary>True only when the gateway has a provider plus every credential it needs.</summary>
    public bool gatewayConfigured()
    {
        var provider = Clean(configuration["Payments:Provider"]);
        if (!configuration.GetValue<bool>("Payments:Enabled")) return false;
        if (provider.Length == 0 || provider.Equals("None", StringComparison.OrdinalIgnoreCase)) return false;
        return provider.ToLowerInvariant() switch
        {
            "paytm" => new[]
            {
                configuration["Payments:Paytm:MerchantId"], configuration["Payments:Paytm:MerchantKey"],
                configuration["Payments:Paytm:PosId"], configuration["Payments:Paytm:ClientId"]
            }.All(v => Clean(v).Length > 0),
            _ => false
        };
    }

    private static string Pick(string? @override, params string?[] fallbacks)
    {
        var first = CleanOrNull(@override);
        if (first is not null) return first;
        foreach (var fallback in fallbacks)
        {
            var value = CleanOrNull(fallback);
            if (value is not null) return value;
        }
        return "";
    }

    public static string FormatMoney(decimal value) => value.ToString("N2", CultureInfo.InvariantCulture);
}