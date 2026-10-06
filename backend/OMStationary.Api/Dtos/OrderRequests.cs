using System.ComponentModel.DataAnnotations;

namespace OMStationary.Api.Dtos;

public class CreateOrderRequest
{
    [Required, StringLength(120)] public string CustomerName { get; set; } = "";
    [Required, Phone, StringLength(20)] public string CustomerPhone { get; set; } = "";
    // Nullable on purpose. CustomerEmail has no Required, but [EmailAddress] still rejects the
    // empty string, so an omitted email made the whole order fail model validation with a 400.
    // A guest who does not want to give an email can now place a COD pickup order.
    [EmailAddress, StringLength(254)] public string? CustomerEmail { get; set; }
    [StringLength(600)] public string BillingAddress { get; set; } = "";
    [Required, StringLength(20)] public string FulfillmentMethod { get; set; } = "Pickup";
    [Required, StringLength(20)] public string PaymentMethod { get; set; } = "COD";
    public decimal? QuotedTotal { get; set; }
    [StringLength(40)] public string CouponCode { get; set; } = "";
    public DateTime? RequestedPickupDate { get; set; }
    [StringLength(300)] public string AddressLine { get; set; } = "";
    [StringLength(100)] public string Landmark { get; set; } = "";
    [StringLength(80)] public string City { get; set; } = "";
    [StringLength(80)] public string State { get; set; } = "";
    [StringLength(12)] public string Pincode { get; set; } = "";
    [Range(-90, 90)] public double? Latitude { get; set; }
    [Range(-180, 180)] public double? Longitude { get; set; }
    [Required, MinLength(1), MaxLength(30)] public List<CreateOrderItemRequest> Items { get; set; } = [];
}

public class CreateOrderItemRequest
{
    [Range(1, int.MaxValue)] public int ProductId { get; set; }
    [Range(1, 99)] public int Quantity { get; set; }
}

public class DeliveryQuoteRequest
{
    [Required] public string FulfillmentMethod { get; set; } = "Delivery";
    [Required, StringLength(80)] public string City { get; set; } = "";
    [Required, RegularExpression(@"^\d{6}$")] public string Pincode { get; set; } = "";
    [StringLength(40)] public string CouponCode { get; set; } = "";
    [Range(-90, 90)] public double? Latitude { get; set; }
    [Range(-180, 180)] public double? Longitude { get; set; }
    [Required, MinLength(1), MaxLength(30)] public List<CreateOrderItemRequest> Items { get; set; } = [];
}

public class UpdateOrderStatusRequest
{
    [Required, StringLength(40)] public string Status { get; set; } = "";
}

public class UpdatePaymentStatusRequest
{
    [Required, StringLength(20)] public string Status { get; set; } = "";
}

public class AssignDeliveryRequest
{
    [StringLength(120)] public string PartnerName { get; set; } = "";
    public int? DeliveryPartnerId { get; set; }
    [StringLength(20)] public string TrackingCode { get; set; } = "";
}

public class DeliveryPartnerRequest
{
    [Required, StringLength(120)] public string Name { get; set; } = "";
    [Required, Phone, StringLength(20)] public string Mobile { get; set; } = "";
    [Required, EmailAddress, StringLength(254)] public string Email { get; set; } = "";
    [StringLength(50)] public string VehicleType { get; set; } = "";
    [StringLength(30)] public string VehicleNumber { get; set; } = "";
    [Required, MinLength(4), StringLength(128)] public string Password { get; set; } = "";
}

public class DeliveryPartnerStatusRequest
{
    [Required, StringLength(40)] public string Status { get; set; } = "";
}

public class ShopInventoryRequest
{
    [Range(1, int.MaxValue)] public int ProductId { get; set; }
    [Range(typeof(decimal), "0", "99999999")] public decimal SellingPrice { get; set; }
    [Range(0, 1000000)] public int Stock { get; set; }
    public bool IsAvailable { get; set; } = true;
}

public class CreatePartnerAccountRequest
{
    [Required, EmailAddress, StringLength(254)] public string Email { get; set; } = "";
    [Required, Phone, StringLength(20)] public string Phone { get; set; } = "";
    [Required, MinLength(4), StringLength(128)] public string Password { get; set; } = "";
}

public class ShopApprovalRequest
{
    public bool IsApproved { get; set; }
}

