using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

/// <summary>
/// Admin order detail.
///
/// <c>/api/orders</c> already lists every order for an admin; this adds the single-order view the
/// admin Orders screen needs, including the status history, the gateway payment record, the
/// invoice link and the legal next transitions. Valid transitions come from
/// <see cref="OrderStateMachine"/>, never from client input.
/// </summary>
[ApiController, Authorize(Roles = "Admin"), Route("api/admin/orders")]
public sealed class AdminOrdersController(OmDbContext db) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    /// <summary>Filtered, paged order list. Every filter maps to a real column.</summary>
    [HttpGet]
    public async Task<IActionResult> List([FromQuery] string? q = null, [FromQuery] string? status = null,
        [FromQuery] string? paymentStatus = null, [FromQuery] string? paymentMethod = null,
        [FromQuery] string? fulfillment = null, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null,
        [FromQuery] int page = 1, [FromQuery] int pageSize = 25)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 200);
        var query = db.Orders.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(x => x.OrderNumber.Contains(term) || x.CustomerName.Contains(term) ||
                x.CustomerPhone.Contains(term) || x.CustomerEmail.Contains(term));
        }
        if (!string.IsNullOrWhiteSpace(status)) query = query.Where(x => x.Status == status);
        if (!string.IsNullOrWhiteSpace(paymentStatus)) query = query.Where(x => x.PaymentStatus == paymentStatus);
        if (!string.IsNullOrWhiteSpace(paymentMethod)) query = query.Where(x => x.PaymentMethod == paymentMethod);
        if (string.Equals(fulfillment, "Pickup", StringComparison.OrdinalIgnoreCase)) query = query.Where(x => x.SourceType == "OMStationaryPickup");
        else if (string.Equals(fulfillment, "Delivery", StringComparison.OrdinalIgnoreCase)) query = query.Where(x => x.SourceType != "OMStationaryPickup");
        if (from.HasValue) query = query.Where(x => x.CreatedAt >= from.Value);
        if (to.HasValue) query = query.Where(x => x.CreatedAt < to.Value);

        var total = await query.CountAsync();
        var rows = await query.OrderByDescending(x => x.CreatedAt).Skip((page - 1) * pageSize).Take(pageSize)
            .Select(x => new
            {
                x.Id, x.OrderNumber, x.CustomerName, x.CustomerPhone, x.CustomerEmail,
                x.CreatedAt, x.Status, x.PaymentMethod, x.PaymentStatus,
                x.Subtotal, x.DiscountAmount, x.TaxAmount, x.DeliveryCharge, x.TotalAmount, x.CouponCode,
                FulfillmentMethod = x.SourceType == "OMStationaryPickup" ? "Pickup" : "Delivery",
                ItemCount = x.Items.Sum(i => i.Quantity),
                LineCount = x.Items.Count,
                InvoiceNumber = db.Invoices.Where(f => f.OrderId == x.Id).Select(f => f.InvoiceNumber).FirstOrDefault(),
                TransactionId = db.Payments.Where(p => p.OrderId == x.Id).OrderByDescending(p => p.Id)
                    .Select(p => p.ProviderReference).FirstOrDefault()
            }).ToListAsync();

        return Ok(new { total, page, pageSize, items = rows });
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Detail(int id)
    {
        var order = await db.Orders.AsNoTracking()
            .Include(x => x.Items).Include(x => x.StatusHistory)
            .FirstOrDefaultAsync(x => x.Id == id);
        if (order is null) return NotFound(new { detail = "That order was not found." });

        var payments = await db.Payments.AsNoTracking().Where(x => x.OrderId == id)
            .OrderByDescending(x => x.Id)
            .Select(x => new { x.Id, x.Provider, x.Status, x.Amount, x.ProviderReference, x.CreatedAt, x.PaidAt })
            .ToListAsync();
        var invoice = await db.Invoices.AsNoTracking().Where(x => x.OrderId == id)
            .Select(x => new { x.InvoiceNumber, x.InvoiceDate, x.PaymentStatus })
            .FirstOrDefaultAsync();
        var delivery = await db.Deliveries.AsNoTracking().Where(x => x.OrderId == id)
            .Select(x => new { x.Id, x.Status, x.PartnerName, x.TrackingCode, x.Charge, x.DropAddress })
            .FirstOrDefaultAsync();

        // Next statuses are derived server-side so the UI can never offer an invalid transition.
        var next = OrderStateMachine.NextStatuses(order.Status);

        return Ok(new
        {
            order.Id, order.OrderNumber, order.CustomerName, order.CustomerPhone, order.CustomerEmail,
            order.BillingAddress, order.DeliveryAddress, order.City, order.Pincode,
            order.CreatedAt, order.Status, order.PaymentMethod, order.PaymentStatus,
            order.Subtotal, order.DiscountAmount, order.TaxAmount, order.DeliveryCharge, order.TotalAmount,
            order.CouponCode, order.RequestedDeliveryDate,
            FulfillmentMethod = order.SourceType == "OMStationaryPickup" ? "Pickup" : "Delivery",
            Items = order.Items.Select(i => new
            {
                i.Id, i.ProductId, i.ProductName, i.Sku, i.Quantity, i.UnitPrice,
                lineTotal = i.UnitPrice * i.Quantity
            }),
            History = order.StatusHistory.OrderBy(h => h.CreatedAt).Select(h => new { h.Status, h.Note, h.CreatedAt }),
            Payments = payments,
            Invoice = invoice,
            Delivery = delivery,
            canCancel = OrderStateMachine.CanTransition(order.Status, "Cancelled"),
            NextStatuses = next
        });
    }
}

