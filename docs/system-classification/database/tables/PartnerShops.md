# Table: PartnerShops

- **Entity:** `PartnerShop` declared in [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs).
- **DbSet/table convention:** `OmDbContext.PartnerShops` (`DbSet<PartnerShop>`). No explicit `ToTable` mapping was found for this entity; the name is the EF Core DbSet convention, not proof of a live SQL table.
- **Declared scalar columns:** 13. CLR declarations and explicit property configuration are documented from source; provider-generated SQL types and the live database are **NOT VERIFIED**.
- **Scope:** Navigation properties and collection-valued properties are omitted from this scalar column list; inspect [relationships](../relationships.md). Static status/type constants are not entity columns.

| Column/property | CLR type | CLR nullability | Source mapping notes |
|---|---|---|---|
| `Id` | `int` | Non-nullable CLR type | Conventional primary-key property (verify EF model convention). |
| `Name` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `OwnerName` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Address` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Phone` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Pincode` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Latitude` | `double` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Longitude` | `double` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `IsApproved` | `bool` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `IsActive` | `bool` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `SupportsDelivery` | `bool` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `EstimatedDeliveryMinutes` | `int` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `UserId` | `Guid?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |

**Source:** [`OmDbContext.cs`](../../../../backend/OMStationary.Api/Data/OmDbContext.cs), [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs). EF inferred conventions (including key and SQL-provider type conventions) are not asserted as an observed live schema.
