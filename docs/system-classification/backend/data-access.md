# Backend data-access and migration bootstrap types

Static source report for the EF context and startup/design-time database helpers. None of these declarations demonstrate that a database is reachable or has the described schema.

## `OmDbContext`

Source: [`OmDbContext.cs`](../../../backend/OMStationary.Api/Data/OmDbContext.cs).

- Declares 30 `DbSet<TEntity>` properties; their entity/table convention names and all 273 scalar CLR properties are indexed in [table reports](../database/_index.md#declared-entity-tables).
- `OnModelCreating` declares unique/filtered/composite indexes, explicit property lengths/precision, and relationships/delete behaviors listed in [relationship notes](../database/relationships.md).
- No `ToTable` calls were found in the context. Table report names follow the corresponding `DbSet` names by convention; actual provider/runtime mappings are **NOT VERIFIED**.

## `OmDbContextFactory`

Source: [`OmDbContextFactory.cs`](../../../backend/OMStationary.Api/Data/OmDbContextFactory.cs).

- Implements `IDesignTimeDbContextFactory<OmDbContext>` for EF tooling and builds SQL Server options.
- Reads `ConnectionStrings__DefaultConnection` first, then appsettings JSON files (including `appsettings.Local.json`), then a local SQL Server fallback.
- The local design-time lookup/fallback is not itself evidence of runtime configuration. See [redacted connection configuration](../database/connection-configuration.md).

## `SafeMigrationBootstrap`

Source: [`SafeMigrationBootstrap.cs`](../../../backend/OMStationary.Api/Data/SafeMigrationBootstrap.cs).

- `ApplyAsync` first checks connectivity. If connected, it inspects SQL Server migration history and legacy-table/column shape.
- When legacy tables exist without the known baseline, it refuses to infer a baseline if other migration history exists or if the schema-shape check fails. On a matching shape, it transactionally creates/baselines `__EFMigrationsHistory`; it then calls `Database.MigrateAsync`.
- When no legacy tables are found, it proceeds to `MigrateAsync`. The method contains database reads and conditional writes/migration operations; it is not run as part of this documentation task.
- `Program.cs` invokes `SafeMigrationBootstrap.ApplyAsync` during startup. Whether that startup branch completed, and any resulting migration/schema state, is **NOT VERIFIED**; no database was queried.
