using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

[ApiController]
[Route("api/delivery")]
public class DeliveryController(OmDbContext db, IConfiguration configuration, FulfillmentSelectionService fulfillment, CouponService coupons) : ControllerBase
{
    [HttpGet("options")]
    public IActionResult Options() => Ok(new
    {
        enabled = configuration.GetValue<bool>("Delivery:Enabled"),
        cities = configuration.GetSection("Delivery:ServiceableCities").Get<string[]>() ?? [],
        charge = configuration.GetValue<decimal?>("Delivery:Charge"),
        maxRadiusKm = configuration.GetValue<double?>("Delivery:MaxRadiusKm") ?? 20
    });

    [HttpPost("quote"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> Quote([FromBody] DeliveryQuoteRequest request, CancellationToken cancellationToken)
    {
        if (!request.FulfillmentMethod.Equals("Delivery", StringComparison.OrdinalIgnoreCase))
            return BadRequest("A delivery quote requires Delivery as the fulfillment method.");
        var cities = configuration.GetSection("Delivery:ServiceableCities").Get<string[]>() ?? [];
        var pincodes = configuration.GetSection("Delivery:ServiceablePincodes").Get<string[]>() ?? [];
        var fee = configuration.GetValue<decimal?>("Delivery:Charge");
        if (!configuration.GetValue<bool>("Delivery:Enabled")) return Ok(new { available = false, reason = "Delivery is not configured yet." });
        if (string.IsNullOrWhiteSpace(request.City) || !cities.Contains(request.City.Trim(), StringComparer.OrdinalIgnoreCase))
            return Ok(new { available = false, reason = "Delivery is not available in this city yet." });
        if (!pincodes.Contains(request.Pincode.Trim(), StringComparer.Ordinal))
            return Ok(new { available = false, reason = "Delivery is not available for this PIN code yet." });
        if (request.Latitude is null || request.Longitude is null)
            return Ok(new { available = false, reason = "Share your location to check whether a verified shop is within the delivery radius." });
        if (fee is null || fee < 0) return Ok(new { available = false, reason = "Delivery charges are not configured." });
        if (request.Items.Count == 0 || request.Items.Select(i => i.ProductId).Distinct().Count() != request.Items.Count)
            return BadRequest("Provide each product once with its quantity.");

        var ids = request.Items.Select(i => i.ProductId).ToArray();
        var products = await db.Products.AsNoTracking().Where(p => p.IsActive && ids.Contains(p.Id)).ToDictionaryAsync(p => p.Id);
        if (products.Count != ids.Length) return Ok(new { available = false, reason = "One or more products are unavailable." });
        var candidate = await fulfillment.SelectAsync(new FulfillmentRequest(request.Latitude.Value, request.Longitude.Value,
            request.Items.Select(x => new RequestedProduct(x.ProductId, x.Quantity)).ToArray()), cancellationToken);
        if (candidate is not null)
        {
            var lineItems = request.Items.Select(i => new { i.ProductId, products[i.ProductId].Name, i.Quantity, UnitPrice = candidate.Inventory[i.ProductId].SellingPrice }).ToArray();
            var coupon = string.IsNullOrWhiteSpace(request.CouponCode) ? null : await coupons.Calculate(request.CouponCode, candidate.Subtotal, cancellationToken);
            if (coupon is { Valid: false }) return Ok(new { available = false, reason = coupon.Reason });
            var discount = coupon?.Discount ?? 0;
            var tax = TaxCalculator.Calculate(candidate.Subtotal - discount, configuration.GetValue<decimal>("Tax:RatePercent"));
            return Ok(new { available = true, city = request.City.Trim(), items = lineItems, subtotal = candidate.Subtotal,
                deliveryCharge = candidate.DeliveryFee, couponCode = coupon?.Code, discountAmount = discount,
                taxAmount = tax, total = candidate.Total - discount + tax, estimatedDeliveryMinutes = candidate.EstimatedDeliveryMinutes });
        }
        return Ok(new { available = false, reason = "No verified partner shop has all requested items and quantities in stock." });
    }
}
