using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;

namespace OMStationary.Api.Controllers;

[ApiController]
[Route("api/shops")]
public class PartnerShopsController : ControllerBase
{
    private readonly OmDbContext _db;
    private readonly IConfiguration _configuration;

    public PartnerShopsController(OmDbContext db, IConfiguration configuration)
    {
        _db = db;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] ShopRegistrationRequest request)
    {
        var registrationKey = _configuration["Shop:RegistrationKey"];
        if (string.IsNullOrWhiteSpace(registrationKey))
            return Problem("Shop registration is not enabled. Set Shop__RegistrationKey on the API.", statusCode: 503);

        var suppliedKey = Request.Headers["X-Shop-Registration-Key"].ToString();
        if (!CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(suppliedKey), Encoding.UTF8.GetBytes(registrationKey)))
            return Unauthorized("Invalid shop registration key.");

        PartnerShop? shop = request.Id is int existingId
            ? await _db.PartnerShops.FirstOrDefaultAsync(x => x.Id == existingId && x.IsActive)
            : null;
        if (request.Id is not null && shop is null) return NotFound("Active partner shop was not found.");
        if (shop is null)
        {
            shop = new PartnerShop { IsApproved = false };
            _db.PartnerShops.Add(shop);
        }

        shop.Name = request.Name.Trim();
        shop.OwnerName = request.OwnerName.Trim();
        shop.Address = request.Address.Trim();
        shop.Phone = request.Phone.Trim();
        shop.Pincode = request.Pincode.Trim();
        shop.Latitude = request.Latitude;
        shop.Longitude = request.Longitude;
        shop.IsActive = true;
        await _db.SaveChangesAsync();

        return Ok(new { shop.Id, shop.Name, shop.OwnerName, shop.Address, shop.Phone, shop.Pincode });
    }

    private bool IsAdmin()
    {
        if (User.Identity?.IsAuthenticated == true && User.IsInRole("Admin")) return true;
        var expected = _configuration["Admin:AccessKey"];
        var supplied = Request.Headers["X-Admin-Key"].ToString();
        return !string.IsNullOrWhiteSpace(expected) && CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(expected), Encoding.UTF8.GetBytes(supplied));
    }

    [HttpPatch("{shopId:int}/approval")]
    public async Task<IActionResult> SetApproval(int shopId, [FromBody] ShopApprovalRequest request)
    {
        if (!IsAdmin()) return Unauthorized();
        var shop = await _db.PartnerShops.FirstOrDefaultAsync(x => x.Id == shopId && x.IsActive);
        if (shop is null) return NotFound();
        shop.IsApproved = request.IsApproved;
        await _db.SaveChangesAsync();
        return Ok(new { shop.Id, shop.Name, shop.IsApproved });
    }

    [HttpPost("{shopId:int}/account")]
    public async Task<IActionResult> CreateAccount(int shopId, [FromBody] CreatePartnerAccountRequest request)
    {
        if (!IsAdmin()) return Unauthorized();
        var shop = await _db.PartnerShops.FirstOrDefaultAsync(x => x.Id == shopId && x.IsActive);
        if (shop is null) return NotFound();
        var email = request.Email.Trim().ToLowerInvariant();
        var phone = request.Phone.Trim();
        if (await _db.Users.AnyAsync(x => x.Email == email || x.Phone == phone)) return Conflict(new { detail = "Email or mobile number is already used." });
        if (shop.UserId is not null) return Conflict(new { detail = "This shop already has an account." });
        var roleId = await _db.Roles.Where(x => x.Name == "PartnerShop").Select(x => (int?)x.Id).FirstOrDefaultAsync();
        if (roleId is null) return Problem("Partner accounts are not configured.", statusCode: 503);
        var user = new ApplicationUser { Email = email, Phone = phone, Role = "PartnerShop", RoleId = roleId };
        user.PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(user, request.Password);
        _db.Users.Add(user);
        shop.UserId = user.Id;
        await _db.SaveChangesAsync();
        return Created($"/api/partner/shop", new { shop.Id, shop.Name, user.Email });
    }

    [HttpGet]
    public async Task<IActionResult> List()
    {
        if (!IsAdmin()) return Unauthorized();
        return Ok(await _db.PartnerShops.AsNoTracking().Where(x => x.IsActive).OrderBy(x => x.Name)
            .Select(x => new { x.Id, x.Name, x.Address, x.Pincode, x.IsApproved }).ToListAsync());
    }

    [HttpGet("{shopId:int}/inventory")]
    public async Task<IActionResult> Inventory(int shopId)
    {
        if (!IsAdmin()) return Unauthorized();
        if (!await _db.PartnerShops.AnyAsync(x => x.Id == shopId && x.IsActive)) return NotFound();
        var inventory = await _db.ShopProducts.AsNoTracking().Where(x => x.PartnerShopId == shopId)
            .Join(_db.Products.AsNoTracking(), stock => stock.ProductId, product => product.Id,
                (stock, product) => new { stock.ProductId, product.Name, stock.SellingPrice, stock.Stock, stock.IsAvailable })
            .OrderBy(x => x.Name).ToListAsync();
        return Ok(inventory);
    }

    [HttpPut("{shopId:int}/inventory"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> SaveInventory(int shopId, [FromBody] ShopInventoryRequest request)
    {
        if (!IsAdmin()) return Unauthorized();
        if (!await _db.PartnerShops.AnyAsync(x => x.Id == shopId && x.IsActive)) return NotFound("Active partner shop was not found.");
        if (!await _db.Products.AnyAsync(x => x.Id == request.ProductId && x.IsActive)) return BadRequest("Active product was not found.");
        var stock = await _db.ShopProducts.FirstOrDefaultAsync(x => x.PartnerShopId == shopId && x.ProductId == request.ProductId);
        if (stock is null)
        {
            stock = new ShopProduct { PartnerShopId = shopId, ProductId = request.ProductId };
            _db.ShopProducts.Add(stock);
        }
        stock.SellingPrice = request.SellingPrice;
        stock.Stock = request.Stock;
        stock.IsAvailable = request.IsAvailable;
        await _db.SaveChangesAsync();
        return Ok(new { stock.Id, stock.PartnerShopId, stock.ProductId, stock.SellingPrice, stock.Stock, stock.IsAvailable });
    }
}

public class ShopRegistrationRequest
{
    public int? Id { get; set; }
    [Required, StringLength(120)] public string Name { get; set; } = "";
    [Required, StringLength(120)] public string OwnerName { get; set; } = "";
    [Required, StringLength(500)] public string Address { get; set; } = "";
    [Required, StringLength(20)] public string Phone { get; set; } = "";
    [Required, StringLength(12)] public string Pincode { get; set; } = "";
    [Range(-90, 90)] public double Latitude { get; set; }
    [Range(-180, 180)] public double Longitude { get; set; }
}
