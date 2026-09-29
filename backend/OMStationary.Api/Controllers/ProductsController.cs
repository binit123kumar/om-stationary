using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
namespace OMStationary.Api.Controllers;
[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly OmDbContext _db;
    public ProductsController(OmDbContext db)=>_db=db;
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery]string? q=null,[FromQuery]string? category=null)
    {
        var query=_db.Products.AsNoTracking().Where(x=>x.IsActive);
        if(!string.IsNullOrWhiteSpace(q)) query=query.Where(x=>x.Name.Contains(q)||x.Category.Contains(q));
        if(!string.IsNullOrWhiteSpace(category)) query=query.Where(x=>x.Category==category);
        return Ok(await query.OrderBy(x=>x.Name).ToListAsync());
    }
    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)=>Ok(await _db.Products.FindAsync(id));
}
