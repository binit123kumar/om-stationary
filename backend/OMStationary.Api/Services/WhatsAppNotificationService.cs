using System.Globalization;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OMStationary.Api.Data;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

/// <summary>
/// Strongly typed WhatsApp configuration, bound from the <c>WhatsApp</c> configuration section.
///
/// The access token lives here and ONLY here. It is never returned by an API, never written to the
/// database, and never included in an audit log. In deployment these come from environment
/// variables: WhatsApp__Enabled, WhatsApp__AdminNumber, WhatsApp__PhoneNumberId,
/// WhatsApp__BusinessAccountId, WhatsApp__AccessToken, WhatsApp__ApiVersion.
/// </summary>
public sealed class WhatsAppOptions
{
    public const string SectionName = "WhatsApp";

    public bool Enabled { get; set; }
    public string Provider { get; set; } = "Your API";
    public string AdminNumber { get; set; } = "";
    public string PhoneNumberId { get; set; } = "";
    public string BusinessAccountId { get; set; } = "";
    public string AccessToken { get; set; } = "";
    public string ApiVersion { get; set; } = "v21.0";

    /// <summary>Which events are forwarded to the admin number. Defaults to all enabled.</summary>
    public bool NotifyNewOrder { get; set; } = true;
    public bool NotifyOrderStatus { get; set; } = true;
    public bool NotifyPayment { get; set; } = true;
    public bool NotifyLowStock { get; set; } = true;
    public bool NotifyNewCustomer { get; set; } = true;

    public bool Allow(string notificationType) => notificationType switch
    {
        WhatsAppNotificationTypes.NewOrder => NotifyNewOrder,
        WhatsAppNotificationTypes.OrderStatus => NotifyOrderStatus,
        WhatsAppNotificationTypes.PaymentUpdate => NotifyPayment,
        WhatsAppNotificationTypes.LowStock => NotifyLowStock,
        WhatsAppNotificationTypes.NewCustomer => NotifyNewCustomer,
        _ => true
    };

    /// <summary>
    /// True only when a real send could be attempted: the feature is on, the admin number looks like
    /// a real international number, and every Cloud API credential is present.
    /// </summary>
    public bool IsConfigured
    {
        get
        {
            if (!Enabled) return false;
            if (!Provider.Equals("WhatsApp Business Cloud API", StringComparison.OrdinalIgnoreCase)) return false;
            if (!IsPhoneNumber(AdminNumber)) return false;
            if (PhoneNumberId.Trim().Length == 0) return false;
            if (AccessToken.Trim().Length == 0) return false;
            if (ApiVersion.Trim().Length == 0) return false;
            return true;
        }
    }

    public IReadOnlyList<string> MissingSettings()
    {
        var missing = new List<string>();
        if (!Enabled) missing.Add("WhatsApp:Enabled");
        if (!Provider.Equals("WhatsApp Business Cloud API", StringComparison.OrdinalIgnoreCase)) missing.Add("WhatsApp:Provider");
        if (!IsPhoneNumber(AdminNumber)) missing.Add("WhatsApp:AdminNumber");
        if (PhoneNumberId.Trim().Length == 0) missing.Add("WhatsApp:PhoneNumberId");
        if (AccessToken.Trim().Length == 0) missing.Add("WhatsApp:AccessToken");
        if (ApiVersion.Trim().Length == 0) missing.Add("WhatsApp:ApiVersion");
        return missing;
    }

    /// <summary>WhatsApp Cloud API expects digits only, e.g. 919525594357.</summary>
    public static string Normalise(string? value)
    {
        var digits = new string((value ?? "").Where(char.IsDigit).ToArray());
        return digits.Length == 10 ? "91" + digits : digits;
    }

    public static bool IsPhoneNumber(string? value)
    {
        var digits = new string((value ?? "").Where(char.IsDigit).ToArray());
        return digits.Length is >= 10 and <= 15;
    }
}

public sealed record WhatsAppSendResult(bool Attempted, bool Success, string Status, string? ProviderMessageId, string? Error);

/// <summary>Outbound WhatsApp notifications. Implementations must never throw for a delivery failure.</summary>
public interface IWhatsAppNotificationService
{
    Task<WhatsAppSendResult> SendAsync(string notificationType, int? orderId, string message, string? recipient = null, CancellationToken cancellationToken = default);
    Task NotifyOrderCreatedAsync(Order order, CancellationToken cancellationToken = default);
    Task NotifyOrderStatusAsync(Order order, CancellationToken cancellationToken = default);
    Task NotifyPaymentReceivedAsync(Order order, string? transactionId, CancellationToken cancellationToken = default);
    Task NotifyNewCustomerAsync(string fullName, string email, string phone, CancellationToken cancellationToken = default);
    Task NotifyLowStockAsync(Product product, CancellationToken cancellationToken = default);
}

