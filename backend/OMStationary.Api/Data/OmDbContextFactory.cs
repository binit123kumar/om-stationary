using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace OMStationary.Api.Data;

// Design-time factory used by `dotnet ef`. It must resolve the SAME connection string the API
// uses at runtime, so it reads appsettings.json instead of relying on a hard-coded server name.
public sealed class OmDbContextFactory : IDesignTimeDbContextFactory<OmDbContext>
{
    private const string Fallback = "Server=localhost;Database=OMStationaryDb;Trusted_Connection=True;TrustServerCertificate=True;";

    public OmDbContext CreateDbContext(string[] args)
    {
        var fromEnvironment = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
        if (!string.IsNullOrWhiteSpace(fromEnvironment)) return Build(fromEnvironment);

        var contentRoot = ResolveContentRoot();
        var settings = new Microsoft.Extensions.Configuration.ConfigurationBuilder()
            .SetBasePath(contentRoot)
            .AddJsonFile("appsettings.json", optional: true)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .AddJsonFile("appsettings.Local.json", optional: true)
            .Build();

        var configured = settings.GetConnectionString("DefaultConnection");
        return Build(string.IsNullOrWhiteSpace(configured) ? Fallback : configured);
    }

    private static OmDbContext Build(string connectionString)
    {
        var options = new DbContextOptionsBuilder<OmDbContext>().UseSqlServer(connectionString).Options;
        return new OmDbContext(options);
    }

    private static string ResolveContentRoot()
    {
        var directory = new DirectoryInfo(Directory.GetCurrentDirectory());
        while (directory is not null)
        {
            if (File.Exists(Path.Combine(directory.FullName, "OMStationary.Api.csproj"))) return directory.FullName;
            directory = directory.Parent;
        }
        return Directory.GetCurrentDirectory();
    }
}

