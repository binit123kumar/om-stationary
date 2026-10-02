using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;

namespace OMStationary.Api.Controllers;

[ApiController, Route("api/categories")]
public sealed class CategoriesController(OmDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await db.Products.AsNoTracking().Where(x => x.IsActive)
        .Select(x => x.Category).Distinct().OrderBy(x => x).ToListAsync());
}

