# Migration 20260929022303_InitialMvpSchema

- **Identity:** `backend/OMStationary.Api/Migrations/20260929022303_InitialMvpSchema.cs`; migration id/class are emitted in source attributes/declaration.
- **Operations in Up/Down:** CreateTable, CreateTable, CreateTable, CreateTable, CreateTable, CreateTable, CreateTable, CreateIndex
- **Schema identifiers:** Deliveries, Orders, PartnerShops, PlatformConnectors, Products, ShopProducts, OrderItems, FK_OrderItems_Orders_OrderId, IX_OrderItems_OrderId
- **Operation detail:** `Up` creates `Deliveries`, `Orders`, `PartnerShops`, `PlatformConnectors`, `Products`, `ShopProducts`, and `OrderItems`; configures the `OrderItems.OrderId` foreign key and index. `Down` removes the created tables in dependency-safe order.
- **Designer note:** Companion `backend/OMStationary.Api/Migrations/20260929022303_InitialMvpSchema.Designer.cs` is generated target-model metadata (EF Core 10.0.0), not a separate hand-authored schema operation; it overrides `BuildTargetModel`.
- **Purpose/flow:** This is the migration operation source; apply/revert behavior is limited to the literal operations in ``Up``/``Down``. See exact source before editing.
- **Data effect:** Declares schema changes in migrations; this is not evidence that any live database applied them.
- **Test evidence:** NOT TESTED; no runtime migration execution performed for documentation.
- **Maintenance:** Keep migration Up/Down reversible as intended and regenerate/compare snapshot through EF tooling when model changes.
