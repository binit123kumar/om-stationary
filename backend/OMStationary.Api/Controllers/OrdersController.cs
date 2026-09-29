using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;
namespace OMStationary.Api.Controllers;
[ApiController]
[Route("api/orders")]
public class OrdersController:ControllerBase
{
    private readonly OmDbContext _db;
    public OrdersController(OmDbContext db)=>_db=db;
    [HttpGet]
    public async Task<IActionResult> Get()=>Ok(await _db.Orders.Include(x=>x.Items).OrderByDescending(x=>x.CreatedAt).ToListAsync());
    [HttpGet("{orderNumber}")]
    public async Task<IActionResult> Get(string orderNumber){var o=await _db.Orders.Include(x=>x.Items).FirstOrDefaultAsync(x=>x.OrderNumber==orderNumber); return o is null?NotFound():Ok(o);}
    [HttpPost]
    public async Task<IActionResult> Create(Order order)
    {
        order.OrderNumber="OM"+DateTime.UtcNow.ToString("yyyyMMddHHmmssfff");
        order.CreatedAt=DateTime.UtcNow;
        order.TotalAmount=order.Subtotal+order.DeliveryCharge;
        order.Status="Placed";
        _db.Orders.Add(order);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get),new{orderNumber=order.OrderNumber},order);
    }
    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> Status(int id,[FromBody] string status){var o=await _db.Orders.FindAsync(id);if(o is null)return NotFound();o.Status=status;await _db.SaveChangesAsync();return Ok(o);}
}
