using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

public sealed class SettlementService(OmDbContext db, IConfiguration configuration)
{
    public async Task CreateForDeliveredOrder(int orderId, CancellationToken cancellationToken = default)
    {
        var order = await db.Orders.FirstOrDefaultAsync(x => x.Id == orderId, cancellationToken);
        if (order?.PartnerShopId is not int shopId || await db.Settlements.AnyAsync(x => x.OrderId == orderId, cancellationToken)) return;
        var percent = configuration.GetValue<decimal?>("Settlements:CommissionPercent");
        var validRate = percent is >= 0 and <= 100;
        var commission = validRate ? Math.Round(order.Subtotal * percent!.Value / 100m, 2, MidpointRounding.AwayFromZero) : 0;
        var delivery = await db.Deliveries.Where(x => x.OrderId == orderId).Select(x => (decimal?)x.Charge).FirstOrDefaultAsync(cancellationToken) ?? 0;
        db.Settlements.Add(new Settlement
        {
            OrderId = orderId, PartnerShopId = shopId,
            PartnerAmount = validRate ? order.Subtotal - commission : 0,
            CommissionAmount = commission, DeliveryAmount = delivery,
            Status = validRate ? (order.PaymentStatus == "Paid" ? "Payable" : "PendingPayment") : "PendingConfiguration"
        });
        await db.SaveChangesAsync(cancellationToken);
    }
}
