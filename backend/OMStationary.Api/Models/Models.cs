namespace OMStationary.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Slug { get; set; } = "";
    public string Category { get; set; } = "";
    public decimal Price { get; set; }
    public decimal MRP { get; set; }
    public string ImageUrl { get; set; } = "";
    public string Description { get; set; } = "";
    public string ShortDescription { get; set; } = "";
    public string Sku { get; set; } = "";
    public string Brand { get; set; } = "";
    public string Unit { get; set; } = "Piece";
    public decimal Discount { get; set; }
    public int Stock { get; set; } = 0;
    public int LowStockThreshold { get; set; } = 5;
    public int? CategoryId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<ProductImage> Images { get; set; } = new();
}

public class PartnerShop
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string OwnerName { get; set; } = "";
    public string Address { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Pincode { get; set; } = "";
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public bool IsApproved { get; set; }
    public bool IsActive { get; set; } = true;
    public bool SupportsDelivery { get; set; } = true;
    public int EstimatedDeliveryMinutes { get; set; } = 120;
    public Guid? UserId { get; set; }
}

public class ShopProduct
{
    public int Id { get; set; }
    public int PartnerShopId { get; set; }
    public int ProductId { get; set; }
    public decimal SellingPrice { get; set; }
    public int Stock { get; set; }
    public bool IsAvailable { get; set; } = true;
}

public class Order
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = "";
    public string CustomerName { get; set; } = "";
    public string CustomerPhone { get; set; } = "";
    public string CustomerEmail { get; set; } = "";
    public string BillingAddress { get; set; } = "";
    public string DeliveryAddress { get; set; } = "";
    public string City { get; set; } = "Patna";
    public string Pincode { get; set; } = "";
    public DateTime? RequestedDeliveryDate { get; set; }
    public decimal Subtotal { get; set; }
    public decimal DeliveryCharge { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal TaxAmount { get; set; }
    public string CouponCode { get; set; } = "";
    public decimal TotalAmount { get; set; }
    public string PaymentMethod { get; set; } = "COD";
    public string PaymentStatus { get; set; } = "Pending";
    public string Status { get; set; } = "Placed";
    public string SourceType { get; set; } = "OMStationaryDelivery";
    public string SourceReference { get; set; } = "";
    public Guid? CustomerUserId { get; set; }
    public int? PartnerShopId { get; set; }
    public string? TrackingTokenHash { get; set; }
    public string DeliveryInstructions { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<OrderItem> Items { get; set; } = new();
    public List<OrderStatusHistory> StatusHistory { get; set; } = new();
}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = "";
    public string Sku { get; set; } = "";
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

public class Delivery
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string PartnerName { get; set; } = "Local Delivery";
    public string Status { get; set; } = "Pending";
    public string PickupAddress { get; set; } = "";
    public string DropAddress { get; set; } = "";
    public string TrackingCode { get; set; } = "";
    public decimal Charge { get; set; }
    public int? DeliveryPartnerId { get; set; }
    public string Instructions { get; set; } = "";
    public DateTime? AssignedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}

public class ApplicationUser
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string Role { get; set; } = "Customer";
    public int? RoleId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class AppRole
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}

public class CustomerProfile
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public string FullName { get; set; } = "";
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Address
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public string Label { get; set; } = "Home";
    public string RecipientName { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Line1 { get; set; } = "";
    public string Line2 { get; set; } = "";
    public string City { get; set; } = "";
    public string State { get; set; } = "";
    public string Pincode { get; set; } = "";
    public double? Latitude { get; set; }
    public double? Longitude { get; set; }
    public bool IsDefault { get; set; }
}

public class RefreshToken
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string TokenHash { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }
}

public class Cart
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<CartItem> Items { get; set; } = new();
}

public class CartItem
{
    public int Id { get; set; }
    public int CartId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public bool IsActive { get; set; } = true;
}

public class ProductImage
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Url { get; set; } = "";
    public int SortOrder { get; set; }
}

public class OrderStatusHistory
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string Status { get; set; } = "";
    public string? Note { get; set; }
    public Guid? ChangedByUserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Payment
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string Provider { get; set; } = "COD";
    public string Status { get; set; } = "Pending";
    public decimal Amount { get; set; }
    public string? ProviderReference { get; set; }
    public string? QrData { get; set; }
    public string? QrImageBase64 { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? PaidAt { get; set; }
}

