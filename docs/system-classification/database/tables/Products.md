# Table: Products

- **Entity:** `Product` declared in [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs).
- **DbSet/table convention:** `OmDbContext.Products` (`DbSet<Product>`). No explicit `ToTable` mapping was found for this entity; the name is the EF Core DbSet convention, not proof of a live SQL table.
- **Declared scalar columns:** 19. CLR declarations and explicit property configuration are documented from source; provider-generated SQL types and the live database are **NOT VERIFIED**.
- **Scope:** Navigation properties and collection-valued properties are omitted from this scalar column list; inspect [relationships](../relationships.md). Static status/type constants are not entity columns.

| Column/property | CLR type | CLR nullability | Source mapping notes |
|---|---|---|---|
| `Id` | `int` | Non-nullable CLR type | Conventional primary-key property (verify EF model convention). |
| `Name` | `string` | Non-nullable CLR type | .HasMaxLength(200).IsRequired(); |
| `Slug` | `string` | Non-nullable CLR type | .HasMaxLength(160); |
| `Category` | `string` | Non-nullable CLR type | .HasMaxLength(80); |
| `Price` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `MRP` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `ImageUrl` | `string` | Non-nullable CLR type | .HasMaxLength(600); |
| `Description` | `string` | Non-nullable CLR type | .HasMaxLength(4000); |
| `ShortDescription` | `string` | Non-nullable CLR type | .HasMaxLength(300); |
| `Sku` | `string` | Non-nullable CLR type | .HasMaxLength(80); |
| `Brand` | `string` | Non-nullable CLR type | .HasMaxLength(80); |
| `Unit` | `string` | Non-nullable CLR type | .HasMaxLength(24); |
| `Discount` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `Stock` | `int` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `LowStockThreshold` | `int` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `CategoryId` | `int?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `IsActive` | `bool` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `CreatedAt` | `DateTime` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `UpdatedAt` | `DateTime` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |

**Source:** [`OmDbContext.cs`](../../../../backend/OMStationary.Api/Data/OmDbContext.cs), [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs). EF inferred conventions (including key and SQL-provider type conventions) are not asserted as an observed live schema.
