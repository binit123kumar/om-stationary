# Table: WishlistItems

- **Entity:** `WishlistItem` declared in [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs).
- **DbSet/table convention:** `OmDbContext.WishlistItems` (`DbSet<WishlistItem>`). No explicit `ToTable` mapping was found for this entity; the name is the EF Core DbSet convention, not proof of a live SQL table.
- **Declared scalar columns:** 4. CLR declarations and explicit property configuration are documented from source; provider-generated SQL types and the live database are **NOT VERIFIED**.
- **Scope:** Navigation properties and collection-valued properties are omitted from this scalar column list; inspect [relationships](../relationships.md). Static status/type constants are not entity columns.

| Column/property | CLR type | CLR nullability | Source mapping notes |
|---|---|---|---|
| `Id` | `int` | Non-nullable CLR type | Conventional primary-key property (verify EF model convention). |
| `WishlistId` | `int` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `ProductId` | `int` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `AddedAt` | `DateTime` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |

**Source:** [`OmDbContext.cs`](../../../../backend/OMStationary.Api/Data/OmDbContext.cs), [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs). EF inferred conventions (including key and SQL-provider type conventions) are not asserted as an observed live schema.
