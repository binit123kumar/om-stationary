using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace OMStationary.Api.Services;

/// <summary>
/// SMS configuration bound from the <c>Sms</c> configuration section.
/// 
/// API credentials are stored in server configuration only and never returned by APIs.
/// In deployment these come from environment variables: Sms__Enabled, Sms__Provider,
/// Sms__ApiKey, Sms__SenderId, Sms__DefaultCountryCode.
/// </summary>
public sealed class SmsOptions
{
    public const string SectionName = "Sms";

    public bool Enabled { get; set; }
    public string Provider { get; set; } = "Twilio";
    public string AccountSid { get; set; } = "";
    public string ApiKey { get; set; } = "";
    public string SenderId { get; set; } = "OMSTAT";
    public string DefaultCountryCode { get; set; } = "91";

    /// <summary>Which events trigger SMS notifications. Defaults to all enabled.</summary>
    public bool NotifyNewOrder { get; set; } = true;
    public bool NotifyOrderStatus { get; set; } = true;
    public bool NotifyPayment { get; set; } = true;

    public bool IsConfigured =>
        Enabled &&
        string.Equals(Provider, "Twilio", StringComparison.OrdinalIgnoreCase) &&
        !string.IsNullOrWhiteSpace(AccountSid) &&
        !string.IsNullOrWhiteSpace(ApiKey) &&
        SenderId.Length is >= 9 and <= 16 && SenderId.StartsWith('+') && SenderId[1..].All(char.IsDigit);
}

public sealed record SmsSendResult(bool Attempted, bool Success, string Status, string? Error);

/// <summary>SMS notification service.</summary>
public interface ISmsNotificationService
{
    Task<SmsSendResult> SendAsync(string recipient, string message, CancellationToken cancellationToken = default);
    Task NotifyOrderCreatedAsync(string recipient, string orderNumber, CancellationToken cancellationToken = default);
    Task NotifyAdminOrderCreatedAsync(string recipient, string orderNumber, CancellationToken cancellationToken = default);
    Task NotifyOrderStatusAsync(string recipient, string orderNumber, string status, CancellationToken cancellationToken = default);
    Task NotifyPaymentReceivedAsync(string recipient, string orderNumber, decimal amount, CancellationToken cancellationToken = default);
}

/// <summary>
/// Twilio SMS service. A successful result means Twilio accepted the request; delivery is
/// confirmed only by a provider delivery callback, which this application does not yet expose.
/// </summary>
public sealed class SmsNotificationService(
    HttpClient http,
    IOptions<SmsOptions> options,
    ILogger<SmsNotificationService> logger) : ISmsNotificationService
{
    public async Task<SmsSendResult> SendAsync(string recipient, string message, CancellationToken cancellationToken = default)
    {
        var settings = options.Value;

        if (!settings.IsConfigured)
        {
            logger.LogInformation("SMS not sent: SMS provider is not configured.");
            return new SmsSendResult(false, false, "NotConfigured", "SMS provider is not configured.");
        }

        try
        {
            var normalizedRecipient = NormalizePhoneNumber(recipient, settings.DefaultCountryCode);
            if (normalizedRecipient.Length < 9 || normalizedRecipient[0] != '+')
                return new SmsSendResult(false, false, "InvalidRecipient", "The recipient phone number is invalid.");

            var accountSid = Uri.EscapeDataString(settings.AccountSid.Trim());
            using var request = new HttpRequestMessage(HttpMethod.Post,
                $"https://api.twilio.com/2010-04-01/Accounts/{accountSid}/Messages.json");
            var basic = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{settings.AccountSid}:{settings.ApiKey}"));
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", basic);
            request.Content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["To"] = normalizedRecipient,
                ["From"] = settings.SenderId.Trim(),
                ["Body"] = message
            });

            using var response = await http.SendAsync(request, cancellationToken);
            if (!response.IsSuccessStatusCode)
            {
                logger.LogWarning("Twilio rejected an SMS request with HTTP {StatusCode}.", (int)response.StatusCode);
                return new SmsSendResult(true, false, "Failed", "The SMS provider rejected the request.");
            }

            await using var responseStream = await response.Content.ReadAsStreamAsync(cancellationToken);
            using var payload = await JsonDocument.ParseAsync(responseStream, cancellationToken: cancellationToken);
            if (!payload.RootElement.TryGetProperty("sid", out var sid) ||
                sid.ValueKind != JsonValueKind.String || string.IsNullOrWhiteSpace(sid.GetString()))
            {
                logger.LogWarning("Twilio returned a successful response without a message id.");
                return new SmsSendResult(true, false, "InvalidProviderResponse", "The SMS provider returned an incomplete response.");
            }

            logger.LogInformation("Twilio accepted an SMS request.");
            return new SmsSendResult(true, true, "Accepted", null);
        }
        catch (Exception e)
        {
            logger.LogError(e, "Twilio SMS request failed.");
            return new SmsSendResult(true, false, "Failed", "The SMS provider request failed.");
        }
    }

    public Task NotifyOrderCreatedAsync(string recipient, string orderNumber, CancellationToken cancellationToken = default) =>
        options.Value.NotifyNewOrder
            ? SendAsync(recipient,
                $"OM Stationary: Order {orderNumber} received. We will confirm it shortly. Thank you for shopping with us!", cancellationToken)
            : Task.FromResult(new SmsSendResult(false, false, "Disabled", "New-order SMS notifications are disabled."));

    public Task NotifyAdminOrderCreatedAsync(string recipient, string orderNumber, CancellationToken cancellationToken = default) =>
        options.Value.NotifyNewOrder
            ? SendAsync(recipient, $"OM Stationary: New order {orderNumber}. Review it in the admin panel.", cancellationToken)
            : Task.FromResult(new SmsSendResult(false, false, "Disabled", "New-order SMS notifications are disabled."));

    public Task NotifyOrderStatusAsync(string recipient, string orderNumber, string status, CancellationToken cancellationToken = default) =>
        options.Value.NotifyOrderStatus
            ? SendAsync(recipient,
                $"OM Stationary: Order {orderNumber} status updated to {status}. Track your order in the app.", cancellationToken)
            : Task.FromResult(new SmsSendResult(false, false, "Disabled", "Order-status SMS notifications are disabled."));

    public Task NotifyPaymentReceivedAsync(string recipient, string orderNumber, decimal amount, CancellationToken cancellationToken = default) =>
        options.Value.NotifyPayment
            ? SendAsync(recipient,
                $"OM Stationary: Payment of {amount} INR received for order {orderNumber}. Thank you!", cancellationToken)
            : Task.FromResult(new SmsSendResult(false, false, "Disabled", "Payment SMS notifications are disabled."));

    private static string NormalizePhoneNumber(string phone, string defaultCountryCode)
    {
        var digits = new string((phone ?? "").Where(char.IsDigit).ToArray());
        
        if (digits.StartsWith("00", StringComparison.Ordinal)) digits = digits[2..];
        if (digits.Length == 11 && digits.StartsWith('0')) digits = digits[1..];
        if (digits.Length == 10)
            digits = defaultCountryCode + digits;
        
        return digits.Length is >= 11 and <= 15 ? "+" + digits : "";
    }
}
