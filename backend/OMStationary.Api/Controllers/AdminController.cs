using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

// Admin-only surface for the OM Stationary control centre: dashboard metrics and catalogue
// management. Every route requires the Admin role; the customer storefront has no path here.
[ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
public sealed class AdminController(OmDbContext db, StockAlertService stockAlerts) : ControllerBase
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

    /// <summary>
    /// KPI payload for the admin dashboard. The original field names are preserved so existing
    /// clients keep working; the additional fields are new real aggregates.
    /// </summary>
    [HttpGet("dashboard")]
    public async Task<IActionResult> Dashboard()
    {
        var today = DateTime.UtcNow.Date;
        var nextDay = today.AddDays(1);
        var monthStart = new DateTime(today.Year, today.Month, 1, 0, 0, 0, DateTimeKind.Utc);
        var weekStart = today.AddDays(-6);
        var orders = db.Orders.AsNoTracking();

        var totalOrders = await orders.CountAsync();
        var todayOrders = await orders.CountAsync(x => x.CreatedAt >= today && x.CreatedAt < nextDay);
        var pending = await orders.CountAsync(x => x.Status == "Pending" || x.Status == "Placed");
        var delivered = await orders.CountAsync(x => x.Status == "Delivered");
        var cancelled = await orders.CountAsync(x => x.Status == "Cancelled");

        // Any order that has not reached a terminal state still needs admin attention.
        var openStatuses = new[] { "Pending", "Placed", "Confirmed", "Accepted", "Preparing", "Ready for Pickup", "Picked Up", "Out for Delivery", "Delivery Failed" };
        var openOrders = await orders.CountAsync(x => openStatuses.Contains(x.Status));
        var completedOrders = await orders.CountAsync(x => x.Status == "Delivered" || x.Status == "Picked Up");

        var revenue = await orders.Where(x => x.Status != "Cancelled" && x.Status != "RefundPending")
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var todayRevenue = await orders.Where(x => x.Status != "Cancelled" && x.CreatedAt >= today && x.CreatedAt < nextDay)
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var weekRevenue = await orders.Where(x => x.Status != "Cancelled" && x.CreatedAt >= weekStart)
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var monthRevenue = await orders.Where(x => x.Status != "Cancelled" && x.CreatedAt >= monthStart)
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var paidRevenue = await orders.Where(x => x.Status != "Cancelled" && x.PaymentStatus == "Paid")
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var codOutstanding = await orders.Where(x => x.Status != "Cancelled" && x.PaymentMethod == "COD" && x.PaymentStatus != "Paid")
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var codAmount = await orders.Where(x => x.PaymentMethod == "COD" && x.Status != "Cancelled")
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;
        var onlineAmount = await orders.Where(x => x.PaymentMethod != "COD" && x.Status != "Cancelled")
            .SumAsync(x => (decimal?)x.TotalAmount) ?? 0m;

        var customers = await db.Users.CountAsync(x => x.Role == "Customer");
        var products = await db.Products.CountAsync(x => x.IsActive);
        var totalProducts = await db.Products.CountAsync();
        var lowStock = await db.Products.CountAsync(x => x.IsActive && x.Stock <= x.LowStockThreshold);
        var outOfStock = await db.Products.CountAsync(x => x.IsActive && x.Stock <= 0);

        return Ok(new
        {
            date = today,
            totalOrders, todayOrders, pendingOrders = pending, deliveredOrders = delivered, cancelledOrders = cancelled,
            openOrders, completedOrders,
            revenue, todayRevenue, weekRevenue, monthRevenue, paidRevenue, codOutstanding,
            codAmount, onlineAmount,
            customers, products, totalProducts, lowStockProducts = lowStock, outOfStockProducts = outOfStock
        });
    }

    [HttpGet("products")]
    public async Task<IActionResult> Products([FromQuery] int page = 1, [FromQuery] int pageSize = 25, [FromQuery] string? q = null,
        [FromQuery] string? category = null, [FromQuery] bool? active = null,
        [FromQuery] bool lowStockOnly = false, [FromQuery] bool outOfStockOnly = false,
        [FromQuery] decimal? minPrice = null, [FromQuery] decimal? maxPrice = null,
        [FromQuery] string? sort = null)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);
        var query = db.Products.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(x => x.Name.Contains(term) || x.Sku.Contains(term) || x.Brand.Contains(term) || x.Category.Contains(term));
        }
        if (!string.IsNullOrWhiteSpace(category)) query = query.Where(x => x.Category == category);
        if (active.HasValue) query = query.Where(x => x.IsActive == active.Value);
        if (outOfStockOnly) query = query.Where(x => x.Stock <= 0);
        else if (lowStockOnly) query = query.Where(x => x.Stock > 0 && x.Stock <= x.LowStockThreshold);
        if (minPrice.HasValue) query = query.Where(x => x.Price >= minPrice.Value);
        if (maxPrice.HasValue) query = query.Where(x => x.Price <= maxPrice.Value);

        query = sort?.ToLowerInvariant() switch
        {
            "price-asc" => query.OrderBy(x => x.Price),
            "price-desc" => query.OrderByDescending(x => x.Price),
            "stock-asc" => query.OrderBy(x => x.Stock),
            "stock-desc" => query.OrderByDescending(x => x.Stock),
            "updated-desc" => query.OrderByDescending(x => x.UpdatedAt),
            "newest" => query.OrderByDescending(x => x.CreatedAt),
            _ => query.OrderBy(x => x.Name)
        };

        var total = await query.CountAsync();
        var rows = await query.Skip((page - 1) * pageSize).Take(pageSize)
            .Select(x => new
            {
                x.Id, x.Name, x.Slug, x.Sku, x.Brand, x.Category, x.Unit, x.Price, x.MRP,
                x.Stock, x.LowStockThreshold, x.ImageUrl, x.ShortDescription, x.IsActive, x.CreatedAt, x.UpdatedAt,
                // Derived live so the admin table and the low-stock badges can never disagree.
                stockState = x.Stock <= 0 ? "Out of stock" : x.Stock <= x.LowStockThreshold ? "Low stock" : "In stock",
                stockValue = x.Stock * x.Price
            }).ToListAsync();
        return Ok(new
        {
            total, page, pageSize, items = rows,
            summary = new
            {
                inStock = await db.Products.CountAsync(x => x.IsActive && x.Stock > x.LowStockThreshold),
                lowStock = await db.Products.CountAsync(x => x.IsActive && x.Stock > 0 && x.Stock <= x.LowStockThreshold),
                outOfStock = await db.Products.CountAsync(x => x.IsActive && x.Stock <= 0),
                totalStock = await db.Products.Where(x => x.IsActive).SumAsync(x => (int?)x.Stock) ?? 0,
                stockValue = await db.Products.Where(x => x.IsActive).SumAsync(x => (decimal?)(x.Stock * x.Price)) ?? 0m
            }
        });
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
        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "ProductCreated",
            EntityType = "Product",
            EntityId = "(new)",
            OldValue = null,
            NewValue = AdminSettingsController.Truncate($"name='{product.Name}' sku='{product.Sku}' price={product.Price} stock={product.Stock}")
        });
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

        // Snapshot the commercial fields before overwriting them so the audit log records the real
        // old/new values of an admin price or stock edit.
        var before = $"price={product.Price} mrp={product.MRP} stock={product.Stock} threshold={product.LowStockThreshold} " +
                     $"active={product.IsActive} name='{product.Name}' sku='{product.Sku}'";
        var crossedThreshold = product.Stock > product.LowStockThreshold && request.Stock <= request.LowStockThreshold;

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
        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "ProductUpdated",
            EntityType = "Product",
            EntityId = id.ToString(),
            OldValue = AdminSettingsController.Truncate(before),
            NewValue = AdminSettingsController.Truncate($"price={product.Price} mrp={product.MRP} stock={product.Stock} threshold={product.LowStockThreshold} active={product.IsActive} name='{product.Name}' sku='{product.Sku}'")
        });
        await db.SaveChangesAsync();
        // Crossing the low-stock threshold on a manual edit raises the same alert as a stock
        // adjustment would, so the store is warned whichever path dropped the level.
        if (crossedThreshold && product.IsActive)
            await stockAlerts.NotifyLowStockIfNeededAsync(product, reason: "product_edit");
        return Ok(new { product.Id, product.Name, product.Slug, product.Stock, product.LowStockThreshold, product.UpdatedAt, lowStock = product.Stock <= product.LowStockThreshold });
    }

    [HttpDelete("products/{id:int}")]
    public async Task<IActionResult> DeactivateProduct(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();
        // Soft delete: order history must keep referring to the product.
        var wasActive = product.IsActive;
        product.UpdatedAt = DateTime.UtcNow;
        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "ProductDeactivated",
            EntityType = "Product",
            EntityId = id.ToString(),
            OldValue = AdminSettingsController.Truncate($"active={wasActive}"),
            NewValue = "active=False"
        });
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
        var before = product.Stock;
        var crossedThreshold = before > product.LowStockThreshold && next <= product.LowStockThreshold;
        product.Stock = next;
        product.UpdatedAt = DateTime.UtcNow;
        db.AuditLogs.Add(new AuditLog
        {
            UserId = CurrentUserId,
            Action = "StockAdjusted",
            EntityType = "Product",
            EntityId = id.ToString(),
            OldValue = AdminSettingsController.Truncate($"stock={before} reason={request.Reason ?? "(none)"}"),
            NewValue = AdminSettingsController.Truncate($"stock={next}")
        });
        await db.SaveChangesAsync();
        if (crossedThreshold && product.IsActive)
            await stockAlerts.NotifyLowStockIfNeededAsync(product, reason: "stock_adjustment");
        return Ok(new { product.Id, product.Stock, product.LowStockThreshold, lowStock = product.Stock <= product.LowStockThreshold });
    }

    // Category listing and creation live in AdminCategoriesController (route api/admin/categories).
    // They used to be duplicated here, which made GET/POST /api/admin/categories match two
    // endpoints and answer 500 AmbiguousMatchException. Only one implementation may own a route.

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

