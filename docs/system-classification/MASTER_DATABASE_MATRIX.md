# Master database matrix

This matrix describes the EF Core model and migration source. It is not a live SQL Server inspection. The table names below are the `DbSet<T>` names used by EF conventions where no explicit table mapping was found; each entity report enumerates its scalar properties and explicit configuration. See the complete [database inventory](database/_index.md), [relationships and indexes](database/relationships.md), [migration history](database/_index.md#migration-history), and [connection configuration](database/connection-configuration.md).

## Declared entity/table mappings

| DbSet / convention table | Entity type | Report |
|---|---|---|
| `Products` | `Product` | [Columns](database/tables/Products.md) |
| `PartnerShops` | `PartnerShop` | [Columns](database/tables/PartnerShops.md) |
| `ShopProducts` | `ShopProduct` | [Columns](database/tables/ShopProducts.md) |
| `Orders` | `Order` | [Columns](database/tables/Orders.md) |
| `OrderItems` | `OrderItem` | [Columns](database/tables/OrderItems.md) |
| `Deliveries` | `Delivery` | [Columns](database/tables/Deliveries.md) |
| `Users` | `ApplicationUser` | [Columns](database/tables/Users.md) |
| `Roles` | `AppRole` | [Columns](database/tables/Roles.md) |
| `CustomerProfiles` | `CustomerProfile` | [Columns](database/tables/CustomerProfiles.md) |
| `Addresses` | `Address` | [Columns](database/tables/Addresses.md) |
| `RefreshTokens` | `RefreshToken` | [Columns](database/tables/RefreshTokens.md) |
| `Carts` | `Cart` | [Columns](database/tables/Carts.md) |
| `CartItems` | `CartItem` | [Columns](database/tables/CartItems.md) |
| `Categories` | `Category` | [Columns](database/tables/Categories.md) |
| `ProductImages` | `ProductImage` | [Columns](database/tables/ProductImages.md) |
| `OrderStatusHistory` | `OrderStatusHistory` | [Columns](database/tables/OrderStatusHistory.md) |
| `Payments` | `Payment` | [Columns](database/tables/Payments.md) |
| `Invoices` | `Invoice` | [Columns](database/tables/Invoices.md) |
| `InvoiceLines` | `InvoiceLine` | [Columns](database/tables/InvoiceLines.md) |
| `Refunds` | `Refund` | [Columns](database/tables/Refunds.md) |
| `DeliveryPartners` | `DeliveryPartner` | [Columns](database/tables/DeliveryPartners.md) |
| `DeliveryStatusHistory` | `DeliveryStatusHistory` | [Columns](database/tables/DeliveryStatusHistory.md) |
| `Coupons` | `Coupon` | [Columns](database/tables/Coupons.md) |
| `Notifications` | `Notification` | [Columns](database/tables/Notifications.md) |
| `AuditLogs` | `AuditLog` | [Columns](database/tables/AuditLogs.md) |
| `Settlements` | `Settlement` | [Columns](database/tables/Settlements.md) |
| `Wishlists` | `Wishlist` | [Columns](database/tables/Wishlists.md) |
| `WishlistItems` | `WishlistItem` | [Columns](database/tables/WishlistItems.md) |
| `StoreSettings` | `StoreSetting` | [Columns](database/tables/StoreSettings.md) |
| `WhatsAppNotifications` | `WhatsAppNotification` | [Columns](database/tables/WhatsAppNotifications.md) |

## Declared model totals and evidence

| Item | Source count |
|---|---:|
| DbSet-backed entity/table declarations | 30 |
| Scalar CLR properties across those entities | 273 |
| Hand-authored migration classes | 5 |
| Generated migration designers | 5 |
| Model snapshot | 1 |

## Mapping cautions

- Entity/table names above are source-declared. The live database, applied migrations and actual provider column types were not inspected.
- `Product.Category` is a legacy string while `Product.CategoryId` is a nullable relationship to `Category`; these fields must not be conflated.
- Fields that look like foreign keys are not presented as relationships unless the context declares the mapping.
- Static notification type/status constant classes are not database entities. Historical migration-only objects and SQL Server's migration-history table are not current `DbSet` entities.
- Feature-to-entity mappings are indexed in [FRONTEND_BACKEND_DATABASE_MAPPING.md](FRONTEND_BACKEND_DATABASE_MAPPING.md); runtime persistence was not verified.
