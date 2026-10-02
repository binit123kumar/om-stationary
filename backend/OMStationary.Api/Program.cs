using System.Security.Claims;
using System.Threading.RateLimiting;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Services.AddDbContext<OmDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var signingKey = builder.Configuration["Jwt:SigningKey"];
if (string.IsNullOrWhiteSpace(signingKey))
{
    if (!builder.Environment.IsDevelopment()) throw new InvalidOperationException("Configure Jwt__SigningKey with a high-entropy secret before starting outside Development.");
    signingKey = Convert.ToBase64String(System.Security.Cryptography.RandomNumberGenerator.GetBytes(64));
    builder.Configuration["Jwt:SigningKey"] = signingKey;
}
if (Encoding.UTF8.GetByteCount(signingKey) < 32) throw new InvalidOperationException("Jwt__SigningKey must contain at least 32 UTF-8 bytes.");
builder.Services.AddSingleton<TokenService>();
builder.Services.AddScoped<FirstPartyFulfillmentProvider>();
builder.Services.AddScoped<IFulfillmentProvider>(sp => sp.GetRequiredService<FirstPartyFulfillmentProvider>());
builder.Services.AddScoped<FulfillmentSelectionService>();
builder.Services.AddScoped<CouponService>();
builder.Services.AddScoped<SettlementService>();
builder.Services.AddScoped<InvoiceService>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddSingleton<ICodPaymentProvider, CodPaymentProvider>();
builder.Services.AddHttpClient<PaytmQrPaymentGateway>(client => client.Timeout = TimeSpan.FromSeconds(20));
builder.Services.AddScoped<IPaymentGateway>(sp =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();
    return string.Equals(configuration["Payments:Provider"], "Paytm", StringComparison.OrdinalIgnoreCase) &&
           configuration.GetValue<bool>("Payments:Enabled")
        ? sp.GetRequiredService<PaytmQrPaymentGateway>()
        : new UnconfiguredPaymentGateway(configuration);
});
builder.Services.AddAuthentication("Bearer").AddScheme<AuthenticationSchemeOptions, JwtAuthenticationHandler>("Bearer", _ => { });
builder.Services.AddAuthorization();

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
if (builder.Environment.IsDevelopment() && allowedOrigins.Length == 0)
    allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
if (!builder.Environment.IsDevelopment() &&
    (allowedOrigins.Length == 0 || allowedOrigins.Any(origin =>
        !Uri.TryCreate(origin, UriKind.Absolute, out var uri) ||
        uri.Scheme != Uri.UriSchemeHttps ||
        uri.IsLoopback)))
    throw new InvalidOperationException("Configure Cors__AllowedOrigins with the exact HTTPS storefront origin(s) before starting outside Development.");
