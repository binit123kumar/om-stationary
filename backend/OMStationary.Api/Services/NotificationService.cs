using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

// Writes durable, database-backed notifications for order lifecycle events.
// Delivery channels (WhatsApp / SMS / Email / Push) are recorded on the same row so a real
// provider worker can pick them up later. Nothing here pretends a message was sent: the
// InApp channel is the only one marked Sent, and only because the customer can actually read it.
public sealed class NotificationService(OmDbContext db)
{
    public const string InApp = "InApp";

    public static readonly IReadOnlyDictionary<string, string> OrderStatusMessages =
        new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            ["Placed"] = "We have received your order.",
            ["Pending"] = "We have received your order and are confirming stock.",
            ["Confirmed"] = "Your order has been confirmed by OM Stationary.",
            ["Accepted"] = "Your order has been accepted.",
            ["Preparing"] = "Your order is being prepared.",
            ["Ready for Pickup"] = "Your order is packed and ready for pickup at OM Stationary.",
            ["Picked Up"] = "Your order has been picked up.",
            ["Out for Delivery"] = "Your order is out for delivery.",
            ["Delivered"] = "Your order has been delivered.",
            ["Delivery Failed"] = "Delivery could not be completed. Our team will contact you.",
            ["Cancelled"] = "Your order has been cancelled.",
            ["PaymentPending"] = "Waiting for your payment to complete.",
            ["PaymentSuccess"] = "Payment received. Thank you for shopping with OM Stationary.",
            ["PaymentFailed"] = "Your payment could not be completed. You can retry from your order page.",
            ["RefundPending"] = "A refund has been requested for your order.",
            ["Refunded"] = "Your refund has been processed."
        };

    /// <summary>
    /// Records an in-app notification for an order. The recipient is always the customer who placed
    /// the order - there is deliberately no way to redirect it to the staff member, delivery partner
    /// or any other user who happened to trigger the event.
    /// </summary>
    public void AddForOrder(Order order, string eventName, string? message = null)
    {
        // Guest checkout has no account to notify.
        if (order.CustomerUserId is null) return;
        var text = message ?? (OrderStatusMessages.TryGetValue(eventName, out var known)
            ? known
            : $"Order status updated to {eventName}.");
        var now = DateTime.UtcNow;
        db.Notifications.Add(new Notification
        {
            UserId = order.CustomerUserId.Value,
            OrderId = order.Id,
            Channel = InApp,
            Event = eventName,
            Title = $"Order {order.OrderNumber}",
            Message = text,
            Status = "Sent",
            SentAt = now,
            CreatedAt = now
        });
    }

    public static string? MessageFor(string eventName) =>
        OrderStatusMessages.TryGetValue(eventName, out var known) ? known : null;
}
