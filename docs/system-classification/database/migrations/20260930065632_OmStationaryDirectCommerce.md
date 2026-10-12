# Migration: `20260930065632_OmStationaryDirectCommerce`

**Source:** [`20260930065632_OmStationaryDirectCommerce.cs`](../../../../backend/OMStationary.Api/Migrations/20260930065632_OmStationaryDirectCommerce.cs)  
**Generated companion:** [`20260930065632_OmStationaryDirectCommerce.Designer.cs`](../../../../backend/OMStationary.Api/Migrations/20260930065632_OmStationaryDirectCommerce.Designer.cs)

## Declared operations

`Up` removes the legacy `PlatformConnectors` table, adjusts product/order/payment/notification fields, adds direct-commerce product metadata, and creates invoice, invoice-line, wishlist, and wishlist-item tables with their declared indexes/relationships. It runs SQL to backfill product slugs and includes a guard that stops migration if an existing order number is longer than the new limit rather than truncating it. `Down` reverses the declared changes and restores the prior connector/schema shape.

Read the source `Up`/`Down` before any migration operation, especially the data guard and SQL backfill.

## Evidence boundary

Operations are source evidence only. Neither backfill execution nor current database state is verified. The designer is generated target-model metadata.

**Execution/test status:** NOT TESTED; no migration was applied or database queried.

