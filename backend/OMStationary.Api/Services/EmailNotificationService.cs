using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace OMStationary.Api.Services;

/// <summary>
/// Email configuration bound from the <c>Email</c> configuration section.
/// 
/// SMTP credentials are stored in server configuration only and never returned by APIs.
/// In deployment these come from environment variables: Email__Enabled, Email__SmtpHost,
/// Email__SmtpPort, Email__SmtpUser, Email__SmtpPassword, Email__FromAddress, Email__FromName.
/// </summary>
public sealed class EmailOptions
{
    public const string SectionName = "Email";

    public bool Enabled { get; set; }
    public string Provider { get; set; } = "SMTP";
    public string SmtpHost { get; set; } = "";
    public int SmtpPort { get; set; } = 587;
    public bool EnableSsl { get; set; } = true;
    public string SmtpUser { get; set; } = "";
    public string SmtpPassword { get; set; } = "";
    public string FromAddress { get; set; } = "";
    public string FromName { get; set; } = "OM Stationary";

    /// <summary>Which events trigger email notifications. Defaults to all enabled.</summary>
    public bool NotifyNewOrder { get; set; } = true;
    public bool NotifyOrderStatus { get; set; } = true;
    public bool NotifyPayment { get; set; } = true;

    public bool IsConfigured =>
        Enabled &&
        Provider.Equals("SMTP", StringComparison.OrdinalIgnoreCase) &&
        !string.IsNullOrWhiteSpace(SmtpHost) &&
        SmtpPort > 0 &&
        !string.IsNullOrWhiteSpace(SmtpUser) &&
        !string.IsNullOrWhiteSpace(SmtpPassword) &&
        !string.IsNullOrWhiteSpace(FromAddress);
}

public sealed record EmailSendResult(bool Attempted, bool Success, string Status, string? Error);

/// <summary>Email notification service using SMTP.</summary>
public interface IEmailNotificationService
{
    Task<EmailSendResult> SendAsync(string recipient, string subject, string body, CancellationToken cancellationToken = default);
    Task NotifyOrderCreatedAsync(string recipient, string orderNumber, CancellationToken cancellationToken = default);
    Task NotifyAdminOrderCreatedAsync(string recipient, string orderNumber, CancellationToken cancellationToken = default);
    Task NotifyOrderStatusAsync(string recipient, string orderNumber, string status, CancellationToken cancellationToken = default);
    Task NotifyPaymentReceivedAsync(string recipient, string orderNumber, decimal amount, CancellationToken cancellationToken = default);
}

/// <summary>
/// SMTP email service. A successful result means the configured SMTP server accepted the message.
/// </summary>
public sealed class EmailNotificationService(
    IOptions<EmailOptions> options,
    ILogger<EmailNotificationService> logger) : IEmailNotificationService
{
    public async Task<EmailSendResult> SendAsync(string recipient, string subject, string body, CancellationToken cancellationToken = default)
    {
        var settings = options.Value;

        if (!settings.IsConfigured)
        {
            logger.LogInformation("Email not sent: SMTP is not configured.");
            return new EmailSendResult(false, false, "NotConfigured", "SMTP is not configured.");
        }

        try
        {
            using var mail = new MailMessage
            {
                From = new MailAddress(settings.FromAddress, settings.FromName),
                Subject = subject,
                Body = body,
                SubjectEncoding = System.Text.Encoding.UTF8,
                BodyEncoding = System.Text.Encoding.UTF8,
                IsBodyHtml = false
            };
            mail.To.Add(new MailAddress(recipient));

            using var smtp = new SmtpClient(settings.SmtpHost, settings.SmtpPort)
            {
                EnableSsl = settings.EnableSsl,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(settings.SmtpUser, settings.SmtpPassword),
                Timeout = 20_000
            };
            await smtp.SendMailAsync(mail, cancellationToken);
            logger.LogInformation("SMTP server accepted an outgoing email.");
            return new EmailSendResult(true, true, "Sent", null);
        }
        catch (Exception e)
        {
            logger.LogError(e, "SMTP email send failed.");
            return new EmailSendResult(true, false, "Failed", "The SMTP server did not accept the email.");
        }
    }

    public Task NotifyOrderCreatedAsync(string recipient, string orderNumber, CancellationToken cancellationToken = default) =>
        options.Value.NotifyNewOrder
            ? SendAsync(recipient, $"Order Confirmation - {orderNumber}",
                $"Thank you for your order {orderNumber}. We have received your order and will confirm it shortly.", cancellationToken)
            : Task.FromResult(new EmailSendResult(false, false, "Disabled", "New-order email notifications are disabled."));

    public Task NotifyAdminOrderCreatedAsync(string recipient, string orderNumber, CancellationToken cancellationToken = default) =>
        options.Value.NotifyNewOrder
            ? SendAsync(recipient, "New OM Stationary order",
                $"Order {orderNumber} was placed. Review it in the admin panel.", cancellationToken)
            : Task.FromResult(new EmailSendResult(false, false, "Disabled", "New-order email notifications are disabled."));

    public Task NotifyOrderStatusAsync(string recipient, string orderNumber, string status, CancellationToken cancellationToken = default) =>
        options.Value.NotifyOrderStatus
            ? SendAsync(recipient, $"Order Status Update - {orderNumber}",
                $"Your order {orderNumber} status has been updated to: {status}", cancellationToken)
            : Task.FromResult(new EmailSendResult(false, false, "Disabled", "Order-status email notifications are disabled."));

    public Task NotifyPaymentReceivedAsync(string recipient, string orderNumber, decimal amount, CancellationToken cancellationToken = default) =>
        options.Value.NotifyPayment
            ? SendAsync(recipient, $"Payment Received - {orderNumber}",
                $"Payment of {amount} INR has been received for your order {orderNumber}. Thank you for shopping with OM Stationary.", cancellationToken)
            : Task.FromResult(new EmailSendResult(false, false, "Disabled", "Payment email notifications are disabled."));
}
