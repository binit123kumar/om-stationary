using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;

namespace OMStationary.Api.Controllers;

[ApiController, Authorize(Roles = "PartnerShop"), Route("api/partner")]
public sealed class PartnerPortalController(OmDbContext db) : ControllerBase
{
    private Guid? UserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    [HttpGet("shop")]
    public async Task<IActionResult> Shop()
    {
        var shop = await OwnShop();
        return shop is null ? NotFound(new { detail = "No shop is linked to this account." }) : Ok(new
        {
            shop.Id, shop.Name, shop.Address, shop.Pincode, shop.IsApproved, shop.SupportsDelivery, shop.EstimatedDeliveryMinutes
        });
    }

    [HttpGet("inventory")]
    public async Task<IActionResult> Inventory()
    {
        var shop = await OwnShop();
        if (shop is null) return NotFound();
        var inventory = await db.ShopProducts.AsNoTracking().Where(x => x.PartnerShopId == shop.Id)
            .Join(db.Products.AsNoTracking(), stock => stock.ProductId, product => product.Id,
                (stock, product) => new { stock.Id, stock.ProductId, product.Name, stock.SellingPrice, stock.Stock, stock.IsAvailable })
            .OrderBy(x => x.Name).ToListAsync();
        return Ok(inventory);
    }

    [HttpPut("inventory")]
    public async Task<IActionResult> UpdateInventory(ShopInventoryRequest request)
    {
        var shop = await OwnShop();
        if (shop is null) return NotFound();
        if (!await db.Products.AnyAsync(x => x.Id == request.ProductId && x.IsActive)) return BadRequest("Active product was not found.");
        var row = await db.ShopProducts.FirstOrDefaultAsync(x => x.PartnerShopId == shop.Id && x.ProductId == request.ProductId);
        if (row is null) { row = new ShopProduct { PartnerShopId = shop.Id, ProductId = request.ProductId }; db.ShopProducts.Add(row); }
        row.SellingPrice = request.SellingPrice; row.Stock = request.Stock; row.IsAvailable = request.IsAvailable;
        await db.SaveChangesAsync();
        return Ok(new { row.Id, row.ProductId, row.SellingPrice, row.Stock, row.IsAvailable });
    }

    [HttpGet("orders")]
    public async Task<IActionResult> Orders()
    {
        var shop = await OwnShop();
        if (shop is null) return NotFound();
        var orders = await db.Orders.AsNoTracking().Where(x => x.PartnerShopId == shop.Id)
            .OrderByDescending(x => x.CreatedAt).Select(x => new
            {
                x.Id, x.OrderNumber, x.Status, x.PaymentMethod, x.PaymentStatus, x.TotalAmount,
                x.CustomerName, x.CustomerPhone, x.DeliveryAddress, x.DeliveryInstructions, x.CreatedAt,
                Items = x.Items.Select(i => new { i.ProductName, i.Quantity, i.UnitPrice })
            }).ToListAsync();
        return Ok(orders);
    }

    [HttpGet("settlements")]
    public async Task<IActionResult> Settlements()
    {
        var shop = await OwnShop();
        if (shop is null) return NotFound();
        return Ok(await db.Settlements.AsNoTracking().Where(x => x.PartnerShopId == shop.Id).OrderByDescending(x => x.CreatedAt)
            .Select(x => new { x.Id, x.OrderId, OrderNumber = db.Orders.Where(o => o.Id == x.OrderId).Select(o => o.OrderNumber).FirstOrDefault(),
                x.PartnerAmount, x.CommissionAmount, x.DeliveryAmount, x.Status, x.CreatedAt }).ToListAsync());
    }

    [HttpPatch("orders/{orderId:int}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int orderId, UpdateOrderStatusRequest request)
    {
        var shop = await OwnShop();
        if (shop is null) return NotFound();
        var order = await db.Orders.FirstOrDefaultAsync(x => x.Id == orderId && x.PartnerShopId == shop.Id);
        if (order is null) return NotFound();
        var allowed = request.Status.Trim() switch
        {
            "Accepted" => new[] { "Pending", "Confirmed" },
            "Preparing" => new[] { "Accepted" },
            "Ready for Pickup" => new[] { "Preparing" },
            _ => Array.Empty<string>()
        };
        if (!allowed.Contains(order.Status, StringComparer.OrdinalIgnoreCase))
            return BadRequest(new { detail = $"Partner cannot transition {order.Status} to {request.Status}." });
        order.Status = request.Status.Trim();
        db.OrderStatusHistory.Add(new OrderStatusHistory { OrderId = order.Id, Status = order.Status,
            ChangedByUserId = UserId, Note = "Updated by fulfillment partner" });
        await db.SaveChangesAsync();
        return Ok(new { order.OrderNumber, order.Status });
    }

    private Task<PartnerShop?> OwnShop() => UserId is { } id
        ? db.PartnerShops.FirstOrDefaultAsync(x => x.UserId == id && x.IsActive)
        : Task.FromResult<PartnerShop?>(null);
}
