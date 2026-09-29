using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace OMStationary.Api.Data;

public sealed class OmDbContextFactory : IDesignTimeDbContextFactory<OmDbContext>
{
    public OmDbContext CreateDbContext(string[] args)
    {
        var connection = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection") ??
            "Server=localhost;Database=OMStationaryDb;Trusted_Connection=True;TrustServerCertificate=True;";
        var options = new DbContextOptionsBuilder<OmDbContext>().UseSqlServer(connection).Options;
        return new OmDbContext(options);
    }
}
