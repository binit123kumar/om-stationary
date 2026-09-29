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
    public async Task<IActionResult> Get([FromQuery]string? q=null,[FromQuery]string? category=null,[FromQuery]string? sort=null,
        [FromQuery]string? brand=null,[FromQuery]string? sku=null,[FromQuery]decimal? minPrice=null,[FromQuery]decimal? maxPrice=null,
        [FromQuery]bool? available=null,[FromQuery]int page=1,[FromQuery]int pageSize=24,[FromQuery]bool paginated=false)
    {
        var query=_db.Products.AsNoTracking().Where(x=>x.IsActive);
        if(!string.IsNullOrWhiteSpace(q)) query=query.Where(x=>x.Name.Contains(q)||x.Category.Contains(q)||x.Brand.Contains(q)||x.Sku.Contains(q)||x.Description.Contains(q));
        if(!string.IsNullOrWhiteSpace(category)) query=query.Where(x=>x.Category==category);
        if(!string.IsNullOrWhiteSpace(brand)) query=query.Where(x=>x.Brand==brand);
        if(!string.IsNullOrWhiteSpace(sku)) query=query.Where(x=>x.Sku==sku);
        if(minPrice.HasValue) query=query.Where(x=>x.Price>=minPrice.Value);
        if(maxPrice.HasValue) query=query.Where(x=>x.Price<=maxPrice.Value);
        if(available == true) query=query.Where(x=>_db.ShopProducts.Any(sp=>sp.ProductId==x.Id&&sp.IsAvailable&&sp.Stock>0&&_db.PartnerShops.Any(shop=>shop.Id==sp.PartnerShopId&&shop.IsApproved&&shop.IsActive)));
        query=sort?.ToLowerInvariant() switch { "price-asc"=>query.OrderBy(x=>x.Price), "price-desc"=>query.OrderByDescending(x=>x.Price), _=>query.OrderBy(x=>x.Name) };
        if(page<1||pageSize<1||pageSize>100)return BadRequest("Page must be positive and page size must be between 1 and 100.");
        if(!paginated&&q is null&&category is null&&brand is null&&sku is null&&minPrice is null&&maxPrice is null&&available is null&&page==1&&pageSize==24)
            return Ok(await query.Take(100).ToListAsync()); // Backward-compatible response for the existing home/catalog loader.
        var total=await query.CountAsync();
        return Ok(new { items=await query.Skip((page-1)*pageSize).Take(pageSize).ToListAsync(), total, page, pageSize });
    }
    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id){var product=await _db.Products.AsNoTracking().FirstOrDefaultAsync(x=>x.Id==id&&x.IsActive);return product is null?NotFound():Ok(product);}
}
