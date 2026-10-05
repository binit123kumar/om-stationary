using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;

namespace OMStationary.Api.Controllers;

[ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
public sealed class CartController(OmDbContext db) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var cart = await GetOrCreateCart();
        var rows = await db.CartItems.Where(x => x.CartId == cart.Id)
            .Join(db.Products.Where(p => p.IsActive), item => item.ProductId, product => product.Id,
                (item, product) => new { item.Id, item.ProductId, item.Quantity, product.Name, product.Category, product.Price, product.MRP, product.ImageUrl })
            .ToListAsync();
        return Ok(new { items = rows, subtotal = rows.Sum(x => x.Price * x.Quantity) });
    }

    [HttpPost("items")]
    public async Task<IActionResult> Add(CartItemRequest request)
    {
        if (!await db.Products.AnyAsync(p => p.Id == request.ProductId && p.IsActive)) return Conflict(new { detail = "Product is unavailable." });
        var cart = await GetOrCreateCart();
        var item = await db.CartItems.FirstOrDefaultAsync(x => x.CartId == cart.Id && x.ProductId == request.ProductId);
        if (item is null) { item = new CartItem { CartId = cart.Id, ProductId = request.ProductId, Quantity = request.Quantity }; db.CartItems.Add(item); }
        else item.Quantity = Math.Min(99, item.Quantity + request.Quantity);
        cart.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return await Get();
    }

    [HttpPut("items/{itemId:int}")]
    public async Task<IActionResult> SetQuantity(int itemId, CartItemRequest request)
    {
        var cart = await GetOrCreateCart();
        var item = await db.CartItems.FirstOrDefaultAsync(x => x.Id == itemId && x.CartId == cart.Id && x.ProductId == request.ProductId);
        if (item is null) return NotFound();
        if (!await db.Products.AnyAsync(p => p.Id == item.ProductId && p.IsActive)) return Conflict(new { detail = "Product is unavailable." });
        item.Quantity = request.Quantity; cart.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return await Get();
    }

    [HttpDelete("items/{itemId:int}")]
    public async Task<IActionResult> Remove(int itemId)
    {
        var cart = await GetOrCreateCart();
        var item = await db.CartItems.FirstOrDefaultAsync(x => x.Id == itemId && x.CartId == cart.Id);
        if (item is null) return NotFound();
        db.CartItems.Remove(item); cart.UpdatedAt = DateTime.UtcNow; await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> Clear()
    {
        var cart = await GetOrCreateCart();
        await db.CartItems.Where(x => x.CartId == cart.Id).ExecuteDeleteAsync();
        cart.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("merge")]
    public async Task<IActionResult> Merge(CartMergeRequest request)
    {
        var ids = request.Items.Select(x => x.ProductId).Distinct().ToArray();
        if (ids.Length != request.Items.Count) return BadRequest(new { detail = "Guest cart contains duplicate product rows." });
        if (await db.Products.CountAsync(x => x.IsActive && ids.Contains(x.Id)) != ids.Length)
            return Conflict(new { detail = "One or more guest cart products are no longer available." });
        var cart = await GetOrCreateCart();
        foreach (var incoming in request.Items)
        {
            var current = await db.CartItems.FirstOrDefaultAsync(x => x.CartId == cart.Id && x.ProductId == incoming.ProductId);
            if (current is null) db.CartItems.Add(new CartItem { CartId = cart.Id, ProductId = incoming.ProductId, Quantity = incoming.Quantity });
            else current.Quantity = Math.Min(99, current.Quantity + incoming.Quantity);
        }
        cart.UpdatedAt = DateTime.UtcNow; await db.SaveChangesAsync();
        return await Get();
    }

    // Used to synchronize a guest cart before/after account sign-in without accepting prices from the browser.
    [HttpPut]
    public async Task<IActionResult> Replace(CartMergeRequest request)
    {
        var ids = request.Items.Select(x => x.ProductId).Distinct().ToArray();
        if (ids.Length != request.Items.Count) return BadRequest(new { detail = "Cart contains duplicate product rows." });
        if (await db.Products.CountAsync(x => x.IsActive && ids.Contains(x.Id)) != ids.Length)
            return Conflict(new { detail = "One or more cart products are no longer available." });
        var cart = await GetOrCreateCart();
        await using var transaction = await db.Database.BeginTransactionAsync();
        await db.CartItems.Where(x => x.CartId == cart.Id).ExecuteDeleteAsync();
        db.CartItems.AddRange(request.Items.Select(x => new CartItem { CartId = cart.Id, ProductId = x.ProductId, Quantity = x.Quantity }));
        cart.UpdatedAt = DateTime.UtcNow; await db.SaveChangesAsync();
        await transaction.CommitAsync();
        return await Get();
    }

    private async Task<Cart> GetOrCreateCart()
    {
        var userId = CurrentUserId ?? throw new UnauthorizedAccessException();
        var cart = await db.Carts.Include(x => x.Items).FirstOrDefaultAsync(x => x.UserId == userId);
        if (cart is not null) return cart;
        cart = new Cart { UserId = userId };
        db.Carts.Add(cart);
        await db.SaveChangesAsync();
        return cart;
    }
}

