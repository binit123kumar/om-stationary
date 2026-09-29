using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
namespace OMStationary.Api.Controllers;
[ApiController]
[Route("api/connectors")]
public class ConnectorsController:ControllerBase
{
    private readonly OmDbContext _db;
    public ConnectorsController(OmDbContext db)=>_db=db;
    [HttpGet]
    public async Task<IActionResult> Get()=>Ok(await _db.PlatformConnectors.AsNoTracking().OrderBy(x=>x.Name).ToListAsync());
    [HttpPost("seed")]
    public async Task<IActionResult> Seed(){
        if(await _db.PlatformConnectors.AnyAsync()) return Ok(await _db.PlatformConnectors.ToListAsync());
        var list=new[]{
            new OMStationary.Api.Models.PlatformConnector{Name="Local Partner Shops",Type="Order+Catalog",Enabled=true,OrderApiAvailable=true,Status="Ready"},
            new OMStationary.Api.Models.PlatformConnector{Name="Amazon",Type="Authorized Catalog/Partner",Enabled=false,OrderApiAvailable=false,Status="Needs official credentials/authorization"},
            new OMStationary.Api.Models.PlatformConnector{Name="Flipkart",Type="Authorized Partner",Enabled=false,OrderApiAvailable=false,Status="Needs official credentials/authorization"},
            new OMStationary.Api.Models.PlatformConnector{Name="Blinkit",Type="Seller/Partner",Enabled=false,OrderApiAvailable=false,Status="Needs official credentials/authorization"},
            new OMStationary.Api.Models.PlatformConnector{Name="JioMart / Reliance",Type="Partner",Enabled=false,OrderApiAvailable=false,Status="Needs official credentials/authorization"},
            new OMStationary.Api.Models.PlatformConnector{Name="Zepto",Type="Partner",Enabled=false,OrderApiAvailable=false,Status="Needs official credentials/authorization"}
        };_db.PlatformConnectors.AddRange(list);await _db.SaveChangesAsync();return Ok(list);
    }
}
