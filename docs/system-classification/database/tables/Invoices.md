# Table: Invoices

- **Entity:** `Invoice` declared in [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs).
- **DbSet/table convention:** `OmDbContext.Invoices` (`DbSet<Invoice>`). No explicit `ToTable` mapping was found for this entity; the name is the EF Core DbSet convention, not proof of a live SQL table.
- **Declared scalar columns:** 22. CLR declarations and explicit property configuration are documented from source; provider-generated SQL types and the live database are **NOT VERIFIED**.
- **Scope:** Navigation properties and collection-valued properties are omitted from this scalar column list; inspect [relationships](../relationships.md). Static status/type constants are not entity columns.

| Column/property | CLR type | CLR nullability | Source mapping notes |
|---|---|---|---|
| `Id` | `int` | Non-nullable CLR type | Conventional primary-key property (verify EF model convention). |
| `InvoiceNumber` | `string` | Non-nullable CLR type | .HasMaxLength(40).IsRequired(); |
| `OrderId` | `int` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `OrderNumber` | `string` | Non-nullable CLR type | .HasMaxLength(64).IsRequired(); |
| `CustomerId` | `Guid?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `InvoiceDate` | `DateTime` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `Subtotal` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `Discount` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `DeliveryCharge` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `TaxAmount` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `GrandTotal` | `decimal` | Non-nullable CLR type | .HasPrecision(18, 2); |
| `PaymentMethod` | `string` | Non-nullable CLR type | .HasMaxLength(20).IsRequired(); |
| `PaymentStatus` | `string` | Non-nullable CLR type | .HasMaxLength(20).IsRequired(); |
| `FulfillmentMethod` | `string` | Non-nullable CLR type | .HasMaxLength(20).IsRequired(); |
| `BillingAddress` | `string` | Non-nullable CLR type | .HasMaxLength(600).IsRequired(); |
| `ShippingAddress` | `string` | Non-nullable CLR type | .HasMaxLength(600).IsRequired(); |
| `CustomerName` | `string` | Non-nullable CLR type | .HasMaxLength(120).IsRequired(); |
| `CustomerPhone` | `string` | Non-nullable CLR type | .HasMaxLength(20).IsRequired(); |
| `CustomerEmail` | `string` | Non-nullable CLR type | .HasMaxLength(254).IsRequired(); |
| `DocumentReference` | `string` | Non-nullable CLR type | .HasMaxLength(160).IsRequired(); |
| `PdfGenerationCount` | `int` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `CreatedAt` | `DateTime` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |

**Source:** [`OmDbContext.cs`](../../../../backend/OMStationary.Api/Data/OmDbContext.cs), [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs). EF inferred conventions (including key and SQL-provider type conventions) are not asserted as an observed live schema.
