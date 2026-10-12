# Database and migration reference

These reports document the declared EF Core model, source migration operations, and configuration lookup. They do not establish a live database schema or migration state.

## Navigation

- [Declared entity tables and columns](#declared-entity-tables) — 30 per-entity reports.
- [Relationships, explicit indexes, and mapping caveats](relationships.md).
- [Migration history](#migration-history) — five migration operation summaries and the model snapshot.
- [Database connection configuration](connection-configuration.md) — safe summary; secret values are not reproduced.
- [EF Core model snapshot](model-snapshot.md) — generated migration-comparison metadata, not live schema evidence.
- [EF context, factory, bootstrap, and model references](../../codebase-reference/backend/_index.md#data-access).

## Declared entity tables

Reports use the entity's `DbSet` property name as the EF Core table-name convention where no explicit `ToTable` mapping appears in `OmDbContext`. Each table report enumerates all declared scalar CLR properties, their declared CLR types/nullability, and explicit property configuration found in the context. The reports do **not** claim provider SQL types or live table existence.

This section covers the 30 current `DbSet`-backed entities. Static constant/helper types are not tables. Historical migration-only objects (for example `PlatformConnectors`) and SQL Server's `__EFMigrationsHistory` are described only where relevant in migration/bootstrap reports, not represented as current model entities.

| DbSet / convention table | Entity | Report |
|---|---|---|
| `Products` | `Product` | [Products](tables/Products.md) |
| `PartnerShops` | `PartnerShop` | [PartnerShops](tables/PartnerShops.md) |
| `ShopProducts` | `ShopProduct` | [ShopProducts](tables/ShopProducts.md) |
| `Orders` | `Order` | [Orders](tables/Orders.md) |
| `OrderItems` | `OrderItem` | [OrderItems](tables/OrderItems.md) |
| `Deliveries` | `Delivery` | [Deliveries](tables/Deliveries.md) |
| `Users` | `ApplicationUser` | [Users](tables/Users.md) |
| `Roles` | `AppRole` | [Roles](tables/Roles.md) |
| `CustomerProfiles` | `CustomerProfile` | [CustomerProfiles](tables/CustomerProfiles.md) |
| `Addresses` | `Address` | [Addresses](tables/Addresses.md) |
| `RefreshTokens` | `RefreshToken` | [RefreshTokens](tables/RefreshTokens.md) |
| `Carts` | `Cart` | [Carts](tables/Carts.md) |
| `CartItems` | `CartItem` | [CartItems](tables/CartItems.md) |
| `Categories` | `Category` | [Categories](tables/Categories.md) |
| `ProductImages` | `ProductImage` | [ProductImages](tables/ProductImages.md) |
| `OrderStatusHistory` | `OrderStatusHistory` | [OrderStatusHistory](tables/OrderStatusHistory.md) |
| `Payments` | `Payment` | [Payments](tables/Payments.md) |
| `Invoices` | `Invoice` | [Invoices](tables/Invoices.md) |
| `InvoiceLines` | `InvoiceLine` | [InvoiceLines](tables/InvoiceLines.md) |
| `Refunds` | `Refund` | [Refunds](tables/Refunds.md) |
| `DeliveryPartners` | `DeliveryPartner` | [DeliveryPartners](tables/DeliveryPartners.md) |
| `DeliveryStatusHistory` | `DeliveryStatusHistory` | [DeliveryStatusHistory](tables/DeliveryStatusHistory.md) |
| `Coupons` | `Coupon` | [Coupons](tables/Coupons.md) |
| `Notifications` | `Notification` | [Notifications](tables/Notifications.md) |
| `AuditLogs` | `AuditLog` | [AuditLogs](tables/AuditLogs.md) |
| `Settlements` | `Settlement` | [Settlements](tables/Settlements.md) |
| `Wishlists` | `Wishlist` | [Wishlists](tables/Wishlists.md) |
| `WishlistItems` | `WishlistItem` | [WishlistItems](tables/WishlistItems.md) |
| `StoreSettings` | `StoreSetting` | [StoreSettings](tables/StoreSettings.md) |
| `WhatsAppNotifications` | `WhatsAppNotification` | [WhatsAppNotifications](tables/WhatsAppNotifications.md) |

## Migration history

| Source migration | Report |
|---|---|
| `20260929022303_InitialMvpSchema` | [Initial MVP schema](migrations/20260929022303_InitialMvpSchema.md) |
| `20260929030714_MvpFoundation` | [MVP foundation](migrations/20260929030714_MvpFoundation.md) |
| `20260930065632_OmStationaryDirectCommerce` | [Direct commerce](migrations/20260930065632_OmStationaryDirectCommerce.md) |
| `20261003093401_AdminStoreSettingsAndAuditValues` | [Admin store settings and audit values](migrations/20261003093401_AdminStoreSettingsAndAuditValues.md) |
| `20261003110615_WhatsAppNotifications` | [WhatsApp notifications](migrations/20261003110615_WhatsAppNotifications.md) |

The [model snapshot report](model-snapshot.md) is generated EF metadata, not a live database inspection. Migration history here is source-declared only.