builder.Services.AddCors(options => options.AddPolicy("frontend", policy =>
    policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddRateLimiter(options =>
{
    // A throttled request is NOT a server fault. Without this the framework answers 503, which
    // made ordinary throttling look like an application crash.
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    // Partition per signed-in user (falling back to the remote address for anonymous traffic) so one
    // busy shop or a shared NAT gateway cannot exhaust everybody else's allowance.
    static string PartitionKey(HttpContext context) =>
        context.User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? context.Connection.RemoteIpAddress?.ToString()
        ?? "unknown";

    // An order's whole lifecycle is several writes in a row (create, six status changes, delivery
    // assignment, payment), so the window has to be comfortably larger than that.
    options.AddPolicy("order-writes", context => RateLimitPartition.GetFixedWindowLimiter(
        PartitionKey(context),
        _ => new FixedWindowRateLimiterOptions { PermitLimit = 60, Window = TimeSpan.FromMinutes(1), QueueLimit = 0 }));
    options.AddPolicy("tracking-reads", context => RateLimitPartition.GetFixedWindowLimiter(
        PartitionKey(context),
        _ => new FixedWindowRateLimiterOptions { PermitLimit = 120, Window = TimeSpan.FromMinutes(1), QueueLimit = 0 }));
});

var app = builder.Build();

static string Slugify(string value)
{
    var slug = System.Text.RegularExpressions.Regex.Replace(value.ToLowerInvariant().Trim(), @"[^a-z0-9]+", "-").Trim('-');
    return string.IsNullOrEmpty(slug) ? $"product-{Guid.NewGuid():N}"[..20] : slug[..Math.Min(slug.Length, 160)];
}

// Keep the API and storefront responsive while local SQL Server is being installed or restarted.
try
{
    await using var scope = app.Services.CreateAsyncScope();
    var db = scope.ServiceProvider.GetRequiredService<OmDbContext>();
    await SafeMigrationBootstrap.ApplyAsync(db);
    if (!await db.Categories.AnyAsync())
    {
        db.Categories.AddRange(
            new Category { Name = "Stationery" },
            new Category { Name = "Printing & Ink" },
            new Category { Name = "Computer Accessories" },
            new Category { Name = "Office Supplies" },
            new Category { Name = "School Supplies" });
        await db.SaveChangesAsync();
    }
    if (!await db.Products.AnyAsync())
    {
        var categories = await db.Categories.AsNoTracking().ToDictionaryAsync(x => x.Name, x => x.Id);
        var now = DateTime.UtcNow;
        Product Seed(string name, string category, string brand, string sku, decimal price, decimal mrp,
            int stock, string image, string description, string unit = "Piece") => new()
        {
            Name = name,
            Slug = Slugify(name),
            Sku = sku,
            Brand = brand,
            Unit = unit,
            Category = category,
            CategoryId = categories.GetValueOrDefault(category),
            Price = price,
            MRP = mrp,
            Stock = stock,
            LowStockThreshold = 5,
            ImageUrl = image,
            ShortDescription = description.Length > 120 ? description[..120] : description,
            Description = description,
            CreatedAt = now,
            UpdatedAt = now
        };

        db.Products.AddRange(
            Seed("A4 Paper 500 Sheets", "Stationery", "JK", "OM-STN-A4-500", 280, 330, 140,
                "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
                "Bright white 80 GSM A4 copier paper, 500 sheets per ream. Suitable for home printing, office documents and school projects.", "Ream"),
            Seed("HP 680 Ink Cartridge", "Printing & Ink", "HP", "OM-PRN-HP680", 1020, 1199, 32,
                "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",
                "Genuine black ink cartridge for HP 680 series printers. Sharp text, reliable page yield.", "Cartridge"),
            Seed("Logitech Keyboard", "Computer Accessories", "Logitech", "OM-CMP-LOG-KB", 799, 999, 18,
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
                "Full-size wired keyboard with comfortable keys, spill-resistant design and a numeric keypad."),
            Seed("Notebook Single Line 200 Pages", "Stationery", "ClassMate", "OM-STN-NB200", 70, 90, 260,
                "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=800&q=80",
                "Hardbound single-line notebook with 200 pages. Smooth paper that resists pen bleed and tearing.", "Notebook"),
            Seed("SanDisk 64GB Pendrive", "Computer Accessories", "SanDisk", "OM-CMP-SD64", 389, 499, 74,
                "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80",
                "Compact USB flash drive for everyday file transfer, backup and classroom use."),
            Seed("Ergonomic Office Chair", "Office Supplies", "Croma", "OM-OFC-CHR01", 4999, 5999, 9,
                "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80",
                "Mesh-back ergonomic chair with adjustable height, lumbar support and armrests for long working hours."),
            Seed("Gel Pen Pack of 10", "Stationery", "Rorito", "OM-STN-GEL10", 120, 150, 320,
                "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80",
                "Smooth-flow gel pens with comfortable grip. Pack of 10 in assorted colours.", "Pack"),
            Seed("Stapler Heavy Duty", "Office Supplies", "Kangaroo", "OM-OFC-STP01", 245, 320, 55,
                "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80",
                "Metal heavy-duty stapler that punches up to 100 sheets. Includes one box of staples."),
            Seed("Whiteboard Marker Set of 6", "School Supplies", "Camlin", "OM-SCL-WBM06", 210, 260, 88,
                "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
                "Bright, low-smudge whiteboard markers with quick-dry ink. Set of 6 assorted colours.", "Set"),
            Seed("School Bag Two Compartment", "School Supplies", "Sky Bags", "OM-SCL-BAG01", 640, 850, 24,
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
                "Lightweight school bag with two compartments, padded straps and reflective strip."),
            Seed("Toner Cartridge HP 26A", "Printing & Ink", "HP", "OM-PRN-HP26A", 3250, 3799, 11,
                "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",
                "High-yield black toner cartridge for HP 26A printers. Crisp output with low smear.", "Cartridge"),
            Seed("Desk Organizer 5 Slot", "Office Supplies", "Croma", "OM-OFC-ORG05", 540, 690, 30,
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
                "Five-slot desktop organizer for pens, clips and stationery. Keeps a workstation tidy."));
        await db.SaveChangesAsync();
    }
    foreach (var roleName in new[] { "Customer", "Admin", "PartnerShop", "DeliveryPartner" })
        if (!await db.Roles.AnyAsync(x => x.Name == roleName)) db.Roles.Add(new AppRole { Name = roleName });
    await db.SaveChangesAsync();
    var adminEmail = builder.Configuration["Admin:BootstrapEmail"]?.Trim().ToLowerInvariant();
    var adminPassword = builder.Configuration["Admin:BootstrapPassword"];
    if (!string.IsNullOrWhiteSpace(adminEmail) && !string.IsNullOrWhiteSpace(adminPassword) &&
        !await db.Users.AnyAsync(x => x.Email == adminEmail))
    {
        var adminRoleId = await db.Roles.Where(x => x.Name == "Admin").Select(x => x.Id).FirstAsync();
        var admin = new ApplicationUser { Email = adminEmail, Phone = builder.Configuration["Admin:BootstrapPhone"] ?? "", Role = "Admin", RoleId = adminRoleId };
        admin.PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(admin, adminPassword);
        db.Users.Add(admin);
        await db.SaveChangesAsync();
    }
}
catch (Exception error)
{
    app.Logger.LogError(error, "SQL Server initialization failed. API database operations will return service errors until the database is available.");
}

app.Use(async (context, next) =>
{
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["X-Frame-Options"] = "SAMEORIGIN";
    try { await next(); }
    catch (Exception error)
    {
        app.Logger.LogError(error, "Unhandled API request failure.");
        if (context.Response.HasStarted) throw;
        context.Response.Clear();
        context.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
        await context.Response.WriteAsJsonAsync(new { title = "Service temporarily unavailable", status = 503 });
    }
});

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("frontend");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.MapGet("/api/health", async (OmDbContext db) =>
{
    try
    {
        var connected = await db.Database.CanConnectAsync();
        return connected
            ? Results.Ok(new { api = "healthy", database = "healthy" })
            : Results.Json(new { api = "healthy", database = "unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
    catch { return Results.Json(new { api = "healthy", database = "unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable); }
});
app.MapControllers();
app.Run();

