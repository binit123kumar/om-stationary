# Table: Orders

- **Entity:** `Order` declared in [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs).
- **DbSet/table convention:** `OmDbContext.Orders` (`DbSet<Order>`). No explicit `ToTable` mapping was found for this entity; the name is the EF Core DbSet convention, not proof of a live SQL table.
- **Declared scalar columns:** 26. CLR declarations and explicit property configuration are documented from source; provider-generated SQL types and the live database are **NOT VERIFIED**.
- **Scope:** Navigation properties and collection-valued properties are omitted from this scalar column list; inspect [relationships](../relationships.md). Static status/type constants are not entity columns.

| Column/property | CLR type | CLR nullability | Source mapping notes |
|---|---|---|---|
| `Id` | `int` | Non-nullable CLR type | Conventional primary-key property (verify EF model convention). |
| `OrderNumber` | `string` | Non-nullable CLR type | .HasMaxLength(64).IsRequired(); |
| `CustomerName` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `CustomerPhone` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `CustomerEmail` | `string` | Non-nullable CLR type | .HasMaxLength(254).IsRequired(); |
| `BillingAddress` | `string` | Non-nullable CLR type | .HasMaxLength(600).IsRequired(); |
| `DeliveryAddress` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `City` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Pincode` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `RequestedDeliveryDate` | `DateTime?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Subtotal` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `DeliveryCharge` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `DiscountAmount` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `TaxAmount` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `CouponCode` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `TotalAmount` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `PaymentMethod` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `PaymentStatus` | `string` | Non-nullable CLR type | .HasMaxLength(32).IsRequired(); |
| `Status` | `string` | Non-nullable CLR type | .HasMaxLength(32).IsRequired(); |
| `SourceType` | `string` | Non-nullable CLR type | .HasMaxLength(32).IsRequired(); |
| `SourceReference` | `string` | Non-nullable CLR type | .HasMaxLength(120); |
| `CustomerUserId` | `Guid?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `PartnerShopId` | `int?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `TrackingTokenHash` | `string?` | Nullable CLR type | .HasMaxLength(64); |
| `DeliveryInstructions` | `string` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `CreatedAt` | `DateTime` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |

**Source:** [`OmDbContext.cs`](../../../../backend/OMStationary.Api/Data/OmDbContext.cs), [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs). EF inferred conventions (including key and SQL-provider type conventions) are not asserted as an observed live schema.