public class Invoice
{
    public int Id { get; set; }
    public string InvoiceNumber { get; set; } = "";
    public int OrderId { get; set; }
    public string OrderNumber { get; set; } = "";
    public Guid? CustomerId { get; set; }
    public DateTime InvoiceDate { get; set; } = DateTime.UtcNow;
    public decimal Subtotal { get; set; }
    public decimal Discount { get; set; }
    public decimal DeliveryCharge { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal GrandTotal { get; set; }
    public string PaymentMethod { get; set; } = "COD";
    public string PaymentStatus { get; set; } = "Pending";
    public string FulfillmentMethod { get; set; } = "Pickup";
    public string BillingAddress { get; set; } = "";
    public string ShippingAddress { get; set; } = "";
    public string CustomerName { get; set; } = "";
    public string CustomerPhone { get; set; } = "";
    public string CustomerEmail { get; set; } = "";
    public string DocumentReference { get; set; } = "";
    public int PdfGenerationCount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<InvoiceLine> Items { get; set; } = new();
}

public class InvoiceLine
{
    public int Id { get; set; }
    public int InvoiceId { get; set; }
    public string ProductName { get; set; } = "";
    public string Sku { get; set; } = "";
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Discount { get; set; }
}

public class Refund
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public decimal Amount { get; set; }
    public string Status { get; set; } = "Pending";
    public string? ProviderReference { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class DeliveryPartner
{
    public int Id { get; set; }
    public Guid? UserId { get; set; }
    public string Name { get; set; } = "";
    public string Mobile { get; set; } = "";
    public string Email { get; set; } = "";
    public string VehicleType { get; set; } = "";
    public string VehicleNumber { get; set; } = "";
    public string Status { get; set; } = "Inactive";
    public bool IsAvailable { get; set; }
}

public class DeliveryStatusHistory
{
    public int Id { get; set; }
    public int DeliveryId { get; set; }
    public string Status { get; set; } = "";
    public Guid? ChangedByUserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Coupon
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string DiscountType { get; set; } = "Percentage";
    public decimal DiscountValue { get; set; }
    public decimal MinimumOrderValue { get; set; }
    public decimal? MaximumDiscount { get; set; }
    public int UsageLimit { get; set; }
    public int UsageCount { get; set; }
    public DateTime StartsAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public bool IsActive { get; set; }
}

public class Notification
{
    public int Id { get; set; }
    public Guid? UserId { get; set; }
    public int? OrderId { get; set; }
    public string Channel { get; set; } = "InApp";
    public string Event { get; set; } = "";
    public string Title { get; set; } = "";
    public string Message { get; set; } = "";
    public bool IsRead { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? SentAt { get; set; }
}

public class AuditLog
{
    public long Id { get; set; }
    public Guid? UserId { get; set; }
    public string Action { get; set; } = "";
    public string EntityType { get; set; } = "";
    public string EntityId { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    // Before/after snapshots for admin changes. Credentials are never written here: the audit
    // writer drops any payload whose key looks like a secret.
    public string? OldValue { get; set; }
    public string? NewValue { get; set; }
}

/// <summary>
/// Single-row, admin-editable store configuration. Every nullable column is an OVERRIDE of the
/// matching appsettings value; null means "use the deployed configuration". Payment credentials are
/// deliberately absent - only the provider name and enabled flag live here, while the merchant
/// key/secret stay server-side in configuration.
/// </summary>
/// <summary>
/// Durable log of every WhatsApp Business Cloud API attempt.
///
/// A row is written BEFORE the outbound call and updated with the provider response afterwards, so
/// a failed send is always visible to an admin and can be retried. A row is only marked Sent when
/// the provider itself returned success; nothing is optimistically marked as delivered.
/// </summary>
public class WhatsAppNotification
{
    public int Id { get; set; }
    public int? OrderId { get; set; }
    public Order? Order { get; set; }
    public string NotificationType { get; set; } = "";
    public string Recipient { get; set; } = "";
    public string Message { get; set; } = "";
    public string? ProviderMessageId { get; set; }
    public string Status { get; set; } = WhatsAppNotificationStatuses.Pending;
    public string? ErrorMessage { get; set; }
    public int Attempts { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? SentAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
}

public static class WhatsAppNotificationTypes
{
    public const string NewOrder = "NewOrder";
    public const string OrderStatus = "OrderStatus";
    public const string PaymentUpdate = "PaymentUpdate";
    public const string LowStock = "LowStock";
    public const string NewCustomer = "NewCustomer";
    public const string Test = "Test";
}

public static class WhatsAppNotificationStatuses
{
    /// <summary>Row exists, the outbound call has not been attempted yet.</summary>
    public const string Pending = "Pending";
    /// <summary>The provider accepted the message (HTTP 2xx with a message id).</summary>
    public const string Sent = "Sent";
    /// <summary>The provider confirmed delivery. Only a real provider status reaches this.</summary>
    public const string Delivered = "Delivered";
    /// <summary>The provider rejected the call, or the service is not configured.</summary>
    public const string Failed = "Failed";
    /// <summary>No credentials are configured, so no call was attempted at all.</summary>
    public const string NotConfigured = "NotConfigured";
}

public class StoreSetting
{
    public int Id { get; set; }

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
    public string? DeliveryCities { get; set; }
    public decimal? DeliveryCharge { get; set; }
    public double? DeliveryMaxRadiusKm { get; set; }

    public string? PaymentProvider { get; set; }
    public bool? PaymentEnabled { get; set; }

    public Guid? UpdatedByUserId { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Settlement
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int PartnerShopId { get; set; }
    public decimal PartnerAmount { get; set; }
    public decimal CommissionAmount { get; set; }
    public decimal DeliveryAmount { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Wishlist
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<WishlistItem> Items { get; set; } = new();
}

public class WishlistItem
{
    public int Id { get; set; }
    public int WishlistId { get; set; }
    public Wishlist? Wishlist { get; set; }
    public int ProductId { get; set; }
    public Product? Product { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
}

