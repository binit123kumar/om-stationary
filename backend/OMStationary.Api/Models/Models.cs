namespace OMStationary.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Category { get; set; } = "";
    public decimal Price { get; set; }
    public decimal MRP { get; set; }
    public string ImageUrl { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsActive { get; set; } = true;
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

public class PlatformConnector
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Type { get; set; } = "Catalog";
    public bool Enabled { get; set; }
    public bool OrderApiAvailable { get; set; }
    public string? BaseUrl { get; set; }
    public string Status { get; set; } = "NotConfigured";
}

public class Order
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = "";
    public string CustomerName { get; set; } = "";
    public string CustomerPhone { get; set; } = "";
    public string DeliveryAddress { get; set; } = "";
    public string City { get; set; } = "Patna";
    public string Pincode { get; set; } = "";
    public DateTime? RequestedDeliveryDate { get; set; }
    public decimal Subtotal { get; set; }
    public decimal DeliveryCharge { get; set; }
    public decimal TotalAmount { get; set; }
    public string PaymentMethod { get; set; } = "COD";
    public string PaymentStatus { get; set; } = "Pending";
    public string Status { get; set; } = "Placed";
    public string SourceType { get; set; } = "LocalShop";
    public string SourceReference { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<OrderItem> Items { get; set; } = new();
}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = "";
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
}
