using System.Globalization;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;
using OMStationary.Api.Services;
namespace OMStationary.Api.Controllers;
/// <summary>
/// Reporting and analytics surface for the OM Stationary control centre.
///
/// Admin role only, enforced by [Authorize(Roles = "Admin")] on the controller: a Customer JWT is
/// rejected with 403 by the framework before any handler runs, so hiding links in React is never
/// the only protection. Every number is aggregated by SQL Server from real rows - nothing seeded.
/// </summary>
[ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
public sealed class AdminReportsController(OmDbContext db) : ControllerBase
{
    // Mirrors the open/completed sets of OrderStateMachine so the KPIs cannot drift from the
    // transitions the API actually permits.
    private static readonly string[] OpenStatuses = ["Pending", "Placed", "Confirmed", "Accepted", "Preparing", "Ready for Pickup", "Picked Up", "Out for Delivery", "Delivery Failed"];
    private static readonly string[] CompletedStatuses = ["Delivered", "Picked Up"];
    /// <summary>Sales, order-status, payment and delivery breakdowns for the dashboard charts.</summary>
    [HttpGet("analytics")]
    public async Task<IActionResult> Analytics([FromQuery] int days = 14)
    {
        days = Math.Clamp(days, 1, 90);
        var today = DateTime.UtcNow.Date;
        var from = today.AddDays(-(days - 1));
        var counted = db.Orders.AsNoTracking().Where(x => x.Status != "Cancelled");
        var daily = await db.Orders.AsNoTracking()
            .Where(x => x.CreatedAt >= from && x.Status != "Cancelled")
            .GroupBy(x => x.CreatedAt.Date)
            .Select(g => new { Date = g.Key, Orders = g.Count(), Revenue = g.Sum(x => x.TotalAmount) })
            .ToListAsync();
        // Every status present in the database is reported, so a state the UI has never seen still
        // shows its real count instead of being silently dropped.
        var statusRows = await db.Orders.AsNoTracking()
            .GroupBy(x => x.Status)
            .Select(g => new { Status = g.Key, Count = g.Count(), Revenue = g.Sum(x => x.TotalAmount) })
            .ToListAsync();
        var paymentByProvider = await db.Payments.AsNoTracking()
            .GroupBy(x => new { x.Provider, x.Status })
            .Select(g => new { g.Key.Provider, g.Key.Status, Count = g.Count(), Amount = g.Sum(x => x.Amount) })
            .ToListAsync();
        var paymentByMethod = await db.Orders.AsNoTracking()
            .GroupBy(x => new { x.PaymentMethod, x.PaymentStatus })
            .Select(g => new { g.Key.PaymentMethod, g.Key.PaymentStatus, Count = g.Count(), Amount = g.Sum(x => x.TotalAmount) })
            .ToListAsync();
        var fulfillment = await db.Orders.AsNoTracking()
            .GroupBy(x => x.SourceType)
            .Select(g => new { Source = g.Key, Count = g.Count() })
            .ToListAsync();
        var deliveryStatuses = await db.Deliveries.AsNoTracking()
            .GroupBy(x => x.Status)
            .Select(g => new { g.Key, Count = g.Count() })
            .ToListAsync();
        var weekStart = today.AddDays(-6);
        var monthStart = new DateTime(today.Year, today.Month, 1, 0, 0, 0, DateTimeKind.Utc);
        var yesterday = today.AddDays(-1);
        static async Task<(int Orders, decimal Revenue)> Window(IQueryable<Order> source, DateTime start, DateTime end) =>
            (await source.CountAsync(x => x.CreatedAt >= start && x.CreatedAt < end),
             await source.Where(x => x.CreatedAt >= start && x.CreatedAt < end).SumAsync(x => (decimal?)x.TotalAmount) ?? 0m);
        var todayWindow = await Window(counted, today, today.AddDays(1));
        var yesterdayWindow = await Window(counted, yesterday, today);
        var weekWindow = await Window(counted, weekStart, today.AddDays(1));
        var monthWindow = await Window(counted, monthStart, today.AddDays(1));
        var topProducts = await db.OrderItems.AsNoTracking()
            .Join(db.Orders.AsNoTracking().Where(x => x.Status != "Cancelled"), i => i.OrderId, o => o.Id,
                (i, o) => new { i.ProductName, i.Quantity, i.UnitPrice })
            .GroupBy(x => x.ProductName)
            .Select(g => new { ProductName = g.Key, Quantity = g.Sum(x => x.Quantity), Revenue = g.Sum(x => x.Quantity * x.UnitPrice) })
            .OrderByDescending(x => x.Quantity)
            .Take(8)
            .ToListAsync();
        return Ok(new
        {
            from, days,
            sales = new
            {
                today = new { orders = todayWindow.Orders, revenue = todayWindow.Revenue },
                yesterday = new { orders = yesterdayWindow.Orders, revenue = yesterdayWindow.Revenue },
                thisWeek = new { orders = weekWindow.Orders, revenue = weekWindow.Revenue },
                thisMonth = new { orders = monthWindow.Orders, revenue = monthWindow.Revenue }
            },
            daily,
            orderStatus = statusRows.OrderByDescending(x => x.Count).ToList(),
            paymentProviderStatus = paymentByProvider,
            paymentMethodStatus = paymentByMethod,
            fulfillment,
            deliveryStatus = deliveryStatuses,
            topProducts
        });
    }
    /// <summary>Distinct real values for the admin filter dropdowns, so no UI can invent a state.</summary>
    [HttpGet("filter-options")]
    public async Task<IActionResult> FilterOptions()
    {
        var statuses = await db.Orders.AsNoTracking().Select(x => x.Status).Distinct().ToListAsync();
        var paymentStatuses = await db.Orders.AsNoTracking().Select(x => x.PaymentStatus).Distinct().ToListAsync();
        var paymentMethods = await db.Orders.AsNoTracking().Select(x => x.PaymentMethod).Distinct().ToListAsync();
        var gatewayStatuses = await db.Payments.AsNoTracking().Select(x => x.Status).Distinct().ToListAsync();
        var providers = await db.Payments.AsNoTracking().Select(x => x.Provider).Distinct().ToListAsync();
        var categories = await db.Products.AsNoTracking().Select(x => x.Category).Distinct().ToListAsync();
        return Ok(new
        {
            orderStatuses = statuses.OrderBy(x => x, StringComparer.Ordinal).ToList(),
            // The workflow the state machine actually permits, used to render valid transitions.
            allowedTransitions = OrderStateMachine.Statuses.ToDictionary(s => s, s => OrderStateMachine.NextStatuses(s), StringComparer.OrdinalIgnoreCase),
            paymentStatuses = paymentStatuses.OrderBy(x => x, StringComparer.Ordinal).ToList(),
            paymentMethods = paymentMethods.OrderBy(x => x, StringComparer.Ordinal).ToList(),
            gatewayStatuses = gatewayStatuses.OrderBy(x => x, StringComparer.Ordinal).ToList(),
            providers = providers.OrderBy(x => x, StringComparer.Ordinal).ToList(),
            categories = categories.Where(x => !string.IsNullOrWhiteSpace(x)).OrderBy(x => x, StringComparer.Ordinal).ToList()
        });
    }
    /// <summary>
    /// Customer accounts with order aggregates. Password hashes are never projected, so they cannot
    /// leak into a response even by accident.
    /// </summary>
    [HttpGet("customers")]
    public async Task<IActionResult> Customers([FromQuery] string? q = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 25)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);
        var query = db.Users.AsNoTracking().Where(x => x.Role == "Customer");
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(x => x.Email.Contains(term) || x.Phone.Contains(term) ||
                db.CustomerProfiles.Any(p => p.UserId == x.Id && p.FullName.Contains(term)));
        }
        var total = await query.CountAsync();
        var ids = await query.OrderByDescending(x => x.CreatedAt).Skip((page - 1) * pageSize).Take(pageSize)
            .Select(x => x.Id).ToListAsync();
        var users = await db.Users.AsNoTracking().Where(x => ids.Contains(x.Id))
            .Select(x => new
            {
                x.Id, x.Email, x.Phone, x.IsActive, x.CreatedAt,
                FullName = db.CustomerProfiles.Where(p => p.UserId == x.Id).Select(p => p.FullName).FirstOrDefault(),
                OrderCount = db.Orders.Count(o => o.CustomerUserId == x.Id),
                OrderValue = db.Orders.Where(o => o.CustomerUserId == x.Id && o.Status != "Cancelled").Sum(o => (decimal?)o.TotalAmount) ?? 0m
            }).ToListAsync();
        return Ok(new { total, page, pageSize, items = users });
    }
    /// <summary>Real payment rows. Provider references appear exactly as the gateway returned them.</summary>
    [HttpGet("payments")]
    public async Task<IActionResult> Payments([FromQuery] string? status = null, [FromQuery] string? provider = null,
        [FromQuery] string? method = null, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null,
        [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 200);
        // Payment has no navigation property, so the join is explicit and the projection is
        // restricted to columns that exist and are safe to show an administrator.
        var query = from p in db.Payments.AsNoTracking()
                    join o in db.Orders.AsNoTracking() on p.OrderId equals o.Id
                    select new
                    {
                        p.Id, p.Provider, p.Status, p.Amount, p.ProviderReference, p.CreatedAt, p.PaidAt,
                        p.OrderId, o.OrderNumber, o.PaymentMethod, OrderPaymentStatus = o.PaymentStatus,
                        o.CustomerName, o.CustomerPhone
                    };
        if (!string.IsNullOrWhiteSpace(status)) query = query.Where(x => x.Status == status);
        if (!string.IsNullOrWhiteSpace(provider)) query = query.Where(x => x.Provider == provider);
        if (!string.IsNullOrWhiteSpace(method)) query = query.Where(x => x.PaymentMethod == method);
        if (from.HasValue) query = query.Where(x => x.CreatedAt >= from.Value);
        if (to.HasValue) query = query.Where(x => x.CreatedAt < to.Value);
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(x => x.Id).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return Ok(new { total, page, pageSize, items });
    }
    [HttpGet("invoices")]
    public async Task<IActionResult> Invoices([FromQuery] string? q = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 200);
        var query = db.Invoices.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(x => x.InvoiceNumber.Contains(term) || x.OrderNumber.Contains(term) ||
                x.CustomerName.Contains(term) || x.CustomerEmail.Contains(term) || x.CustomerPhone.Contains(term));
        }
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(x => x.InvoiceDate).Skip((page - 1) * pageSize).Take(pageSize)
            .Select(x => new
            {
                x.Id, x.InvoiceNumber, x.OrderNumber, x.InvoiceDate, x.Subtotal, x.Discount,
                x.TaxAmount, x.DeliveryCharge, x.GrandTotal, x.PaymentMethod, x.PaymentStatus, x.FulfillmentMethod,
                x.CustomerName, x.CustomerEmail, x.CustomerPhone
            }).ToListAsync();
        return Ok(new { total, page, pageSize, items });
    }
    /// <summary>Wishlist analytics only. No customer identity is returned.</summary>
    [HttpGet("wishlist")]
    public async Task<IActionResult> Wishlist()
    {
        var totalItems = await db.WishlistItems.CountAsync();
        var wishlists = await db.Wishlists.CountAsync();
        var mostWished = await db.WishlistItems.AsNoTracking()
            .GroupBy(x => new { x.ProductId, x.Product!.Name })
            .Select(g => new { ProductId = g.Key.ProductId, ProductName = g.Key.Name, WishlistCount = g.Count() })
            .OrderByDescending(x => x.WishlistCount)
            .Take(10)
            .ToListAsync();
        return Ok(new { totalItems, wishlists, mostWished });
    }
    /// <summary>
    /// Operational admin feed assembled from real orders, payments and stock levels.
    /// Customer in-app notification rows are NOT exposed here and are never delivered to admin
    /// accounts - the storefront notification feed stays strictly per-customer.
    /// </summary>
    [HttpGet("notifications")]
    public async Task<IActionResult> Notifications()
    {
        var recentOrders = await db.Orders.AsNoTracking().OrderByDescending(x => x.CreatedAt).Take(15)
            .Select(x => new
            {
                x.OrderNumber, x.CustomerName, x.Status, x.PaymentMethod, x.PaymentStatus, x.TotalAmount, x.CreatedAt,
                Fulfillment = x.SourceType == "OMStationaryPickup" ? "Pickup" : "Delivery"
            }).ToListAsync();
        var lowStock = await db.Products.AsNoTracking()
            .Where(x => x.IsActive && x.Stock <= x.LowStockThreshold)
            .OrderBy(x => x.Stock).Take(15)
            .Select(x => new { x.Id, x.Name, x.Sku, x.Stock, x.LowStockThreshold })
            .ToListAsync();
        var paymentAlerts = await db.Payments.AsNoTracking()
            .Where(x => x.Status != "Paid")
            .OrderByDescending(x => x.Id).Take(15)
            .Select(x => new
            {
                x.Provider, x.Status, x.Amount, x.CreatedAt, x.ProviderReference, x.OrderId,
                OrderNumber = db.Orders.Where(o => o.Id == x.OrderId).Select(o => o.OrderNumber).FirstOrDefault(),
                OrderPaymentStatus = db.Orders.Where(o => o.Id == x.OrderId).Select(o => o.PaymentStatus).FirstOrDefault()
            }).ToListAsync();
        var failed = await db.Payments.AsNoTracking().CountAsync(x => x.Status == "Failed" || x.Status == "ReviewRequired");
        var newOrdersToday = await db.Orders.AsNoTracking().CountAsync(x => x.CreatedAt >= DateTime.UtcNow.Date);
        var systemCount = (newOrdersToday > 0 ? 1 : 0) + (lowStock.Count > 0 ? 1 : 0) + (failed > 0 ? 1 : 0);
        return Ok(new
        {
            summary = new { newOrdersToday, lowStockCount = lowStock.Count, paymentAlertsCount = paymentAlerts.Count, failedPayments = failed, systemCount },
            orders = recentOrders,
            lowStock,
            payments = paymentAlerts
        });
    }
    [HttpGet("audit-log")]
    public async Task<IActionResult> AuditLog([FromQuery] int take = 100)
    {
        take = Math.Clamp(take, 1, 500);
        var rows = await db.AuditLogs.AsNoTracking().OrderByDescending(x => x.Id).Take(take)
            .Select(x => new
            {
                x.Id, x.Action, x.EntityType, x.EntityId, x.CreatedAt, x.OldValue, x.NewValue,
                AdminEmail = x.UserId == null ? null : db.Users.Where(u => u.Id == x.UserId).Select(u => u.Email).FirstOrDefault()
            }).ToListAsync();
        return Ok(rows);
    }
    /// <summary>
    /// Reports across sales, orders, customers, products, inventory, payments and delivery for a
    /// date range, plus the data the CSV export renders from the same aggregation.
    /// </summary>
    [HttpGet("reports")]
    public async Task<IActionResult> Reports([FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)
    {
        if (!TryRange(from, to, out var start, out var endExclusive, out var problem)) return BadRequest(new { detail = problem });
        var data = await BuildReport(start, endExclusive);
        return Ok(data);
    }
    /// <summary>CSV export of one report. Rendered server-side so totals stay authoritative.</summary>
    [HttpGet("reports/export")]
    public async Task<IActionResult> ExportReports([FromQuery] string report = "sales", [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)
    {
        if (!TryRange(from, to, out var start, out var endExclusive, out var problem)) return BadRequest(new { detail = problem });
        var d = await BuildReport(start, endExclusive);
        string[] header;
        IEnumerable<string[]> rows;
        switch (report.ToLowerInvariant())
        {
            case "orders":
                header = ["Status", "Orders", "Amount"];
                rows = d.Orders.Select(x => new[] { x.Status, x.Count.ToString(CultureInfo.InvariantCulture), x.Amount.ToString("N2", CultureInfo.InvariantCulture) });
                break;
            case "customers":
                header = ["Customer", "Mobile", "Orders", "Value"];
                rows = d.Customers.Select(x => new[] { x.Name, x.Phone, x.Orders.ToString(CultureInfo.InvariantCulture), x.Value.ToString("N2", CultureInfo.InvariantCulture) });
                break;
            case "products":
                header = ["Product", "SKU", "Quantity", "Revenue"];
                rows = d.Products.Select(x => new[] { x.Name, x.Sku, x.Quantity.ToString(CultureInfo.InvariantCulture), x.Revenue.ToString("N2", CultureInfo.InvariantCulture) });
                break;
            case "inventory":
                header = ["Product", "SKU", "Category", "Stock", "Threshold", "Active", "UnitPrice", "StockValue"];
                rows = d.Inventory.Select(x => new[] { x.Name, x.Sku, x.Category, x.Stock.ToString(CultureInfo.InvariantCulture),
                    x.Threshold.ToString(CultureInfo.InvariantCulture), x.Active ? "Yes" : "No",
                    x.Price.ToString("N2", CultureInfo.InvariantCulture), x.StockValue.ToString("N2", CultureInfo.InvariantCulture) });
                break;
            case "payments":
                header = ["PaymentMethod", "PaymentStatus", "Count", "Amount"];
                rows = d.Payments.Select(x => new[] { x.Method, x.Status, x.Count.ToString(CultureInfo.InvariantCulture), x.Amount.ToString("N2", CultureInfo.InvariantCulture) });
                break;
            case "delivery":
                header = ["SourceType", "Status", "Count"];
                rows = d.Delivery.Select(x => new[] { x.Source, x.Status, x.Count.ToString(CultureInfo.InvariantCulture) });
                break;
            default:
                header = ["Metric", "Value"];
                rows = d.SalesRows.Select(x => new[] { x.Metric, x.Value });
                break;
        }
        var builder = new StringBuilder();
        builder.AppendLine(string.Join(",", header.Select(Escape)));
        foreach (var row in rows) builder.AppendLine(string.Join(",", row.Select(Escape)));
        return File(Encoding.UTF8.GetBytes(builder.ToString()), "text/csv",
            $"om-stationary-{report}-{DateTime.UtcNow:yyyyMMddHHmm}.csv");
        static string Escape(string? value)
        {
            var clean = (value ?? "").Replace("\"", "'").Replace("\r", " ").Replace("\n", " ");
            return clean.Contains(',') ? $"\"{clean}\"" : clean;
        }
    }
    private static bool TryRange(DateTime? from, DateTime? to, out DateTime start, out DateTime endExclusive, out string problem)
    {
        start = from?.Date ?? DateTime.UtcNow.Date.AddDays(-29);
        endExclusive = (to?.Date ?? DateTime.UtcNow.Date).AddDays(1);
        problem = "";
        if (endExclusive <= start) { problem = "The end date must be on or after the start date."; return false; }
        if ((endExclusive - start).TotalDays > 400) { problem = "Report range is limited to 400 days."; return false; }
        return true;
    }
    private async Task<ReportData> BuildReport(DateTime start, DateTime endExclusive)
    {
        var orders = db.Orders.AsNoTracking().Where(x => x.CreatedAt >= start && x.CreatedAt < endExclusive);
        var live = orders.Where(x => x.Status != "Cancelled");
        var salesRows = new List<MetricRow>
        {
            Metric("From", start.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)),
            Metric("To", endExclusive.AddTicks(-1).ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)),
            Metric("Orders", (await live.CountAsync()).ToString(CultureInfo.InvariantCulture)),
            Metric("Cancelled", (await orders.CountAsync(x => x.Status == "Cancelled")).ToString(CultureInfo.InvariantCulture)),
            Metric("Revenue", (await live.SumAsync(x => (decimal?)x.TotalAmount) ?? 0m).ToString("N2", CultureInfo.InvariantCulture)),
            Metric("Subtotal", (await live.SumAsync(x => (decimal?)x.Subtotal) ?? 0m).ToString("N2", CultureInfo.InvariantCulture)),
            Metric("Discount", (await live.SumAsync(x => (decimal?)x.DiscountAmount) ?? 0m).ToString("N2", CultureInfo.InvariantCulture)),
            Metric("Tax collected", (await live.SumAsync(x => (decimal?)x.TaxAmount) ?? 0m).ToString("N2", CultureInfo.InvariantCulture)),
            Metric("Delivery charges", (await live.SumAsync(x => (decimal?)x.DeliveryCharge) ?? 0m).ToString("N2", CultureInfo.InvariantCulture)),
            Metric("COD amount", (await live.Where(x => x.PaymentMethod == "COD").SumAsync(x => (decimal?)x.TotalAmount) ?? 0m).ToString("N2", CultureInfo.InvariantCulture)),
            Metric("Online amount", (await live.Where(x => x.PaymentMethod != "COD").SumAsync(x => (decimal?)x.TotalAmount) ?? 0m).ToString("N2", CultureInfo.InvariantCulture)),
            Metric("Paid amount", (await live.Where(x => x.PaymentStatus == "Paid").SumAsync(x => (decimal?)x.TotalAmount) ?? 0m).ToString("N2", CultureInfo.InvariantCulture))
        };

        static MetricRow Metric(string name, string value) => new() { Metric = name, Value = value };
        var orderRows = await orders.GroupBy(x => x.Status)
            .Select(g => new StatusAmount { Status = g.Key, Count = g.Count(), Amount = g.Sum(x => x.TotalAmount) })
            .OrderByDescending(x => x.Count).ToListAsync();
        var customerRows = await orders.GroupBy(x => new { x.CustomerName, x.CustomerPhone })
            .Select(g => new CustomerAmount
            {
                Name = g.Key.CustomerName, Phone = g.Key.CustomerPhone, Orders = g.Count(),
                Value = g.Where(o => o.Status != "Cancelled").Sum(o => o.TotalAmount)
            }).OrderByDescending(x => x.Value).Take(25).ToListAsync();
        var productRows = await db.OrderItems.AsNoTracking()
            .Join(orders.Where(x => x.Status != "Cancelled"), i => i.OrderId, o => o.Id, (i, o) => new { i.ProductName, i.Sku, i.Quantity, i.UnitPrice })
            .GroupBy(x => new { x.ProductName, x.Sku })
            .Select(g => new ProductAmount
            {
                Name = g.Key.ProductName, Sku = g.Key.Sku,
                Quantity = g.Sum(x => x.Quantity), Revenue = g.Sum(x => x.Quantity * x.UnitPrice)
            }).OrderByDescending(x => x.Quantity).Take(50).ToListAsync();
        var inventoryRows = await db.Products.AsNoTracking().Select(x => new InventoryRow
        {
            Id = x.Id, Name = x.Name, Sku = x.Sku, Category = x.Category, Stock = x.Stock,
            Threshold = x.LowStockThreshold, Active = x.IsActive, Price = x.Price,
            StockValue = x.Stock * x.Price, UpdatedAt = x.UpdatedAt
        }).OrderBy(x => x.Stock).ToListAsync();
        var paymentRows = await orders.GroupBy(x => new { x.PaymentMethod, x.PaymentStatus })
            .Select(g => new MethodStatusAmount
            {
                Method = g.Key.PaymentMethod, Status = g.Key.PaymentStatus,
                Count = g.Count(), Amount = g.Sum(x => x.TotalAmount)
            }).OrderByDescending(x => x.Amount).ToListAsync();
        var deliveryRows = await orders.GroupBy(x => new { x.SourceType, x.Status })
            .Select(g => new SourceStatus { Source = g.Key.SourceType, Status = g.Key.Status, Count = g.Count() })
            .OrderByDescending(x => x.Count).ToListAsync();
        return new ReportData
        {
            From = start, To = endExclusive.AddTicks(-1), SalesRows = salesRows,
            Orders = orderRows, Customers = customerRows, Products = productRows,
            Inventory = inventoryRows, Payments = paymentRows, Delivery = deliveryRows
        };
    }
    public sealed class MetricRow { public string Metric { get; set; } = ""; public string Value { get; set; } = ""; }
    public sealed class StatusAmount { public string Status { get; set; } = ""; public int Count { get; set; } public decimal Amount { get; set; } }
    public sealed class CustomerAmount { public string Name { get; set; } = ""; public string Phone { get; set; } = ""; public int Orders { get; set; } public decimal Value { get; set; } }
    public sealed class ProductAmount { public string Name { get; set; } = ""; public string Sku { get; set; } = ""; public int Quantity { get; set; } public decimal Revenue { get; set; } }
    public sealed class MethodStatusAmount { public string Method { get; set; } = ""; public string Status { get; set; } = ""; public int Count { get; set; } public decimal Amount { get; set; } }
    public sealed class SourceStatus { public string Source { get; set; } = ""; public string Status { get; set; } = ""; public int Count { get; set; } }
    public sealed class InventoryRow
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Sku { get; set; } = "";
        public string Category { get; set; } = "";
        public int Stock { get; set; }
        public int Threshold { get; set; }
        public bool Active { get; set; }
        public decimal Price { get; set; }
        public decimal StockValue { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
    public sealed class ReportData
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public List<MetricRow> SalesRows { get; set; } = [];
        public List<StatusAmount> Orders { get; set; } = [];
        public List<CustomerAmount> Customers { get; set; } = [];
        public List<ProductAmount> Products { get; set; } = [];
        public List<InventoryRow> Inventory { get; set; } = [];
        public List<MethodStatusAmount> Payments { get; set; } = [];
        public List<SourceStatus> Delivery { get; set; } = [];
    }
}
