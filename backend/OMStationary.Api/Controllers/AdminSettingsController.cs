using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

/// <summary>
/// Admin-editable store configuration.
///
/// Reads return the effective configuration (database override on top of appsettings) plus a flag
/// per field saying whether it is overridden. Writes only ever touch the override row, so a bad
/// edit can be reverted by clearing the field and the deployed configuration takes over again.
///
/// Payment credentials are never read, written or returned here.
/// </summary>
[ApiController, Authorize(Roles = "Admin"), Route("api/admin/settings")]
public sealed class AdminSettingsController(OmDbContext db, StoreSettingsService settings) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        var effectiveSettings = await settings.GetAsync(cancellationToken);
        var settingsOverrides = await settings.GetOverrideAsync(cancellationToken);
        return Ok(new
        {
            store = new
            {
                effectiveSettings.BusinessName, effectiveSettings.BusinessAddress, effectiveSettings.Phone, effectiveSettings.Email, effectiveSettings.PlusCode, effectiveSettings.Tagline,
                hours = effectiveSettings.PickupHours,
                businessNameOverridden = settingsOverrides.StoreName is not null,
                addressOverridden = settingsOverrides.StoreAddress is not null,
                phoneOverridden = settingsOverrides.StorePhone is not null,
                emailOverridden = settingsOverrides.StoreEmail is not null
            },
            billing = new
            {
                taxRatePercent = effectiveSettings.TaxRatePercent,
                taxRegistration = effectiveSettings.TaxRegistration,
                taxRegistrationConfigured = effectiveSettings.TaxRegistration.Length > 0,
                udyamRegistration = effectiveSettings.UdyamRegistration,
                udyamRegistrationConfigured = effectiveSettings.UdyamRegistration.Length > 0,
                invoicePrefix = effectiveSettings.InvoicePrefix,
                taxRateOverridden = settingsOverrides.TaxRatePercent is not null,
                udyamOverridden = settingsOverrides.UdyamRegistration is not null,
                // GST is 0% today; the calculation path is rate-driven so a future rate needs no
                // code change beyond this configuration value.
                workedExample = new
                {
                    note = "Taxable value x rate = tax. Taxable value + tax + delivery = grand total.",
                    taxRatePercent = effectiveSettings.TaxRatePercent
                }
            },
            pickup = new
            {
                effectiveSettings.PickupAddress, hours = effectiveSettings.PickupHours,
                effectiveSettings.PickupOpensAt, effectiveSettings.PickupClosesAt,
                effectiveSettings.PickupAvailable, effectiveSettings.PickupLatitude, effectiveSettings.PickupLongitude,
                overridden = settingsOverrides.PickupAddress is not null ||
                             settingsOverrides.PickupHours is not null ||
                             settingsOverrides.PickupAvailable is not null
            },
            delivery = new
            {
                effectiveSettings.DeliveryEnabled, cities = effectiveSettings.DeliveryCities,
                charge = effectiveSettings.DeliveryCharge, maxRadiusKm = effectiveSettings.DeliveryMaxRadiusKm,
                overridden = settingsOverrides.DeliveryEnabled is not null ||
                             settingsOverrides.DeliveryCharge is not null ||
                             settingsOverrides.DeliveryMaxRadiusKm is not null ||
                             settingsOverrides.DeliveryCities is not null
            },
            // Provider status only. Merchant id / key / client id / access token are never returned.
            payment = new
            {
                effectiveSettings.PaymentProvider, effectiveSettings.PaymentEnabled, effectiveSettings.PaymentEnvironment,
                // Declared once, explicitly. Including e.GatewayConfigured as well produced two
                // members that both serialise to "gatewayConfigured" under camelCase, and
                // System.Text.Json rejects the whole response with a name collision (HTTP 503).
                gatewayConfigured = effectiveSettings.GatewayConfigured,
                status = effectiveSettings.GatewayConfigured ? "Configured" : "Not configured",
                note = effectiveSettings.GatewayConfigured
                    ? "A payment gateway is configured. Online UPI is offered and verified server-side."
                    : "No payment gateway credentials are configured. Online UPI is unavailable and orders stay Pending. COD continues to work.",
                secretsExposed = false
            },
            updatedAt = effectiveSettings.UpdatedAt,
            editableFields = new[]
            {
                "storeName", "storeAddress", "storePhone", "storeEmail",
                "taxRatePercent", "taxRegistration", "udyamRegistration", "invoicePrefix",
                "pickupAddress", "pickupHours", "pickupAvailable",
                "deliveryEnabled", "deliveryCities", "deliveryCharge", "deliveryMaxRadiusKm"
            }
        });
    }

    /// <summary>
    /// Saves an override. Any field sent as null is reset to "use configuration". An empty string is
    /// stored as an explicit blank, which is how an admin clears e.g. a wrong Udyam number - the
    /// invoice then reports "Not configured" rather than showing a stale value.
    /// </summary>
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] StoreSettingsWriteRequest request, CancellationToken cancellationToken)
    {
        var row = await settings.GetOverrideAsync(cancellationToken);
        var actor = CurrentUserId;
        var changes = new List<string>();

        void Track(string field, object? before, object? after)
        {
            var oldText = before?.ToString() ?? "";
            var newText = after?.ToString() ?? "";
            if (string.Equals(oldText, newText, StringComparison.Ordinal)) return;
            changes.Add($"{field}: '{oldText}' -> '{newText}'");
        }

        if (request.StoreName is not null) { Track("StoreName", row.StoreName, request.StoreName); row.StoreName = request.StoreName.Trim(); }
        if (request.StoreAddress is not null) { Track("StoreAddress", row.StoreAddress, request.StoreAddress); row.StoreAddress = request.StoreAddress.Trim(); }
        if (request.StorePhone is not null) { Track("StorePhone", row.StorePhone, request.StorePhone); row.StorePhone = request.StorePhone.Trim(); }
        if (request.StoreEmail is not null) { Track("StoreEmail", row.StoreEmail, request.StoreEmail); row.StoreEmail = request.StoreEmail.Trim(); }
        if (request.StoreHours is not null) { Track("PickupHours", row.PickupHours, request.StoreHours); row.PickupHours = request.StoreHours.Trim(); }

        if (request.TaxRatePercent.HasValue)
        {
            if (request.TaxRatePercent.Value is < 0 or > 100)
                return BadRequest(new { detail = "GST rate must be between 0 and 100." });
            Track("TaxRatePercent", row.TaxRatePercent, request.TaxRatePercent); row.TaxRatePercent = request.TaxRatePercent;
        }
        if (request.TaxRegistration is not null) { Track("TaxRegistration", row.TaxRegistration, request.TaxRegistration); row.TaxRegistration = request.TaxRegistration.Trim(); }
        if (request.UdyamRegistration is not null) { Track("UdyamRegistration", row.UdyamRegistration, request.UdyamRegistration); row.UdyamRegistration = request.UdyamRegistration.Trim(); }
        if (request.InvoicePrefix is not null)
        {
            var prefix = request.InvoicePrefix.Trim();
            if (prefix.Length > 0 && !prefix.All(c => char.IsLetterOrDigit(c) || c == '-'))
                return BadRequest(new { detail = "Invoice prefix may only contain letters, digits and hyphens." });
            Track("InvoicePrefix", row.InvoicePrefix, prefix); row.InvoicePrefix = prefix;
        }

        if (request.PickupAddress is not null) { Track("PickupAddress", row.PickupAddress, request.PickupAddress); row.PickupAddress = request.PickupAddress.Trim(); }
        if (request.PickupHours is not null) { Track("PickupHours", row.PickupHours, request.PickupHours); row.PickupHours = request.PickupHours.Trim(); }
        if (request.PickupAvailable.HasValue) { Track("PickupAvailable", row.PickupAvailable, request.PickupAvailable); row.PickupAvailable = request.PickupAvailable; }

        if (request.DeliveryEnabled.HasValue) { Track("DeliveryEnabled", row.DeliveryEnabled, request.DeliveryEnabled); row.DeliveryEnabled = request.DeliveryEnabled; }
        if (request.DeliveryCities is not null)
        {
            var cities = string.Join(",", request.DeliveryCities.Select(c => c.Trim()).Where(c => c.Length > 0).Distinct(StringComparer.OrdinalIgnoreCase));
            Track("DeliveryCities", row.DeliveryCities, cities); row.DeliveryCities = cities.Length == 0 ? null : cities;
        }
        if (request.DeliveryCharge.HasValue)
        {
            if (request.DeliveryCharge.Value < 0) return BadRequest(new { detail = "Delivery charge cannot be negative." });
            Track("DeliveryCharge", row.DeliveryCharge, request.DeliveryCharge); row.DeliveryCharge = request.DeliveryCharge;
        }
        if (request.DeliveryMaxRadiusKm.HasValue)
        {
            if (request.DeliveryMaxRadiusKm.Value <= 0) return BadRequest(new { detail = "Maximum delivery radius must be greater than zero." });
            Track("DeliveryMaxRadiusKm", row.DeliveryMaxRadiusKm, request.DeliveryMaxRadiusKm); row.DeliveryMaxRadiusKm = request.DeliveryMaxRadiusKm;
        }

        row.UpdatedByUserId = actor;
        row.UpdatedAt = DateTime.UtcNow;

        // One audit row per save. Only these non-secret fields are ever recorded.
        db.AuditLogs.Add(new AuditLog
        {
            UserId = actor,
            Action = "StoreSettingsUpdated",
            EntityType = "StoreSettings",
            EntityId = row.Id.ToString(),
            OldValue = Truncate(changes.Count == 0 ? "(no change)" : string.Join(" | ", changes)),
            NewValue = Truncate($"fields={changes.Count}")
        });

        await db.SaveChangesAsync(cancellationToken);
        return await Get(cancellationToken);
    }

    internal static string? Truncate(string? value) =>
        value is { Length: > 500 } ? value[..500] : value;
}

public sealed class StoreSettingsWriteRequest
{
    public string? StoreName { get; set; }
    public string? StoreAddress { get; set; }
    public string? StorePhone { get; set; }
    public string? StoreEmail { get; set; }
    public string? StoreHours { get; set; }
    public decimal? TaxRatePercent { get; set; }
    public string? TaxRegistration { get; set; }
    public string? UdyamRegistration { get; set; }
    public string? InvoicePrefix { get; set; }
    public string? PickupAddress { get; set; }
    public string? PickupHours { get; set; }
    public bool? PickupAvailable { get; set; }
    public bool? DeliveryEnabled { get; set; }
    public List<string>? DeliveryCities { get; set; }
    public decimal? DeliveryCharge { get; set; }
    public double? DeliveryMaxRadiusKm { get; set; }
}