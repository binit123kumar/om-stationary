using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

public sealed record CouponCalculation(bool Valid, string? Reason, int CouponId, string Code, decimal Discount);

public sealed class CouponService(OmDbContext db)
{
    public async Task<CouponCalculation> Calculate(string code, decimal subtotal, CancellationToken cancellationToken = default)
    {
        var normalized = code.Trim().ToUpperInvariant();
        var coupon = await db.Coupons.AsNoTracking().FirstOrDefaultAsync(x => x.Code == normalized, cancellationToken);
        if (coupon is null || !coupon.IsActive) return new(false, "Coupon is invalid or inactive.", 0, normalized, 0);
        var now = DateTime.UtcNow;
        if (now < coupon.StartsAt || now > coupon.ExpiresAt) return new(false, "Coupon is outside its valid dates.", coupon.Id, normalized, 0);
        if (coupon.UsageCount >= coupon.UsageLimit) return new(false, "Coupon usage limit has been reached.", coupon.Id, normalized, 0);
        if (subtotal < coupon.MinimumOrderValue) return new(false, $"Minimum order value is ₹{coupon.MinimumOrderValue}.", coupon.Id, normalized, 0);
        if (coupon.DiscountType.Equals("Percentage", StringComparison.OrdinalIgnoreCase) && coupon.DiscountValue > 100)
            return new(false, "Coupon percentage is invalid.", coupon.Id, normalized, 0);
        var discount = coupon.DiscountType.Equals("Percentage", StringComparison.OrdinalIgnoreCase)
            ? subtotal * coupon.DiscountValue / 100m
            : coupon.DiscountType.Equals("Fixed", StringComparison.OrdinalIgnoreCase) ? coupon.DiscountValue : -1m;
        if (discount < 0) return new(false, "Coupon discount type is invalid.", coupon.Id, normalized, 0);
        if (coupon.MaximumDiscount.HasValue) discount = Math.Min(discount, coupon.MaximumDiscount.Value);
        discount = Math.Round(Math.Min(discount, subtotal), 2, MidpointRounding.AwayFromZero);
        return new(true, null, coupon.Id, normalized, discount);
    }

    public Task<int> TryRedeem(CouponCalculation coupon, CancellationToken cancellationToken = default) =>
        db.Coupons.Where(x => x.Id == coupon.CouponId && x.IsActive && x.UsageCount < x.UsageLimit &&
            x.StartsAt <= DateTime.UtcNow && x.ExpiresAt >= DateTime.UtcNow)
            .ExecuteUpdateAsync(x => x.SetProperty(c => c.UsageCount, c => c.UsageCount + 1), cancellationToken);
}

