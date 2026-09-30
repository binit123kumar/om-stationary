using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;

namespace OMStationary.Api.Controllers;

[ApiController, Authorize(Roles = "Customer"), Route("api/wishlist")]
public sealed class WishlistController(OmDbContext db) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    private async Task<Wishlist> GetOrCreateAsync(Guid userId)
    {
        var wishlist = await db.Wishlists.Include(x => x.Items).FirstOrDefaultAsync(x => x.UserId == userId);
        if (wishlist is not null) return wishlist;
        wishlist = new Wishlist { UserId = userId };
        db.Wishlists.Add(wishlist);
        await db.SaveChangesAsync();
        return wishlist;
    }

    [HttpGet]
    public async Task<IActionResult> List()
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        var rows = await db.WishlistItems.AsNoTracking()
            .Where(x => x.Wishlist.UserId == id && x.Product.IsActive)
            .OrderByDescending(x => x.AddedAt)
            .Select(x => new
            {
                x.ProductId,
                x.Product.Name,
                x.Product.Slug,
                x.Product.Brand,
                x.Product.Category,
                x.Product.Price,
                x.Product.MRP,
                x.Product.ImageUrl,
                x.Product.Stock,
                x.Product.Unit,
                AddedAt = x.AddedAt
            })
            .ToListAsync();
        return Ok(rows);
    }

    [HttpPost("{productId:int}")]
    public async Task<IActionResult> Add(int productId)
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        if (!await db.Products.AnyAsync(x => x.Id == productId && x.IsActive)) return NotFound();
        var wishlist = await GetOrCreateAsync(id.Value);
        if (wishlist.Items.Any(x => x.ProductId == productId)) return Ok(new { productId, alreadySaved = true });
        wishlist.Items.Add(new WishlistItem { ProductId = productId });
        wishlist.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(new { productId, alreadySaved = false });
    }

    [HttpDelete("{productId:int}")]
    public async Task<IActionResult> Remove(int productId)
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        var removed = await db.WishlistItems
            .Where(x => x.Wishlist.UserId == id && x.ProductId == productId)
            .ExecuteDeleteAsync();
        return removed == 0 ? NotFound() : NoContent();
    }

    [HttpPost("{productId:int}/move-to-cart")]
    public async Task<IActionResult> MoveToCart(int productId)
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        var product = await db.Products.AsNoTracking().FirstOrDefaultAsync(x => x.Id == productId && x.IsActive);
        if (product is null) return NotFound();

        var cart = await db.Carts.Include(x => x.Items).FirstOrDefaultAsync(x => x.UserId == id);
        if (cart is null)
        {
            cart = new Cart { UserId = id.Value };
            db.Carts.Add(cart);
            await db.SaveChangesAsync();
        }

        var line = cart.Items.FirstOrDefault(x => x.ProductId == productId);
        if (line is null) cart.Items.Add(new CartItem { ProductId = productId, Quantity = 1 });
        else line.Quantity++;
        cart.UpdatedAt = DateTime.UtcNow;

        var wishlist = await db.Wishlists.Include(x => x.Items).FirstOrDefaultAsync(x => x.UserId == id);
        var target = wishlist?.Items.FirstOrDefault(x => x.ProductId == productId);
        if (target is not null) wishlist!.Items.Remove(target);
        await db.SaveChangesAsync();
        return Ok(new { productId, moved = true });
    }
}
