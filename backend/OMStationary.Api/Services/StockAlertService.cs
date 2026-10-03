using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

/// <summary>
/// Raises the low-stock alert when a product crosses its configured threshold.
///
/// Kept separate from the WhatsApp service so the trigger logic (crossing detection, de-duplication)
/// is independent of the delivery channel, and so a product edit, a manual stock adjustment and a
/// real order all go through exactly the same rule.
/// </summary>
public sealed class StockAlertService(IWhatsAppNotificationService whatsapp, ILogger<StockAlertService> logger)
{
    /// <summary>Send an alert if the product is at or below its threshold.</summary>
    public async Task NotifyLowStockIfNeededAsync(Product product, string reason, CancellationToken cancellationToken = default)
    {
        if (!product.IsActive) return;
        if (product.Stock > product.LowStockThreshold) return;
        try
        {
            await whatsapp.NotifyLowStockAsync(product, cancellationToken);
        }
        catch (Exception e)
        {
            // Alerting is best-effort and must never fail the admin action that triggered it.
            logger.LogError(e, "Low-stock alert could not be raised for product {ProductId} ({Reason}).", product.Id, reason);
        }
    }
}