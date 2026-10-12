# Database connection configuration (redacted)

## Source behavior

- `Program.cs` configures `OmDbContext` with SQL Server using `builder.Configuration.GetConnectionString("DefaultConnection")`.
- The checked-in `appsettings.json` declares `ConnectionStrings:DefaultConnection` for a local SQL Server database named `OMStationaryDb`, using integrated/trusted authentication. This value is a development-style local default, not evidence of the deployment connection.
- `OmDbContextFactory` used by EF design-time tooling first checks environment variable `ConnectionStrings__DefaultConnection`, then reads `appsettings.json`, `appsettings.Development.json`, and `appsettings.Local.json`; if no setting is found it falls back to a local SQL Server connection. Runtime `Program.cs` and the design-time factory therefore have distinct configuration code paths.
- Standard .NET configuration sources may override JSON values. Actual deployed environment variables, user secrets, secret stores, and runtime connection settings were not inspected.

## Safe handling

Connection-string values, passwords, tokens, signing keys, API credentials, payment details, phone numbers, and other secret/configured personal values are not reproduced here. Keys and precedence only are documented. Treat any real deployment credentials as secrets and supply them through protected configuration, not source-controlled files.

## Runtime status

No database connection was attempted. SQL Server availability, effective connection string, credentials, active database, migration state, and live schema are **NOT VERIFIED**.

**Sources:** `backend/OMStationary.Api/Program.cs`, `Data/OmDbContextFactory.cs`, `appsettings.json`, `appsettings.Development.json`.

