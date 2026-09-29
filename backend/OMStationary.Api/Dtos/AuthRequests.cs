using System.ComponentModel.DataAnnotations;

namespace OMStationary.Api.Dtos;

public sealed class RegisterRequest
{
    [Required, EmailAddress, StringLength(254)] public string Email { get; set; } = "";
    [Required, Phone, StringLength(20)] public string Phone { get; set; } = "";
    [Required, StringLength(120)] public string FullName { get; set; } = "";
    [Required, MinLength(10), StringLength(128)] public string Password { get; set; } = "";
}

public sealed class LoginRequest
{
    [Required, EmailAddress, StringLength(254)] public string Email { get; set; } = "";
    [Required, StringLength(128)] public string Password { get; set; } = "";
}

public sealed class RefreshRequest
{
    [Required] public string RefreshToken { get; set; } = "";
}

public sealed class ProfileUpdateRequest
{
    [Required, StringLength(120)] public string FullName { get; set; } = "";
    [Required, Phone, StringLength(20)] public string Phone { get; set; } = "";
}

public sealed class AddressRequest
{
    [Required, StringLength(40)] public string Label { get; set; } = "Home";
    [Required, StringLength(120)] public string RecipientName { get; set; } = "";
    [Required, Phone, StringLength(20)] public string Phone { get; set; } = "";
    [Required, StringLength(300)] public string Line1 { get; set; } = "";
    [StringLength(300)] public string Line2 { get; set; } = "";
    [Required, StringLength(80)] public string City { get; set; } = "";
    [Required, StringLength(80)] public string State { get; set; } = "";
    [Required, RegularExpression(@"^\d{6}$")] public string Pincode { get; set; } = "";
    [Range(-90, 90)] public double? Latitude { get; set; }
    [Range(-180, 180)] public double? Longitude { get; set; }
    public bool IsDefault { get; set; }
}

public sealed class CartItemRequest
{
    [Range(1, int.MaxValue)] public int ProductId { get; set; }
    [Range(1, 99)] public int Quantity { get; set; }
}

public sealed class CartMergeRequest
{
    [Required, MaxLength(100)] public List<CartItemRequest> Items { get; set; } = [];
}

public sealed class CouponValidationRequest
{
    [Required, StringLength(40)] public string Code { get; set; } = "";
    [Required, MinLength(1), MaxLength(30)] public List<CartItemRequest> Items { get; set; } = [];
}

public sealed class CouponCreateRequest
{
    [Required, StringLength(40)] public string Code { get; set; } = "";
    [Required, StringLength(20)] public string DiscountType { get; set; } = "Percentage";
    [Range(typeof(decimal), "0.01", "1000000")] public decimal DiscountValue { get; set; }
    [Range(typeof(decimal), "0", "1000000")] public decimal MinimumOrderValue { get; set; }
    [Range(typeof(decimal), "0", "1000000")] public decimal? MaximumDiscount { get; set; }
    [Range(1, 1000000)] public int UsageLimit { get; set; }
    public DateTime StartsAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public bool IsActive { get; set; } = true;
}
