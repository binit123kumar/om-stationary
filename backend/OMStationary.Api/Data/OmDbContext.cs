using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Models;
namespace OMStationary.Api.Data;
public class OmDbContext : DbContext
{
    public OmDbContext(DbContextOptions<OmDbContext> options):base(options) { }
    public DbSet<Product> Products => Set<Product>();
    public DbSet<PartnerShop> PartnerShops => Set<PartnerShop>();
    public DbSet<ShopProduct> ShopProducts => Set<ShopProduct>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Delivery> Deliveries => Set<Delivery>();
    public DbSet<PlatformConnector> PlatformConnectors => Set<PlatformConnector>();
}
