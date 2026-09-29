using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

[ApiController, Route("api/delivery")]
public sealed class DeliveryOperationsController(OmDbContext db, SettlementService settlements) : ControllerBase
{
    [Authorize(Roles = "Admin"), HttpGet("management/partners")]
    public async Task<IActionResult> Partners() => Ok(await db.DeliveryPartners.AsNoTracking().OrderBy(x => x.Name)
        .Select(x => new { x.Id, x.Name, x.Mobile, x.Email, x.VehicleType, x.VehicleNumber, x.Status, x.IsAvailable }).ToListAsync());

    [Authorize(Roles = "Admin"), HttpPost("management/partners")]
    public async Task<IActionResult> CreatePartner(DeliveryPartnerRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var phone = request.Mobile.Trim();
        if (await db.Users.AnyAsync(x => x.Email == email || x.Phone == phone)) return Conflict(new { detail = "Email or mobile number is already used." });
        var roleId = await db.Roles.Where(x => x.Name == "DeliveryPartner").Select(x => (int?)x.Id).FirstOrDefaultAsync();
        if (roleId is null) return Problem("Delivery partner accounts are not configured.", statusCode: 503);
        var user = new ApplicationUser { Email = email, Phone = phone, Role = "DeliveryPartner", RoleId = roleId };
        user.PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(user, request.Password);
        var partner = new DeliveryPartner { UserId = user.Id, Name = request.Name.Trim(), Mobile = phone, Email = email,
            VehicleType = request.VehicleType.Trim(), VehicleNumber = request.VehicleNumber.Trim(), Status = "Active", IsAvailable = true };
        db.Users.Add(user); db.DeliveryPartners.Add(partner); await db.SaveChangesAsync();
        return Created($"/api/delivery/management/partners/{partner.Id}", new { partner.Id, partner.Name, partner.Email, partner.Mobile, partner.Status });
    }

    [Authorize(Roles = "Admin"), HttpGet("management/assignments")]
    public async Task<IActionResult> AllAssignments() => Ok(await db.Deliveries.AsNoTracking().OrderByDescending(x => x.Id)
        .Select(x => new { x.Id, x.OrderId, x.PartnerName, x.DeliveryPartnerId, x.Status, x.TrackingCode, x.Charge,
            OrderNumber = db.Orders.Where(o => o.Id == x.OrderId).Select(o => o.OrderNumber).FirstOrDefault() }).ToListAsync());

    [Authorize(Roles = "DeliveryPartner"), HttpGet("assignments")]
    public async Task<IActionResult> MyAssignments()
    {
        if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId)) return Unauthorized();
        var partnerId = await db.DeliveryPartners.Where(x => x.UserId == userId && x.Status == "Active").Select(x => (int?)x.Id).FirstOrDefaultAsync();
        if (partnerId is null) return NotFound();
        var rows = await db.Deliveries.AsNoTracking().Where(x => x.DeliveryPartnerId == partnerId)
            .OrderByDescending(x => x.Id).Select(d => new
            {
                d.Id, d.Status, d.PickupAddress, d.DropAddress, d.TrackingCode,
                OrderNumber = db.Orders.Where(o => o.Id == d.OrderId).Select(o => o.OrderNumber).FirstOrDefault(),
                CustomerName = db.Orders.Where(o => o.Id == d.OrderId).Select(o => o.CustomerName).FirstOrDefault(),
                CustomerPhone = db.Orders.Where(o => o.Id == d.OrderId).Select(o => o.CustomerPhone).FirstOrDefault(),
                CodAmount = db.Orders.Where(o => o.Id == d.OrderId).Select(o => o.TotalAmount).FirstOrDefault(),
                PaymentStatus = db.Orders.Where(o => o.Id == d.OrderId).Select(o => o.PaymentStatus).FirstOrDefault(),
                Items = db.OrderItems.Where(i => i.OrderId == d.OrderId).Select(i => new { i.ProductName, i.Quantity })
            }).ToListAsync();
        return Ok(rows);
    }

    [Authorize(Roles = "DeliveryPartner"), HttpPatch("assignments/{deliveryId:int}/status")]
    public async Task<IActionResult> UpdateStatus(int deliveryId, DeliveryPartnerStatusRequest request)
    {
        if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId)) return Unauthorized();
        var partnerId = await db.DeliveryPartners.Where(x => x.UserId == userId && x.Status == "Active").Select(x => (int?)x.Id).FirstOrDefaultAsync();
        if (partnerId is null) return NotFound();
        var delivery = await db.Deliveries.FirstOrDefaultAsync(x => x.Id == deliveryId && x.DeliveryPartnerId == partnerId);
        if (delivery is null) return NotFound();
        var next = request.Status.Trim();
        var allowed = delivery.Status switch
        {
            "Assigned" => new[] { "Accepted", "Cancelled" },
            "Accepted" => new[] { "ArrivedAtPickup", "Cancelled" },
            "ArrivedAtPickup" => new[] { "PickedUp", "Failed", "Cancelled" },
            "PickedUp" => new[] { "OutForDelivery", "Failed" },
            "OutForDelivery" => new[] { "Delivered", "Failed" },
            _ => Array.Empty<string>()
        };
        if (!allowed.Contains(next, StringComparer.OrdinalIgnoreCase)) return BadRequest(new { detail = $"Delivery cannot transition from {delivery.Status} to {next}." });
        await using var transaction = await db.Database.BeginTransactionAsync();
        var canonical = allowed.First(x => x.Equals(next, StringComparison.OrdinalIgnoreCase));
        delivery.Status = canonical;
        if (canonical == "Delivered") delivery.CompletedAt = DateTime.UtcNow;
        var order = await db.Orders.FirstAsync(x => x.Id == delivery.OrderId);
        if (canonical == "OutForDelivery") order.Status = "Out for Delivery";
        if (canonical == "Delivered") order.Status = "Delivered";
        if (canonical == "Failed") order.Status = "Delivery Failed";
        if (canonical is "Delivered" or "Failed" or "Cancelled")
        {
            var partner = await db.DeliveryPartners.FirstAsync(x => x.Id == partnerId);
            partner.IsAvailable = true;
        }
        db.DeliveryStatusHistory.Add(new DeliveryStatusHistory { DeliveryId = delivery.Id, Status = canonical, ChangedByUserId = userId });
        if (order.Status is "Out for Delivery" or "Delivered" or "Delivery Failed")
            db.OrderStatusHistory.Add(new OrderStatusHistory { OrderId = order.Id, Status = order.Status, ChangedByUserId = userId });
        await db.SaveChangesAsync();
        if (canonical == "Delivered") await settlements.CreateForDeliveredOrder(order.Id);
        await transaction.CommitAsync();
        return Ok(new { delivery.Id, DeliveryStatus = delivery.Status, order.OrderNumber, OrderStatus = order.Status });
    }
}