/// <summary>Admin category management: rename, activate/deactivate.</summary>
[ApiController, Authorize(Roles = "Admin"), Route("api/admin/categories")]
public sealed class AdminCategoriesController(OmDbContext db) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    [HttpGet]
    public async Task<IActionResult> List() => Ok(await db.Categories.AsNoTracking().OrderBy(x => x.Name)
        .Select(x => new
        {
            x.Id, x.Name, x.IsActive,
            ProductCount = db.Products.Count(p => p.CategoryId == x.Id),
            ActiveProductCount = db.Products.Count(p => p.CategoryId == x.Id && p.IsActive)
        }).ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CategoryWriteRequest request)
    {
        var name = request.Name.Trim();
        if (name.Length == 0) return BadRequest(new { detail = "Category name is required." });
        if (await db.Categories.AnyAsync(x => x.Name == name)) return Conflict(new { detail = "That category already exists." });
        var category = new Category { Name = name, IsActive = request.IsActive };
        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "CategoryCreated",
            EntityType = "Category",
            EntityId = "(new)",
            OldValue = null,
            NewValue = AdminSettingsController.Truncate($"name='{name}' active={request.IsActive}")
        });
        db.Categories.Add(category);
        await db.SaveChangesAsync();
        return Created($"/api/admin/categories/{category.Id}", new { category.Id, category.Name, category.IsActive, ProductCount = 0, ActiveProductCount = 0 });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] CategoryWriteRequest request)
    {
        var category = await db.Categories.FindAsync(id);
        if (category is null) return NotFound(new { detail = "That category was not found." });
        var name = request.Name.Trim();
        if (name.Length == 0) return BadRequest(new { detail = "Category name is required." });
        if (await db.Categories.AnyAsync(x => x.Name == name && x.Id != id))
            return Conflict(new { detail = "Another category already uses that name." });

        var oldName = category.Name;
        var oldActive = category.IsActive;
        category.Name = name;
        category.IsActive = request.IsActive;

        // Keep products pointing at a renamed category, otherwise they would show a dangling label.
        await db.Products.Where(p => p.CategoryId == id).ExecuteUpdateAsync(s => s.SetProperty(p => p.Category, name));

        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "CategoryUpdated",
            EntityType = "Category",
            EntityId = id.ToString(),
            OldValue = AdminSettingsController.Truncate($"name='{oldName}' active={oldActive}"),
            NewValue = AdminSettingsController.Truncate($"name='{name}' active={request.IsActive}")
        });
        await db.SaveChangesAsync();
        return Ok(new
        {
            category.Id, category.Name, category.IsActive,
            ProductCount = await db.Products.CountAsync(p => p.CategoryId == id),
            ActiveProductCount = await db.Products.CountAsync(p => p.CategoryId == id && p.IsActive)
        });
    }
}

