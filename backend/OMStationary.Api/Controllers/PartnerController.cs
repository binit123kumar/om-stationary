using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

/// <summary>
/// Partner shop portal. This completes the flow the React PartnerDashboard already calls
/// (/api/partner/shop, /api/partner/inventory, /api/partner/orders and the status PATCH) which
/// previously 404'd because no controller existed.
///
/// It reuses the existing PartnerShops, ShopProducts and Order.PartnerShopId tables - no new
/// tables and no new models are introduced. Every read is scoped to the signed-in shop's own
/// PartnerShopId, so a partner can never see another shop's orders, customers or pricing.
/// </summary>
[ApiController, Route("api/partner")]
public sealed class PartnerController(OmDbContext db) : ControllerBase
{
    private readonly PasswordHasher<ApplicationUser> _passwords = new();

    private Guid? ActorId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    private bool IsAdmin() => User.Identity?.IsAuthenticated == true && User.IsInRole("Admin");

    /// <summary>Resolves the shop for the caller. Admins must name a shop explicitly.</summary>
    private async Task<PartnerShop?> CurrentShopAsync()
    {
        if (IsAdmin()) return null;
        var userId = ActorId;
        if (userId is null) return null;
        return await db.PartnerShops.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == userId);
    }

    /// <summary>
    /// Shop self-registration. This is the only partner route reachable without an account, so it is
    /// rate limited and creates the account in a non-approved state: an admin still has to approve
    /// the shop before it can fulfil anything.
    /// </summary>
    [HttpPost("register"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> Register([FromBody] CreatePartnerAccountRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var phone = request.Phone.Trim();

        // Same complexity bar as customer registration, so a partner account is never weaker than
        // a customer account.
        if (request.Password.Length < 8)
            return BadRequest(new { detail = "Password must be at least 8 characters long." });
        if (!request.Password.Any(char.IsUpper) || !request.Password.Any(char.IsLower) ||
            !request.Password.Any(char.IsDigit) || !request.Password.Any(c => !char.IsLetterOrDigit(c)))
            return BadRequest(new { detail = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character." });

        if (await db.Users.AnyAsync(x => x.Email == email || x.Phone == phone))
            return Conflict(new { detail = "An account already exists for this email or mobile number." });
        if (await db.PartnerShops.AnyAsync(x => x.Phone == phone))
            return Conflict(new { detail = "A partner shop already exists for this mobile number." });

        var roleId = await db.Roles.Where(x => x.Name == "PartnerShop").Select(x => (int?)x.Id).FirstOrDefaultAsync();
        if (roleId is null) return Problem("Partner shop accounts are not configured.", statusCode: 503);

        var user = new ApplicationUser { Email = email, Phone = phone, Role = "PartnerShop", RoleId = roleId };
        user.PasswordHash = _passwords.HashPassword(user, request.Password);
        db.Users.Add(user);
        db.PartnerShops.Add(new PartnerShop
        {
            Name = "Pending partner shop",
            OwnerName = user.Email,
            Address = "",
            Phone = phone,
            IsApproved = false,
            IsActive = true,
            SupportsDelivery = true,
            UserId = user.Id
        });
        await db.SaveChangesAsync();
        return StatusCode(StatusCodes.Status201Created, new
        {
            detail = "Partner account created. An administrator must approve the shop before it can take orders.",
            email
        });
    }

    [Authorize(Roles = "PartnerShop"), HttpGet("shop")]
    public async Task<IActionResult> Shop()
    {
        var shop = await CurrentShopAsync();
        if (shop is null) return NotFound("No partner shop is linked to this account yet.");
        return Ok(Project(shop));
    }

    /// <summary>A partner may correct its own contact and address details; approval stays admin-only.</summary>
    [Authorize(Roles = "PartnerShop"), HttpPut("shop")]
    public async Task<IActionResult> UpdateShop([FromBody] PartnerShopProfileRequest request)
    {
        var shop = await db.PartnerShops.FirstOrDefaultAsync(x => x.UserId == ActorId);
        if (shop is null) return NotFound("No partner shop is linked to this account yet.");
        if (!string.IsNullOrWhiteSpace(request.Name)) shop.Name = request.Name.Trim();
        if (!string.IsNullOrWhiteSpace(request.OwnerName)) shop.OwnerName = request.OwnerName.Trim();
        if (!string.IsNullOrWhiteSpace(request.Address)) shop.Address = request.Address.Trim();
        if (!string.IsNullOrWhiteSpace(request.Pincode)) shop.Pincode = request.Pincode.Trim();
        if (request.Latitude.HasValue) shop.Latitude = request.Latitude.Value;
        if (request.Longitude.HasValue) shop.Longitude = request.Longitude.Value;
        if (request.SupportsDelivery.HasValue) shop.SupportsDelivery = request.SupportsDelivery.Value;
        if (request.EstimatedDeliveryMinutes is > 0) shop.EstimatedDeliveryMinutes = request.EstimatedDeliveryMinutes.Value;
        await db.SaveChangesAsync();
        return Ok(Project(shop));
    }

    [Authorize(Roles = "PartnerShop"), HttpGet("inventory")]
    public async Task<IActionResult> Inventory()
    {
        var shop = await CurrentShopAsync();
        if (shop is null) return NotFound("No partner shop is linked to this account yet.");
        return Ok(await db.ShopProducts.AsNoTracking()
            .Where(x => x.PartnerShopId == shop.Id)
            .Join(db.Products.AsNoTracking(), sp => sp.ProductId, p => p.Id, (sp, p) => new
            {
                sp.Id, sp.ProductId, p.Name, p.Sku, p.Brand, p.Category, p.ImageUrl, p.MRP,
                sp.SellingPrice, sp.Stock, sp.IsAvailable
            })
            .OrderBy(x => x.Name)
            .ToListAsync());
    }

    [Authorize(Roles = "PartnerShop"), HttpPut("inventory")]
    public async Task<IActionResult> UpdateInventory([FromBody] ShopInventoryRequest request)
    {
        var shop = await CurrentShopAsync();
        if (shop is null) return NotFound("No partner shop is linked to this account yet.");
        var row = await db.ShopProducts.FirstOrDefaultAsync(x => x.PartnerShopId == shop.Id && x.ProductId == request.ProductId);
        if (row is null) return NotFound("This product is not listed in your shop inventory.");
        if (request.SellingPrice <= 0m) return BadRequest(new { detail = "Selling price must be greater than zero." });
        row.SellingPrice = request.SellingPrice;
        row.Stock = request.Stock;
        row.IsAvailable = request.IsAvailable;
        await db.SaveChangesAsync();
        return Ok(new { row.ProductId, row.SellingPrice, row.Stock, row.IsAvailable });
    }

    [Authorize(Roles = "PartnerShop"), HttpGet("orders")]
    public async Task<IActionResult> Orders()
    {
        var shop = await CurrentShopAsync();
        if (shop is null) return NotFound("No partner shop is linked to this account yet.");
        return Ok(await db.Orders.AsNoTracking()
            .Where(x => x.PartnerShopId == shop.Id)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new
            {
                x.Id, x.OrderNumber, x.Status, x.PaymentMethod, x.PaymentStatus,
                x.CustomerName, x.CustomerPhone, x.DeliveryAddress, x.City, x.Pincode,
                x.TotalAmount, x.CreatedAt, x.RequestedDeliveryDate,
                nextStatuses = OrderStateMachine.NextStatuses(x.Status),
                Items = x.Items.Select(i => new { i.ProductName, i.Quantity, i.UnitPrice })
            })
            .ToListAsync());
    }

    /// <summary>
    /// A partner may only move an order through the preparation states. OrderStateMachine rejects
    /// anything else, so a partner can never mark an order Delivered, Paid or Cancelled, and every
    /// accepted change is written to OrderStatusHistory for the audit trail.
    /// </summary>
    [Authorize(Roles = "PartnerShop"), HttpPatch("orders/{id:int}/status"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] PartnerOrderStatusRequest request)
    {
        var shop = await CurrentShopAsync();
        if (shop is null) return NotFound("No partner shop is linked to this account yet.");
        var order = await db.Orders.FirstOrDefaultAsync(x => x.Id == id && x.PartnerShopId == shop.Id);
        if (order is null) return NotFound();

        // Preparation is the partner's job. Fulfilment completion and payment stay with the store.
        var partnerStatuses = new[] { "Accepted", "Preparing", "Ready for Pickup" };
        var canonical = OrderStateMachine.Statuses.FirstOrDefault(x => x.Equals(request.Status.Trim(), StringComparison.OrdinalIgnoreCase));
        if (canonical is null || !partnerStatuses.Contains(canonical, StringComparer.OrdinalIgnoreCase))
            return BadRequest(new { detail = "A partner may only set the order to Accepted, Preparing or Ready for Pickup." });
        if (!partnerStatuses.Contains(canonical)) return BadRequest(new { detail = "Unsupported partner status." });
        if (order.Status == canonical)
            return Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus });
        if (!OrderStateMachine.CanTransition(order.Status, canonical))
            return BadRequest(new { detail = $"Order cannot transition from {order.Status} to {canonical}." });

        order.Status = canonical;
        db.OrderStatusHistory.Add(new OrderStatusHistory { OrderId = order.Id, Status = canonical, ChangedByUserId = ActorId });
        if (ActorId is Guid actor) db.AuditLogs.Add(new AuditLog { UserId = actor, Action = "PartnerOrderStatusChanged", EntityType = "Order", EntityId = order.Id.ToString() });
        await db.SaveChangesAsync();
        return Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus });
    }

    // ---- Admin-side partner shop management (approval + review list) ----

    [Authorize(Roles = "Admin"), HttpGet("shops")]
    public async Task<IActionResult> Shops()
    {
        return Ok(await db.PartnerShops.AsNoTracking().OrderByDescending(x => x.Id).Select(x => new
        {
            x.Id, x.Name, x.OwnerName, x.Address, x.Phone, x.Pincode,
            x.IsApproved, x.IsActive, x.SupportsDelivery, x.EstimatedDeliveryMinutes,
            productCount = db.ShopProducts.Count(sp => sp.PartnerShopId == x.Id && sp.IsAvailable),
            orderCount = db.Orders.Count(o => o.PartnerShopId == x.Id)
        }).ToListAsync());
    }

    [Authorize(Roles = "Admin"), HttpPut("shops/{id:int}/approval"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> SetApproval(int id, [FromBody] ShopApprovalRequest request)
    {
        var shop = await db.PartnerShops.FirstOrDefaultAsync(x => x.Id == id);
        if (shop is null) return NotFound();
        shop.IsApproved = request.IsApproved;
        if (ActorId is Guid actor) db.AuditLogs.Add(new AuditLog { UserId = actor, Action = "PartnerShopApproval", EntityType = "PartnerShop", EntityId = shop.Id.ToString() });
        await db.SaveChangesAsync();
        return Ok(new { shop.Id, shop.Name, shop.IsApproved, shop.IsActive });
    }

    private static object Project(PartnerShop shop) => new
    {
        shop.Id, shop.Name, shop.OwnerName, shop.Address, shop.Phone, shop.Pincode,
        shop.Latitude, shop.Longitude, shop.IsApproved, shop.IsActive,
        shop.SupportsDelivery, shop.EstimatedDeliveryMinutes
    };
}

public class PartnerShopProfileRequest
{
    [StringLength(120)] public string? Name { get; set; }
    [StringLength(120)] public string? OwnerName { get; set; }
    [StringLength(300)] public string? Address { get; set; }
    [StringLength(20)] public string? Pincode { get; set; }
    [Range(-90, 90)] public double? Latitude { get; set; }
    [Range(-180, 180)] public double? Longitude { get; set; }
    public bool? SupportsDelivery { get; set; }
    [Range(1, 10080)] public int? EstimatedDeliveryMinutes { get; set; }
}

public class PartnerOrderStatusRequest
{
    [Required, StringLength(40)] public string Status { get; set; } = "";
}
