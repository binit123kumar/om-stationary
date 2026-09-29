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
builder.Services.AddScoped<ILocalShopFulfillmentProvider, LocalShopFulfillmentProvider>();
builder.Services.AddScoped<IExternalPlatformFulfillmentProvider, DisabledExternalPlatformFulfillmentProvider>();
builder.Services.AddScoped<IFulfillmentProvider>(sp => sp.GetRequiredService<ILocalShopFulfillmentProvider>());
builder.Services.AddScoped<IFulfillmentProvider>(sp => sp.GetRequiredService<IExternalPlatformFulfillmentProvider>());
builder.Services.AddScoped<FulfillmentSelectionService>();
builder.Services.AddScoped<CouponService>();
builder.Services.AddScoped<SettlementService>();
builder.Services.AddScoped<InvoiceService>();
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

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ??
    ["http://localhost:5173", "http://127.0.0.1:5173"];
builder.Services.AddCors(options => options.AddPolicy("frontend", policy =>
    policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddRateLimiter(options =>
{
    options.AddPolicy("order-writes", context => RateLimitPartition.GetFixedWindowLimiter(
        context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        _ => new FixedWindowRateLimiterOptions { PermitLimit = 8, Window = TimeSpan.FromMinutes(1), QueueLimit = 0 }));
    options.AddPolicy("tracking-reads", context => RateLimitPartition.GetFixedWindowLimiter(
        context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        _ => new FixedWindowRateLimiterOptions { PermitLimit = 30, Window = TimeSpan.FromMinutes(1), QueueLimit = 0 }));
});

var app = builder.Build();

// Keep the API and storefront responsive while local SQL Server is being installed or restarted.
try
{
    await using var scope = app.Services.CreateAsyncScope();
    var db = scope.ServiceProvider.GetRequiredService<OmDbContext>();
    await SafeMigrationBootstrap.ApplyAsync(db);
    if (!await db.Products.AnyAsync())
    {
        db.Products.AddRange(
            new Product { Name = "A4 Paper 500 Sheets", Category = "Stationery", Price = 280, MRP = 330,
                ImageUrl = "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80", Description = "High quality A4 paper" },
            new Product { Name = "HP 680 Ink Cartridge", Category = "Printing & Ink", Price = 1020, MRP = 1199,
                ImageUrl = "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80", Description = "Compatible HP cartridge" },
            new Product { Name = "Logitech Keyboard", Category = "Computer", Price = 799, MRP = 999,
                ImageUrl = "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80", Description = "Full-size keyboard" });
        await db.SaveChangesAsync();
    }
    if (!await db.PlatformConnectors.AnyAsync())
    {
        db.PlatformConnectors.AddRange(
            new PlatformConnector { Name = "Local Partner Shops", Type = "Order+Catalog", Enabled = true, OrderApiAvailable = true, Status = "Ready" },
            new PlatformConnector { Name = "Amazon", Type = "Authorized Partner", Enabled = false, Status = "Needs official authorization" },
            new PlatformConnector { Name = "Flipkart", Type = "Authorized Partner", Enabled = false, Status = "Needs official authorization" },
            new PlatformConnector { Name = "Blinkit / Zepto", Type = "Authorized Partner", Enabled = false, Status = "Needs official authorization" });
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
