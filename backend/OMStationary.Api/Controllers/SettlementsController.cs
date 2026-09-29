using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;

namespace OMStationary.Api.Controllers;

[ApiController, Authorize(Roles = "Admin"), Route("api/settlements")]
public sealed class SettlementsController(OmDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await db.Settlements.AsNoTracking().OrderByDescending(x => x.CreatedAt)
        .Select(x => new { x.Id, x.OrderId, OrderNumber = db.Orders.Where(o => o.Id == x.OrderId).Select(o => o.OrderNumber).FirstOrDefault(),
            PartnerShopId = x.PartnerShopId, PartnerShopName = db.PartnerShops.Where(p => p.Id == x.PartnerShopId).Select(p => p.Name).FirstOrDefault(),
            x.PartnerAmount, x.CommissionAmount, x.DeliveryAmount, x.Status, x.CreatedAt }).ToListAsync());
}