/// <summary>
/// WhatsApp Business Cloud API client.
///
/// The outbound call is fire-and-observe: the caller (order creation, status change, payment
/// verification) never waits on it for correctness and never rolls back because of it. Each attempt
/// is written to <see cref="WhatsAppNotification"/> before the call and updated with the provider's
/// own response afterwards, so "Sent" or "Delivered" only ever appear as a result of a real
/// provider response.
/// </summary>
public sealed class WhatsAppNotificationService(
    OmDbContext db,
    IHttpClientFactory httpClientFactory,
    IOptions<WhatsAppOptions> options,
    ILogger<WhatsAppNotificationService> logger) : IWhatsAppNotificationService
{
    // Rolling window used to suppress repeated low-stock alerts for the same product state.
    private const int LowStockRepeatSuppressionHours = 24;

    public async Task<WhatsAppSendResult> SendAsync(string notificationType, int? orderId, string message, string? recipient = null, CancellationToken cancellationToken = default)
    {
        var settings = options.Value;
        var target = WhatsAppOptions.Normalise(recipient ?? settings.AdminNumber);
        var trimmed = message.Length > 4000 ? message[..4000] : message;

        // The log row is written first so an admin can always see that a notification was expected,
        // even if the process dies mid-send.
        var row = new WhatsAppNotification
        {
            OrderId = orderId,
            NotificationType = notificationType,
            Recipient = target.Length == 0 ? "(not configured)" : target,
            Message = trimmed,
            Status = WhatsAppNotificationStatuses.Pending
        };
        db.WhatsAppNotifications.Add(row);

        if (!settings.IsConfigured || !settings.Allow(notificationType))
        {
            var reason = settings.IsConfigured
                ? "This notification type is switched off in the WhatsApp settings."
                : $"WhatsApp Business API is not configured. Missing: {string.Join(", ", settings.MissingSettings())}";
            // NotConfigured is a real, honest outcome - no provider call was made.
            row.Status = WhatsAppNotificationStatuses.NotConfigured;
            row.ErrorMessage = reason.Length > 600 ? reason[..600] : reason;
            await db.SaveChangesAsync(cancellationToken);
            logger.LogInformation("WhatsApp notification {Type} for order {OrderId} not sent: {Reason}", notificationType, orderId, reason);
            return new WhatsAppSendResult(false, false, row.Status, null, row.ErrorMessage);
        }

        try
        {
            var client = httpClientFactory.CreateClient(WhatsAppHttpClient.Name);
            client.BaseAddress = new Uri($"https://graph.facebook.com/{settings.ApiVersion.Trim('/')}/");
            // Bearer token in the header only: it is never logged and never placed in a URL, which
            // would leak it into request logs and proxies.
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", settings.AccessToken);

            var payload = new
            {
                messaging_product = "whatsapp",
                recipient_type = "individual",
                to = target,
                type = "text",
                text = new { preview_url = false, body = trimmed }
            };

            row.Attempts++;
            using var response = await client.PostAsJsonAsync($"{settings.PhoneNumberId}/messages", payload, cancellationToken);
            var body = await response.Content.ReadAsStringAsync(cancellationToken);

            if (!response.IsSuccessStatusCode)
            {
                row.Status = WhatsAppNotificationStatuses.Failed;
                row.ErrorMessage = Summarise($"HTTP {(int)response.StatusCode}", body);
                await db.SaveChangesAsync(cancellationToken);
                logger.LogWarning("WhatsApp notification {Type} for order {OrderId} failed with HTTP {Status}.", notificationType, orderId, (int)response.StatusCode);
                return new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage);
            }

            // Only a 2xx from the provider counts as sent. The id is whatever they returned.
            var messageId = ExtractMessageId(body);
            row.Status = WhatsAppNotificationStatuses.Sent;
            row.ProviderMessageId = messageId;
            row.SentAt = DateTime.UtcNow;
            row.ErrorMessage = null;
            await db.SaveChangesAsync(cancellationToken);
            logger.LogInformation("WhatsApp notification {Type} for order {OrderId} accepted by the provider (messageId {MessageId}).", notificationType, orderId, messageId ?? "(none returned)");
            return new WhatsAppSendResult(true, true, row.Status, messageId, null);
        }
        catch (TaskCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            row.Status = WhatsAppNotificationStatuses.Failed;
            row.ErrorMessage = "The WhatsApp provider did not respond within the timeout.";
            await db.SaveChangesAsync(cancellationToken);
            return new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage);
        }
        catch (HttpRequestException e)
        {
            row.Status = WhatsAppNotificationStatuses.Failed;
            row.ErrorMessage = Summarise("Network error", e.Message);
            await db.SaveChangesAsync(cancellationToken);
            logger.LogWarning(e, "WhatsApp notification {Type} for order {OrderId} could not reach the provider.", notificationType, orderId);
            return new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage);
        }
        catch (Exception e)
        {
            // A notification problem must never propagate into order creation.
            row.Status = WhatsAppNotificationStatuses.Failed;
            row.ErrorMessage = Summarise("Unexpected error", e.Message);
            try { await db.SaveChangesAsync(cancellationToken); } catch { /* logging row lost, order still fine */ }
            logger.LogError(e, "Unexpected WhatsApp failure for {Type}.", notificationType);
            return new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage);
        }
    }

    public Task NotifyOrderCreatedAsync(Order order, CancellationToken cancellationToken = default) =>
        SendAsync(WhatsAppNotificationTypes.NewOrder, order.Id, OrderMessages.NewOrder(order), cancellationToken: cancellationToken);

    public Task NotifyOrderStatusAsync(Order order, CancellationToken cancellationToken = default) =>
        SendAsync(WhatsAppNotificationTypes.OrderStatus, order.Id, OrderMessages.Status(order), cancellationToken: cancellationToken);

    public Task NotifyPaymentReceivedAsync(Order order, string? transactionId, CancellationToken cancellationToken = default) =>
        SendAsync(WhatsAppNotificationTypes.PaymentUpdate, order.Id, OrderMessages.Payment(order, transactionId), cancellationToken: cancellationToken);

    public Task NotifyNewCustomerAsync(string fullName, string email, string phone, CancellationToken cancellationToken = default) =>
        SendAsync(WhatsAppNotificationTypes.NewCustomer, null, OrderMessages.NewCustomer(fullName, email, phone), cancellationToken: cancellationToken);

    /// <summary>
    /// Low-stock alert with duplicate suppression: the same product at the same stock level will not
    /// alert again inside the repeat window, so restocking cycles do not spam the admin.
    /// </summary>
    public async Task NotifyLowStockAsync(Product product, CancellationToken cancellationToken = default)
    {
        var cutoff = DateTime.UtcNow.AddHours(-LowStockRepeatSuppressionHours);
        var alreadySent = await db.WhatsAppNotifications
            .Where(x => x.NotificationType == WhatsAppNotificationTypes.LowStock &&
                        x.CreatedAt >= cutoff &&
                        x.Message.Contains(product.Sku) &&
                        x.Status == WhatsAppNotificationStatuses.Sent)
            .AnyAsync(cancellationToken);
        if (alreadySent) return;
        await SendAsync(WhatsAppNotificationTypes.LowStock, null, OrderMessages.LowStock(product), cancellationToken: cancellationToken);
    }

    private static string Summarise(string prefix, string detail)
    {
        // Provider bodies can be long and can echo request content; keep only the safe, short part.
        var clean = detail.Replace("\r", " ").Replace("\n", " ");
        if (clean.Length > 480) clean = clean[..480];
        return $"{prefix}: {clean}";
    }

    private static string? ExtractMessageId(string json)
    {
        try
        {
            using var document = JsonDocument.Parse(json);
            if (!document.RootElement.TryGetProperty("messages", out var messages)) return null;
            foreach (var message in messages.EnumerateArray())
            {
                if (message.TryGetProperty("id", out var id)) return id.GetString();
            }
        }
        catch (JsonException) { /* a non-JSON 2xx body simply has no id to record */ }
        return null;
    }
}