/// <summary>
/// Admin coupon management: list, update, activate/deactivate. The customer-facing validation
/// endpoint already exists in <see cref="CouponsController"/> and is deliberately untouched.
/// </summary>
[ApiController, Authorize(Roles = "Admin"), Route("api/admin/coupons")]
public sealed class AdminCouponsController(OmDbContext db) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    [HttpGet]
    public async Task<IActionResult> List()
    {
        var now = DateTime.UtcNow;
        // Newest first by insertion order: the Coupon table has no created-at column, so Id is the
        // only honest recency signal available.
        var rows = await db.Coupons.AsNoTracking().OrderByDescending(x => x.Id).ToListAsync();
        return Ok(rows.Select(x => new
        {
            x.Id, x.Code, x.DiscountType, x.DiscountValue, x.MinimumOrderValue, x.MaximumDiscount,
            x.UsageLimit, x.UsageCount, x.StartsAt, x.ExpiresAt, x.IsActive,
            // Derived live, never stored, so the list cannot claim a coupon is usable when it is not.
            status = CouponState(x, now),
            remainingUses = Math.Max(0, x.UsageLimit - x.UsageCount)
        }));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] CouponWriteRequest request)
    {
        var coupon = await db.Coupons.FindAsync(id);
        if (coupon is null) return NotFound(new { detail = "That coupon was not found." });
        if (!request.DiscountType.Equals("Percentage", StringComparison.OrdinalIgnoreCase) &&
            !request.DiscountType.Equals("Fixed", StringComparison.OrdinalIgnoreCase))
            return BadRequest(new { detail = "Discount type must be Percentage or Fixed." });
        if (request.DiscountType.Equals("Percentage", StringComparison.OrdinalIgnoreCase) && request.DiscountValue > 100)
            return BadRequest(new { detail = "Percentage discount cannot exceed 100." });
        if (request.DiscountValue <= 0) return BadRequest(new { detail = "Discount value must be greater than zero." });
        if (request.ExpiresAt <= request.StartsAt) return BadRequest(new { detail = "Expiry must be after the start date." });

        var before = $"type={coupon.DiscountType} value={coupon.DiscountValue} min={coupon.MinimumOrderValue} " +
                     $"max={coupon.MaximumDiscount} limit={coupon.UsageLimit} active={coupon.IsActive} expires={coupon.ExpiresAt:O}";
        coupon.DiscountType = request.DiscountType;
        coupon.DiscountValue = request.DiscountValue;
        coupon.MinimumOrderValue = request.MinimumOrderValue;
        coupon.MaximumDiscount = request.MaximumDiscount;
        coupon.UsageLimit = Math.Max(request.UsageLimit, coupon.UsageCount);
        coupon.StartsAt = request.StartsAt;
        coupon.ExpiresAt = request.ExpiresAt;
        coupon.IsActive = request.IsActive;

        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "CouponUpdated",
            EntityType = "Coupon",
            EntityId = id.ToString(),
            OldValue = AdminSettingsController.Truncate(before),
            NewValue = AdminSettingsController.Truncate($"type={coupon.DiscountType} value={coupon.DiscountValue} min={coupon.MinimumOrderValue} max={coupon.MaximumDiscount} limit={coupon.UsageLimit} active={coupon.IsActive} expires={coupon.ExpiresAt:O}")
        });
        await db.SaveChangesAsync();
        return Ok(new
        {
            coupon.Id, coupon.Code, coupon.DiscountType, coupon.DiscountValue, coupon.MinimumOrderValue,
            coupon.MaximumDiscount, coupon.UsageLimit, coupon.UsageCount, coupon.StartsAt, coupon.ExpiresAt,
            coupon.IsActive, status = CouponState(coupon, DateTime.UtcNow),
            remainingUses = Math.Max(0, coupon.UsageLimit - coupon.UsageCount)
        });
    }

    internal static string CouponState(Coupon coupon, DateTime now)
    {
        if (!coupon.IsActive) return "Inactive";
        if (coupon.UsageCount >= coupon.UsageLimit) return "Limit reached";
        if (now < coupon.StartsAt) return "Scheduled";
        if (now > coupon.ExpiresAt) return "Expired";
        return "Active";
    }
}

public sealed class CouponWriteRequest
{
    public string DiscountType { get; set; } = "Percentage";
    public decimal DiscountValue { get; set; }
    public decimal MinimumOrderValue { get; set; }
    public decimal? MaximumDiscount { get; set; }
    public int UsageLimit { get; set; } = 100;
    public DateTime StartsAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public bool IsActive { get; set; } = true;
}