# Table: StoreSettings

- **Entity:** `StoreSetting` declared in [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs).
- **DbSet/table convention:** `OmDbContext.StoreSettings` (`DbSet<StoreSetting>`). No explicit `ToTable` mapping was found for this entity; the name is the EF Core DbSet convention, not proof of a live SQL table.
- **Declared scalar columns:** 21. CLR declarations and explicit property configuration are documented from source; provider-generated SQL types and the live database are **NOT VERIFIED**.
- **Scope:** Navigation properties and collection-valued properties are omitted from this scalar column list; inspect [relationships](../relationships.md). Static status/type constants are not entity columns.

| Column/property | CLR type | CLR nullability | Source mapping notes |
|---|---|---|---|
| `Id` | `int` | Non-nullable CLR type | Conventional primary-key property (verify EF model convention). |
| `StoreName` | `string?` | Nullable CLR type | .HasMaxLength(200); |
| `StoreAddress` | `string?` | Nullable CLR type | .HasMaxLength(600); |
| `StorePhone` | `string?` | Nullable CLR type | .HasMaxLength(40); |
| `StoreEmail` | `string?` | Nullable CLR type | .HasMaxLength(254); |
| `StoreHours` | `string?` | Nullable CLR type | .HasMaxLength(200); |
| `TaxRatePercent` | `decimal?` | Nullable CLR type | .HasPrecision(18, 2); |
| `TaxRegistration` | `string?` | Nullable CLR type | .HasMaxLength(80); |
| `UdyamRegistration` | `string?` | Nullable CLR type | .HasMaxLength(80); |
| `InvoicePrefix` | `string?` | Nullable CLR type | .HasMaxLength(24); |
| `PickupAddress` | `string?` | Nullable CLR type | .HasMaxLength(600); |
| `PickupHours` | `string?` | Nullable CLR type | .HasMaxLength(200); |
| `PickupAvailable` | `bool?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `DeliveryEnabled` | `bool?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `DeliveryCities` | `string?` | Nullable CLR type | .HasMaxLength(1000); |
| `DeliveryCharge` | `decimal?` | Nullable CLR type | .HasPrecision(18, 2); |
| `DeliveryMaxRadiusKm` | `double?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `PaymentProvider` | `string?` | Nullable CLR type | .HasMaxLength(40); |
| `PaymentEnabled` | `bool?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `UpdatedByUserId` | `Guid?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `UpdatedAt` | `DateTime` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |

**Source:** [`OmDbContext.cs`](../../../../backend/OMStationary.Api/Data/OmDbContext.cs), [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs). EF inferred conventions (including key and SQL-provider type conventions) are not asserted as an observed live schema.
