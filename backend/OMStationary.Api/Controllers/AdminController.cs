using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;

namespace OMStationary.Api.Controllers;

// Admin-only surface for the OM Stationary control centre: dashboard metrics and catalogue
// management. Every route requires the Admin role; the customer storefront has no path here.
[ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
public sealed class AdminController(OmDbContext db) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    private static string Slugify(string value)
    {
        var slug = Regex.Replace(value.ToLowerInvariant().Trim(), @"[^a-z0-9]+", "-").Trim('-');
        return string.IsNullOrEmpty(slug) ? $"product-{Guid.NewGuid():N}"[..20] : slug[..Math.Min(slug.Length, 160)];
    }

    private static string? NormalizeUrl(string? url)
    {
        var value = url?.Trim() ?? "";
        if (value.Length == 0) return null;
        if (value.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
            value.StartsWith("https://", StringComparison.OrdinalIgnoreCase) ||
            value.StartsWith("/", StringComparison.Ordinal))
            return value.Length > 600 ? value[..600] : value;
        return null;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> Dashboard()
    {
        var today = DateTime.UtcNow.Date;
        var orders = db.Orders.AsNoTracking();

        var totalOrders = await orders.CountAsync();
        var todayOrders = await orders.CountAsync(x => x.CreatedAt >= today);
        var pending = await orders.CountAsync(x => x.Status == "Pending" || x.Status == "Placed");
        var delivered = await orders.CountAsync(x => x.Status == "Delivered");
        var cancelled = await orders.CountAsync(x => x.Status == "Cancelled");
        var revenue = await orders.Where(x => x.Status != "Cancelled" && x.Status != "RefundPending")
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var codAmount = await orders.Where(x => x.PaymentMethod == "COD" && x.Status != "Cancelled")
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var onlineAmount = await orders.Where(x => x.PaymentMethod != "COD" && x.Status != "Cancelled")
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var customers = await db.Users.CountAsync(x => x.Role == "Customer");
        var products = await db.Products.CountAsync(x => x.IsActive);
        var lowStock = await db.Products.CountAsync(x => x.IsActive && x.Stock <= x.LowStockThreshold);

        return Ok(new
        {
            totalOrders, todayOrders, pendingOrders = pending, deliveredOrders = delivered, cancelledOrders = cancelled,
            revenue, codAmount, onlineAmount, customers, products, lowStockProducts = lowStock
        });
    }

    [HttpGet("products")]
    public async Task<IActionResult> Products([FromQuery] int page = 1, [FromQuery] int pageSize = 25, [FromQuery] string? q = null)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);
        var query = db.Products.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(q))
            query = query.Where(x => x.Name.Contains(q) || x.Sku.Contains(q) || x.Brand.Contains(q));
        var total = await query.CountAsync();
        var rows = await query.OrderBy(x => x.Name)
            .Skip((page - 1) * pageSize).Take(pageSize)
            .Select(x => new
            {
                x.Id, x.Name, x.Slug, x.Sku, x.Brand, x.Category, x.Unit, x.Price, x.MRP,
                x.Stock, x.LowStockThreshold, x.ImageUrl, x.IsActive, x.UpdatedAt
            }).ToListAsync();
        return Ok(new { total, page, pageSize, items = rows });
    }

    [HttpPost("products")]
    public async Task<IActionResult> CreateProduct(ProductWriteRequest request)
    {
        var name = request.Name.Trim();
        if (name.Length == 0) return BadRequest(new { detail = "Product name is required." });
        if (request.Price < 0 || request.MRP < 0) return BadRequest(new { detail = "Price cannot be negative." });
        if (request.Stock < 0) return BadRequest(new { detail = "Stock cannot be negative." });
        var sku = request.Sku.Trim();
        if (sku.Length > 0 && await db.Products.AnyAsync(x => x.Sku == sku))
            return Conflict(new { detail = "That SKU is already used by another product." });

        var product = new Product
        {
            Name = name,
            Slug = Slugify(string.IsNullOrWhiteSpace(request.Slug) ? name : request.Slug),
            Sku = sku,
            Brand = request.Brand.Trim(),
            Unit = string.IsNullOrWhiteSpace(request.Unit) ? "Piece" : request.Unit.Trim(),
            Category = request.Category.Trim(),
            CategoryId = request.CategoryId,
            ShortDescription = request.ShortDescription.Trim(),
            Description = request.Description.Trim(),
            Price = request.Price,
            MRP = request.MRP,
            Stock = request.Stock,
            LowStockThreshold = request.LowStockThreshold,
            ImageUrl = NormalizeUrl(request.ImageUrl) ?? "",
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        await EnsureUniqueSlugAsync(product);
        db.Products.Add(product);
        await db.SaveChangesAsync();
        SyncImages(product, request.ImageUrls);
        await db.SaveChangesAsync();
        return Created($"/api/admin/products/{product.Id}", new { product.Id, product.Name, product.Slug });
    }

    [HttpPut("products/{id:int}")]
    public async Task<IActionResult> UpdateProduct(int id, ProductWriteRequest request)
    {
        var product = await db.Products.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
        if (product is null) return NotFound();
        var name = request.Name.Trim();
        if (name.Length == 0) return BadRequest(new { detail = "Product name is required." });
        if (request.Price < 0 || request.MRP < 0) return BadRequest(new { detail = "Price cannot be negative." });
        if (request.Stock < 0) return BadRequest(new { detail = "Stock cannot be negative." });
        var sku = request.Sku.Trim();
        if (sku.Length > 0 && await db.Products.AnyAsync(x => x.Sku == sku && x.Id != id))
            return Conflict(new { detail = "That SKU is already used by another product." });

        product.Name = name;
        if (!string.IsNullOrWhiteSpace(request.Slug)) product.Slug = Slugify(request.Slug);
        product.Sku = sku;
        product.Brand = request.Brand.Trim();
        if (!string.IsNullOrWhiteSpace(request.Unit)) product.Unit = request.Unit.Trim();
        product.Category = request.Category.Trim();
        product.CategoryId = request.CategoryId;
        product.ShortDescription = request.ShortDescription.Trim();
        product.Description = request.Description.Trim();
        product.Price = request.Price;
        product.MRP = request.MRP;
        product.Stock = request.Stock;
        product.LowStockThreshold = request.LowStockThreshold;
        product.IsActive = request.IsActive;
        product.UpdatedAt = DateTime.UtcNow;
        if (NormalizeUrl(request.ImageUrl) is { } imageUrl) product.ImageUrl = imageUrl;
        await EnsureUniqueSlugAsync(product);
        if (request.ImageUrls is not null) SyncImages(product, request.ImageUrls);
        await db.SaveChangesAsync();
        return Ok(new { product.Id, product.Name, product.Slug, product.Stock, product.UpdatedAt });
    }

    [HttpDelete("products/{id:int}")]
    public async Task<IActionResult> DeactivateProduct(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();
        // Soft delete: order history must keep referring to the product.
        product.IsActive = false;
        product.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("products/{id:int}/stock")]
    public async Task<IActionResult> AdjustStock(int id, StockAdjustmentRequest request)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();
        var next = product.Stock + request.Delta;
        if (next < 0) return BadRequest(new { detail = "Stock cannot be reduced below zero." });
        var actor = CurrentUserId;
        product.Stock = next;
        product.UpdatedAt = DateTime.UtcNow;
        db.AuditLogs.Add(new AuditLog
        {
            UserId = actor,
            Action = "StockAdjusted",
            EntityType = "Product",
            EntityId = id.ToString()
        });
        await db.SaveChangesAsync();
        return Ok(new { product.Id, product.Stock, product.LowStockThreshold, lowStock = product.Stock <= product.LowStockThreshold });
    }

    [HttpGet("categories")]
    public async Task<IActionResult> Categories() =>
        Ok(await db.Categories.AsNoTracking().OrderBy(x => x.Name)
            .Select(x => new { x.Id, x.Name, x.IsActive, ProductCount = db.Products.Count(p => p.CategoryId == x.Id) })
            .ToListAsync());

    [HttpPost("categories")]
    public async Task<IActionResult> CreateCategory(CategoryWriteRequest request)
    {
        var name = request.Name.Trim();
        if (name.Length == 0) return BadRequest(new { detail = "Category name is required." });
        if (await db.Categories.AnyAsync(x => x.Name == name)) return Conflict(new { detail = "That category already exists." });
        var category = new Category { Name = name, IsActive = request.IsActive };
        db.Categories.Add(category);
        await db.SaveChangesAsync();
        return Created($"/api/admin/categories/{category.Id}", new { category.Id, category.Name, category.IsActive, ProductCount = 0 });
    }

    private async Task EnsureUniqueSlugAsync(Product product)
    {
        var baseSlug = product.Slug;
        var candidate = baseSlug;
        var suffix = 2;
        while (await db.Products.AnyAsync(x => x.Slug == candidate && x.Id != product.Id))
        {
            candidate = $"{baseSlug}-{suffix++}";
        }
        product.Slug = candidate;
    }

    private void SyncImages(Product product, List<string>? urls)
    {
        if (urls is null) return;
        var cleaned = urls.Select(NormalizeUrl).Where(x => x is not null).Select(x => x!).Distinct().Take(8).ToList();
        if (cleaned.Count == 0) return;
        db.ProductImages.RemoveRange(product.Images);
        product.Images = cleaned.Select((url, index) => new ProductImage { ProductId = product.Id, Url = url, SortOrder = index }).ToList();
        if (string.IsNullOrWhiteSpace(product.ImageUrl)) product.ImageUrl = cleaned[0];
    }
}