/// <summary>One place for every WhatsApp message body, so wording cannot drift between call sites.</summary>
internal static class OrderMessages
{
    private static string Money(decimal value) => "\u20B9" + value.ToString("N2", CultureInfo.InvariantCulture);
    private static string When(DateTime utc) => utc.ToLocalTime().ToString("dd MMM yyyy, hh:mm tt", CultureInfo.InvariantCulture);

    /// <summary>
    /// Appends one WhatsApp line. The Cloud API expects a bare \n, so Windows' \r\n is never used -
    /// a stray carriage return renders as a visible artefact in the chat bubble.
    /// </summary>
    private static StringBuilder Line(this StringBuilder builder, string text)
    {
        builder.Append(text).Append('\n');
        return builder;
    }

    /// <summary>Appends a blank separator line.</summary>
    private static StringBuilder Line(this StringBuilder builder)
    {
        builder.Append('\n');
        return builder;
    }

    /// <summary>Appends "*Label:* value" as a single line, so the value never wraps to its own row.</summary>
    private static StringBuilder Field(this StringBuilder builder, string label, string value)
    {
        builder.Append('*').Append(label).Append(":* ").Append(value).Append('\n');
        return builder;
    }

    public static string NewOrder(Order o)
    {
        var b = new StringBuilder();
        b.Line("\ud83d\uded2 *NEW ORDER RECEIVED*");
        b.Line("*OM STATIONARY*");
        b.Line();
        b.Field("Order No", o.OrderNumber);
        b.Field("Customer", o.CustomerName);
        b.Field("Mobile", o.CustomerPhone);
        if (!string.IsNullOrWhiteSpace(o.CustomerEmail)) b.Field("Email", o.CustomerEmail);
        b.Field("Location", o.DeliveryAddress);
        if (!string.IsNullOrWhiteSpace(o.City)) b.Line(o.City);
        if (!string.IsNullOrWhiteSpace(o.Pincode)) b.Line("PIN " + o.Pincode);
        b.Line();
        b.Line("*Items:*");
        var n = 1;
        foreach (var item in o.Items)
            b.Line($"{n++}. {item.ProductName} \u00d7 {item.Quantity} = {Money(item.UnitPrice * item.Quantity)}");
        b.Line();
        b.Field("Subtotal", Money(o.Subtotal));
        b.Field("Discount", Money(o.DiscountAmount));
        b.Field("GST", Money(o.TaxAmount));
        b.Field("Delivery", Money(o.DeliveryCharge));
        b.Line();
        b.Line($"*GRAND TOTAL: {Money(o.TotalAmount)}*");
        b.Line();
        b.Field("Payment Method", o.PaymentMethod);
        b.Field("Payment Status", o.PaymentStatus);
        b.Field("Fulfillment", o.SourceType == "OMStationaryPickup" ? "Pickup from OM Stationary" : "Home Delivery");
        b.Field("Order Date", When(o.CreatedAt));
        b.Line();
        b.Line($"*Admin Panel:* /admin/orders/{o.Id.ToString(CultureInfo.InvariantCulture)}");
        return b.ToString();
    }

