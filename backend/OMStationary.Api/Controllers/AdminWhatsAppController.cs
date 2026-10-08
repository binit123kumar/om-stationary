using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using OMStationary.Api.Data;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

/// <summary>
/// Admin control surface for WhatsApp Business Cloud API notifications.
///
/// GET  /api/admin/whatsapp          configuration status (no secrets) + notification log
/// PUT  /api/admin/whatsapp/settings enable/disable + which event types are forwarded
/// POST /api/admin/whatsapp/test     attempt a real test message to the admin number
/// POST /api/admin/whatsapp/{id}/retry   re-attempt one failed notification
///
/// The access token is never returned and never accepted from the browser - it is read from
/// configuration only, so no browser payload can change a credential.
/// </summary>
[ApiController, Authorize(Roles = "Admin"), Route("api/admin/whatsapp")]
public sealed class AdminWhatsAppController(
    OmDbContext db,
    IWhatsAppNotificationService whatsapp,
    IOptions<WhatsAppOptions> options,
    IConfiguration configuration) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    [HttpGet]
    public async Task<IActionResult> Status([FromQuery] string? type = null, [FromQuery] string? logStatus = null,
        [FromQuery] int take = 50, CancellationToken cancellationToken = default)
    {
        var s = options.Value;
        take = Math.Clamp(take, 1, 200);

        var query = db.WhatsAppNotifications.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(type)) query = query.Where(x => x.NotificationType == type);
        if (!string.IsNullOrWhiteSpace(logStatus)) query = query.Where(x => x.Status == logStatus);

        var log = await query.OrderByDescending(x => x.Id).Take(take)
            .Select(x => new
            {
                x.Id, x.OrderId, x.NotificationType, x.Recipient, x.Status, x.ErrorMessage,
                x.ProviderMessageId, x.Attempts, x.CreatedAt, x.SentAt, x.DeliveredAt,
                x.Message,
                OrderNumber = x.OrderId == null ? null : db.Orders.Where(o => o.Id == x.OrderId).Select(o => o.OrderNumber).FirstOrDefault()
            }).ToListAsync();

        var counts = await db.WhatsAppNotifications.AsNoTracking()
            .GroupBy(x => x.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync();

        return Ok(new
        {
            // Never include AccessToken, PhoneNumberId or BusinessAccountId values.
            configuration = new
            {
                enabled = s.Enabled,
                adminNumber = s.AdminNumber,
                adminNumberNormalised = WhatsAppOptions.Normalise(s.AdminNumber),
                apiVersion = s.ApiVersion,
                configured = s.IsConfigured,
                status = s.IsConfigured ? "Configured" : "Not configured",
                missing = s.MissingSettings(),
                provider = s.Provider,
                secretsExposed = false,
                note = s.IsConfigured
                    ? "Credentials are present in server configuration. Messages will be sent through the WhatsApp Business Cloud API."
                    : "WhatsApp notification provider is not configured. No message was sent; orders continue to work normally."
            },
            eventTypes = new
            {
                newOrder = s.NotifyNewOrder,
                orderStatus = s.NotifyOrderStatus,
                paymentUpdate = s.NotifyPayment,
                lowStock = s.NotifyLowStock,
                newCustomer = s.NotifyNewCustomer
            },
            counts = counts,
            total = await db.WhatsAppNotifications.CountAsync(cancellationToken),
            log
        });
    }

    [HttpPut("settings")]
    public async Task<IActionResult> UpdateSettings([FromBody] WhatsAppSettingsRequest request)
    {
        var before = options.Value;
        // Snapshot the previous switches for the audit trail, before any of them is overwritten.
        var previous = Describe(before);
        if (request.Enabled.HasValue) before.Enabled = request.Enabled.Value;
        if (request.NotifyNewOrder.HasValue) before.NotifyNewOrder = request.NotifyNewOrder.Value;
        if (request.NotifyOrderStatus.HasValue) before.NotifyOrderStatus = request.NotifyOrderStatus.Value;
        if (request.NotifyPayment.HasValue) before.NotifyPayment = request.NotifyPayment.Value;
        if (request.NotifyLowStock.HasValue) before.NotifyLowStock = request.NotifyLowStock.Value;
        if (request.NotifyNewCustomer.HasValue) before.NotifyNewCustomer = request.NotifyNewCustomer.Value;

        // Options is bound from configuration; update the live configuration so the change takes
        // effect immediately. Persistence across a restart stays a deployment concern (appsettings /
        // environment variables) - the runtime value is authoritative for this process.
        configuration[$"{WhatsAppOptions.SectionName}:Enabled"] = before.Enabled.ToString();
        configuration[$"{WhatsAppOptions.SectionName}:NotifyNewOrder"] = before.NotifyNewOrder.ToString();
        configuration[$"{WhatsAppOptions.SectionName}:NotifyOrderStatus"] = before.NotifyOrderStatus.ToString();
        configuration[$"{WhatsAppOptions.SectionName}:NotifyPayment"] = before.NotifyPayment.ToString();
        configuration[$"{WhatsAppOptions.SectionName}:NotifyLowStock"] = before.NotifyLowStock.ToString();
        configuration[$"{WhatsAppOptions.SectionName}:NotifyNewCustomer"] = before.NotifyNewCustomer.ToString();

        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "WhatsAppSettingsUpdated",
            EntityType = "WhatsApp",
            EntityId = "config",
            OldValue = previous,
            NewValue = Describe(before)
        });
        await db.SaveChangesAsync();
        return await Status();
    }

    /// <summary>
    /// Attempts a real message to the configured admin number. If credentials are missing this returns
    /// an honest failure - it never reports a send that did not happen.
    /// </summary>
    [HttpPost("test")]
    public async Task<IActionResult> SendTest(CancellationToken cancellationToken)
    {
        var s = options.Value;
        if (!s.IsConfigured)
        {
            return Ok(new
            {
                attempted = false,
                success = false,
                message = "WhatsApp Business API is not configured.",
                missing = s.MissingSettings()
            });
        }
        var result = await whatsapp.SendAsync(WhatsAppNotificationTypes.Test, null,
            "✅ *OM Stationary WhatsApp test*\n\nThis is a real test message from the OM Stationary admin panel.\n*Time:* " +
            DateTime.Now.ToString("dd MMM yyyy, hh:mm tt"));
        return Ok(new
        {
            attempted = result.Attempted,
            success = result.Success,
            status = result.Status,
            providerMessageId = result.ProviderMessageId,
            error = result.Error,
            message = result.Success
                ? "The WhatsApp Business API accepted the test message."
                : "The WhatsApp Business API did not accept the test message."
        });
    }

    [HttpPost("{id:int}/retry")]
    public async Task<IActionResult> Retry(int id, CancellationToken cancellationToken)
    {
        var row = await db.WhatsAppNotifications.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (row is null) return NotFound(new { detail = "That notification was not found." });
        if (row.Status == WhatsAppNotificationStatuses.Sent)
            return BadRequest(new { detail = "That notification was already accepted by the provider." });

        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "WhatsAppRetry",
            EntityType = "WhatsAppNotification",
            EntityId = id.ToString(),
            OldValue = $"status={row.Status}",
            NewValue = "retry requested"
        });
        await db.SaveChangesAsync(cancellationToken);

        // Re-send the exact stored body so a retry cannot differ from what was originally queued.
var result = await whatsapp.SendAsync(row.NotificationType, row.OrderId, row.Message, row.Recipient, cancellationToken);
        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "WhatsAppRetryResult",
            EntityType = "WhatsAppNotification",
            EntityId = id.ToString(),
            OldValue = $"status={row.Status}",
            NewValue = $"status={result.Status}"
        });
        await db.SaveChangesAsync(cancellationToken);
        return Ok(new { attempted = result.Attempted, success = result.Success, status = result.Status, error = result.Error });
    }

    /// <summary>Audit-log representation of the switches. Contains no credential values.</summary>
    private static string Describe(WhatsAppOptions s) =>
        $"enabled={s.Enabled} newOrder={s.NotifyNewOrder} status={s.NotifyOrderStatus} " +
        $"payment={s.NotifyPayment} lowStock={s.NotifyLowStock} newCustomer={s.NotifyNewCustomer}";
}

public sealed class WhatsAppSettingsRequest
{
    public bool? Enabled { get; set; }
    public bool? NotifyNewOrder { get; set; }
    public bool? NotifyOrderStatus { get; set; }
    public bool? NotifyPayment { get; set; }
    public bool? NotifyLowStock { get; set; }
    public bool? NotifyNewCustomer { get; set; }
}
