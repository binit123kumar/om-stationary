using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

[ApiController, Route("api/coupons")]
public sealed class CouponsController(OmDbContext db, CouponService coupons) : ControllerBase
{
    [HttpPost("validate")]
    public async Task<IActionResult> Validate(CouponValidationRequest request, CancellationToken cancellationToken)
    {
        if (request.Items.Select(x => x.ProductId).Distinct().Count() != request.Items.Count)
            return BadRequest(new { detail = "Each product should appear once in the cart." });
        var ids = request.Items.Select(x => x.ProductId).ToArray();
        var products = await db.Products.AsNoTracking().Where(x => x.IsActive && ids.Contains(x.Id)).ToDictionaryAsync(x => x.Id, cancellationToken);
        if (products.Count != ids.Length) return Conflict(new { detail = "One or more products are unavailable." });
        var subtotal = request.Items.Sum(x => products[x.ProductId].Price * x.Quantity);
        var result = await coupons.Calculate(request.Code, subtotal, cancellationToken);
        return result.Valid ? Ok(new { code = result.Code, subtotal, discountAmount = result.Discount, total = subtotal - result.Discount })
            : BadRequest(new { detail = result.Reason });
    }

    [Authorize(Roles = "Admin"), HttpPost]
    public async Task<IActionResult> Create(CouponCreateRequest request)
    {
        if (!request.DiscountType.Equals("Percentage", StringComparison.OrdinalIgnoreCase) &&
            !request.DiscountType.Equals("Fixed", StringComparison.OrdinalIgnoreCase)) return BadRequest("Discount type must be Percentage or Fixed.");
        if (request.DiscountType.Equals("Percentage", StringComparison.OrdinalIgnoreCase) && request.DiscountValue > 100)
            return BadRequest("Percentage discount cannot exceed 100.");
        if (request.ExpiresAt <= request.StartsAt || request.ExpiresAt <= DateTime.UtcNow) return BadRequest("Coupon expiry must be after its start and in the future.");
        var code = request.Code.Trim().ToUpperInvariant();
        if (await db.Coupons.AnyAsync(x => x.Code == code)) return Conflict(new { detail = "Coupon code already exists." });
        var coupon = new Coupon { Code = code, DiscountType = request.DiscountType, DiscountValue = request.DiscountValue,
            MinimumOrderValue = request.MinimumOrderValue, MaximumDiscount = request.MaximumDiscount, UsageLimit = request.UsageLimit,
            StartsAt = request.StartsAt.ToUniversalTime(), ExpiresAt = request.ExpiresAt.ToUniversalTime(), IsActive = request.IsActive };
        db.Coupons.Add(coupon); await db.SaveChangesAsync();
        return Created($"/api/coupons/{coupon.Id}", new { coupon.Id, coupon.Code, coupon.DiscountType, coupon.DiscountValue, coupon.IsActive });
    }
}