    public static string Status(Order o)
    {
        var b = new StringBuilder();
        b.Line(o.Status switch
        {
            "Delivered" => "\u2705 *ORDER DELIVERED*",
            "Cancelled" => "\u26a0\ufe0f *ORDER CANCELLED*",
            "Out for Delivery" => "\ud83d\ude9a *OUT FOR DELIVERY*",
            "Ready for Pickup" => "\ud83d\udce6 *READY FOR PICKUP*",
            "Preparing" => "\ud83d\udce6 *ORDER PREPARING*",
            _ => "\ud83d\udce6 *ORDER STATUS UPDATE*"
        });
        b.Line("*OM STATIONARY*");
        b.Line();
        b.Field("Order No", o.OrderNumber);
        b.Field("Customer", o.CustomerName);
        b.Field("Status", o.Status);
        b.Field("Total", Money(o.TotalAmount));
        b.Field("Payment", $"{o.PaymentMethod} \u00b7 {o.PaymentStatus}");
        b.Field("Updated", When(DateTime.UtcNow));
        return b.ToString();
    }

    public static string Payment(Order o, string? transactionId)
    {
        var b = new StringBuilder();
        b.Line("\ud83d\udcb3 *PAYMENT RECEIVED*");
        b.Line("*OM STATIONARY*");
        b.Line();
        b.Field("Order No", o.OrderNumber);
        b.Field("Customer", o.CustomerName);
        b.Field("Amount", Money(o.TotalAmount));
        b.Field("Method", o.PaymentMethod);
        b.Field("Status", "PAID");
        // Only ever the reference the gateway returned; "Not available" otherwise.
        b.Field("Transaction", string.IsNullOrWhiteSpace(transactionId) ? "Not available" : transactionId);
        b.Field("Time", When(DateTime.UtcNow));
        return b.ToString();
    }

    public static string LowStock(Product p)
    {
        var b = new StringBuilder();
        b.Line("\u26a0\ufe0f *LOW STOCK ALERT*");
        b.Line("*OM STATIONARY*");
        b.Line();
        b.Field("Product", p.Name);
        b.Field("SKU", p.Sku);
        b.Field("Current Stock", p.Stock.ToString(CultureInfo.InvariantCulture));
        b.Field("Threshold", p.LowStockThreshold.ToString(CultureInfo.InvariantCulture));
        b.Line();
        b.Line("Please restock this product.");
        return b.ToString();
    }

    public static string NewCustomer(string fullName, string email, string phone)
    {
        var b = new StringBuilder();
        b.Line("\ud83d\udc64 *NEW CUSTOMER REGISTERED*");
        b.Line("*OM STATIONARY*");
        b.Line();
        b.Field("Name", fullName);
        b.Field("Email", email);
        b.Field("Mobile", phone);
        b.Field("Date", When(DateTime.UtcNow));
        return b.ToString();
    }
}
public static class WhatsAppHttpClient
{
    public const string Name = "whatsapp-cloud-api";
}
