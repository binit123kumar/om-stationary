# Table: WhatsAppNotifications

- **Entity:** `WhatsAppNotification` declared in [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs).
- **DbSet/table convention:** `OmDbContext.WhatsAppNotifications` (`DbSet<WhatsAppNotification>`). No explicit `ToTable` mapping was found for this entity; the name is the EF Core DbSet convention, not proof of a live SQL table.
- **Declared scalar columns:** 12. CLR declarations and explicit property configuration are documented from source; provider-generated SQL types and the live database are **NOT VERIFIED**.
- **Scope:** Navigation properties and collection-valued properties are omitted from this scalar column list; inspect [relationships](../relationships.md). Static status/type constants are not entity columns.

| Column/property | CLR type | CLR nullability | Source mapping notes |
|---|---|---|---|
| `Id` | `int` | Non-nullable CLR type | Conventional primary-key property (verify EF model convention). |
| `OrderId` | `int?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `NotificationType` | `string` | Non-nullable CLR type | .HasMaxLength(40).IsRequired(); |
| `Recipient` | `string` | Non-nullable CLR type | .HasMaxLength(24).IsRequired(); |
| `Message` | `string` | Non-nullable CLR type | .HasMaxLength(4000); |
| `ProviderMessageId` | `string?` | Nullable CLR type | .HasMaxLength(200); |
| `Status` | `string` | Non-nullable CLR type | .HasMaxLength(24).IsRequired(); |
| `ErrorMessage` | `string?` | Nullable CLR type | .HasMaxLength(600); |
| `Attempts` | `int` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `CreatedAt` | `DateTime` | Non-nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `SentAt` | `DateTime?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |
| `DeliveredAt` | `DateTime?` | Nullable CLR type | No explicit property configuration found in OmDbContext; provider/model conventions apply. |

**Source:** [`OmDbContext.cs`](../../../../backend/OMStationary.Api/Data/OmDbContext.cs), [`Models.cs`](../../../../backend/OMStationary.Api/Models/Models.cs). EF inferred conventions (including key and SQL-provider type conventions) are not asserted as an observed live schema.
