using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;

namespace OMStationary.Api.Controllers;

[ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
public sealed class CustomersController(OmDbContext db) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    [HttpGet("me")]
    public async Task<IActionResult> Profile()
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        var user = await db.Users.AsNoTracking().Where(x => x.Id == id).Select(x => new
        {
            x.Id, x.Email, x.Phone, FullName = db.CustomerProfiles.Where(p => p.UserId == x.Id).Select(p => p.FullName).FirstOrDefault()
        }).FirstOrDefaultAsync();
        return user is null ? NotFound() : Ok(user);
    }

    [HttpPut("me")]
    public async Task<IActionResult> UpdateProfile(ProfileUpdateRequest request)
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        var phone = request.Phone.Trim();
        if (await db.Users.AnyAsync(x => x.Phone == phone && x.Id != id)) return Conflict(new { detail = "That mobile number is already in use." });
        var user = await db.Users.FirstAsync(x => x.Id == id);
        var profile = await db.CustomerProfiles.FirstOrDefaultAsync(x => x.UserId == id);
        if (profile is null) { profile = new CustomerProfile { UserId = id.Value }; db.CustomerProfiles.Add(profile); }
        user.Phone = phone;
        profile.FullName = request.FullName.Trim();
        profile.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return Ok(new { user.Id, user.Email, user.Phone, profile.FullName });
    }

    [HttpGet("addresses")]
    public async Task<IActionResult> Addresses()
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        return Ok(await db.Addresses.AsNoTracking().Where(x => x.UserId == id).OrderByDescending(x => x.IsDefault).ThenBy(x => x.Id).ToListAsync());
    }

    [HttpPost("addresses")]
    public async Task<IActionResult> AddAddress(AddressRequest request)
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        var address = new Address { UserId = id.Value };
        var setDefault = request.IsDefault || !await db.Addresses.AnyAsync(x => x.UserId == id);
        ApplyAddress(address, request);
        address.IsDefault = setDefault;
        if (setDefault)
            await db.Addresses.Where(x => x.UserId == id).ExecuteUpdateAsync(s => s.SetProperty(x => x.IsDefault, false));
        db.Addresses.Add(address);
        await db.SaveChangesAsync();
        return Created($"/api/customers/addresses/{address.Id}", address);
    }

    [HttpPut("addresses/{addressId:int}")]
    public async Task<IActionResult> UpdateAddress(int addressId, AddressRequest request)
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        var address = await db.Addresses.FirstOrDefaultAsync(x => x.Id == addressId && x.UserId == id);
        if (address is null) return NotFound();
        if (request.IsDefault) await db.Addresses.Where(x => x.UserId == id && x.Id != addressId).ExecuteUpdateAsync(s => s.SetProperty(x => x.IsDefault, false));
        ApplyAddress(address, request);
        await db.SaveChangesAsync();
        return Ok(address);
    }

    [HttpDelete("addresses/{addressId:int}")]
    public async Task<IActionResult> DeleteAddress(int addressId)
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        var address = await db.Addresses.FirstOrDefaultAsync(x => x.Id == addressId && x.UserId == id);
        if (address is null) return NotFound();
        db.Addresses.Remove(address);
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("orders")]
    public async Task<IActionResult> Orders()
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        var rows = await db.Orders.AsNoTracking().Where(x => x.CustomerUserId == id).OrderByDescending(x => x.CreatedAt)
            .Select(x => new { x.OrderNumber, x.Status, x.PaymentStatus, x.TotalAmount, x.CreatedAt, x.RequestedDeliveryDate,
                FulfillmentMethod = x.SourceType == "OMStationaryPickup" ? "Pickup" : "Delivery",
                History = x.StatusHistory.OrderBy(h => h.CreatedAt).Select(h => new { h.Status, h.CreatedAt }) }).ToListAsync();
        return Ok(rows);
    }

    private static void ApplyAddress(Address target, AddressRequest request)
    {
        target.Label = request.Label.Trim(); target.RecipientName = request.RecipientName.Trim();
        target.Phone = request.Phone.Trim(); target.Line1 = request.Line1.Trim(); target.Line2 = request.Line2.Trim();
        target.City = request.City.Trim(); target.State = request.State.Trim(); target.Pincode = request.Pincode.Trim();
        target.Latitude = request.Latitude; target.Longitude = request.Longitude; target.IsDefault = request.IsDefault;
    }
}
