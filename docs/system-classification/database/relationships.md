# EF relationship and mapping notes

Source: `backend/OMStationary.Api/Data/OmDbContext.cs`, chiefly `OnModelCreating`. This records configured source relationships/indexes only; it is not a live SQL schema or a complete database-engine diagram.

## Explicit foreign-key relationships

| Dependent | Principal | FK | Delete behavior declared in source |
|---|---|---|---|
| `PartnerShop` | `ApplicationUser` | `UserId` | `SetNull` |
| `ApplicationUser` | `AppRole` | `RoleId` | `SetNull` |
| `DeliveryPartner` | `ApplicationUser` | `UserId` | `SetNull` |
| `CustomerProfile` | `ApplicationUser` | `UserId` | `Cascade` |
| `Address` | `ApplicationUser` | `UserId` | `Cascade` |
| `RefreshToken` | `ApplicationUser` | `UserId` | `Cascade` |
| `Cart` | `ApplicationUser` | `UserId` | `Cascade` |
| `CartItem` | `Cart` | `CartId` | `Cascade` |
| `CartItem` | `Product` | `ProductId` | `Restrict` |
| `Wishlist` | `ApplicationUser` | `UserId` | `Cascade` |
| `ShopProduct` | `PartnerShop` | `PartnerShopId` | `Cascade` |
| `ShopProduct` | `Product` | `ProductId` | `Restrict` |
| `Order` | `ApplicationUser` | `CustomerUserId` | `SetNull` |
| `OrderItem` | `Product` | `ProductId` | `Restrict` |
| `Delivery` | `Order` | `OrderId` | `Cascade` |
| `Delivery` | `DeliveryPartner` | `DeliveryPartnerId` | `SetNull` |
| `ProductImage` | `Product` | `ProductId` | `Cascade` |
| `OrderStatusHistory` | `Order` | `OrderId` | `Cascade` |
| `Payment` | `Order` | `OrderId` | `Cascade` |
| `Invoice` | `Order` | `OrderId` | `Restrict` |
| `InvoiceLine` | `Invoice` | `InvoiceId` | `Cascade` |
| `Refund` | `Order` | `OrderId` | `Cascade` |
| `DeliveryStatusHistory` | `Delivery` | `DeliveryId` | `Cascade` |
| `Settlement` | `Order` | `OrderId` | `Restrict` |
| `Settlement` | `PartnerShop` | `PartnerShopId` | `Restrict` |
| `Order` | `PartnerShop` | `PartnerShopId` | `SetNull` |
| `Product` | `Category` | `CategoryId` | `SetNull` |
| `WhatsAppNotification` | `Order` | `OrderId` | Source model/migration declares an optional order FK; delete behavior is not explicitly configured in the context. |

`WishlistItem` has `WishlistId`/`Wishlist` and `ProductId`/`Product` navigation/FK properties and uses EF conventions; the context explicitly warns against adding a duplicate explicit relationship.

## Explicit indexes

The context declares indexes for user email and role name (unique); non-empty user phone (unique filtered); refresh-token hash (unique) and `(UserId, ExpiresAt)`; cart user ID (unique); cart-item `(CartId, ProductId)` (unique); shop-product `(PartnerShopId, ProductId)` (unique); delivery order ID (unique) and delivery partner ID; product non-empty SKU (unique), non-empty slug (unique), name, category ID, and brand; order number (unique), tracking-token hash (unique), `(CustomerUserId, CreatedAt)`, partner shop, status, and creation time; invoice number/order ID (unique); category name (unique); notification `(UserId, CreatedAt)` and order ID; coupon code (unique); partner-shop and delivery-partner user IDs (unique filtered non-null); customer-profile user ID (unique); wishlist user ID (unique); wishlist-item `(WishlistId, ProductId)` (unique); store-setting update time; and WhatsApp notification creation time, status, and notification type.

## Mapping cautions

- `Product.Category` is a string column and `Product.CategoryId` is a nullable FK to `Category`; source contains both. No mapping or data equivalence between these fields is assumed.
- Navigation collections such as order items/history, product images, cart items, invoice items, and wishlist items are relationships, not scalar columns. See the [table reports](_index.md#declared-entity-tables).
- IDs represented by CLR fields are not treated as relationships absent a configured/conventional navigation/FK evidence in the source inspected. In particular, do not infer FKs for `Invoice.CustomerId`, audit actor IDs, or history actor IDs from their names alone.
- Provider-specific SQL types, constraints materialized in a database, migration success, and referential data integrity are **NOT VERIFIED**.
