# Table: Notifications

- **Entity:** `Notification` declared in [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs).
- **DbSet/table convention:** `OmDbContext.Notifications` (`DbSet<Notification>`). No explicit `ToTable` mapping was found for this entity; the name is the EF Core DbSet convention, not proof of a live SQL table.
- **Declared scalar columns:** 11. CLR declarations and explicit property configuration are documented from source; provider-generated SQL types and the live database are **NOT VERIFIED**.
- **Scope:** Navigation properties and collection-valued properties are omitted from this scalar column list; inspect [relationships](../relationships.md). Static status/type constants are not entity columns.

| Column/property | CLR type | CLR nullability | Source mapping notes |
|---|---|---|---|
| `Id` | `int` | Non-nullable CLR type | Conventional primary-key property (verify EF model convention). |
| `UserId` | `Guid?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `OrderId` | `int?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Channel` | `string` | Non-nullable CLR type | .HasMaxLength(24).IsRequired(); |
| `Event` | `string` | Non-nullable CLR type | .HasMaxLength(120).IsRequired(); |
| `Title` | `string` | Non-nullable CLR type | .HasMaxLength(160); |
| `Message` | `string` | Non-nullable CLR type | .HasMaxLength(600); |
| `IsRead` | `bool` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Status` | `string` | Non-nullable CLR type | .HasMaxLength(24).IsRequired(); |
| `CreatedAt` | `DateTime` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `SentAt` | `DateTime?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |

**Source:** [`OmDbContext.cs`](../../../../backend/OMStationary.Api/Data/OmDbContext.cs), [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs). EF inferred conventions (including key and SQL-provider type conventions) are not asserted as an observed live schema.
