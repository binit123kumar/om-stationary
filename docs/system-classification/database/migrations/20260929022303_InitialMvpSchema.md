# Migration: `20260929022303_InitialMvpSchema`

**Source:** [`20260929022303_InitialMvpSchema.cs`](../../../../backend/OMStationary.Api/Migrations/20260929022303_InitialMvpSchema.cs)  
**Generated companion:** [`20260929022303_InitialMvpSchema.Designer.cs`](../../../../backend/OMStationary.Api/Migrations/20260929022303_InitialMvpSchema.Designer.cs)

## Declared operations

`Up` creates `Deliveries`, `Orders`, `PartnerShops`, `PlatformConnectors`, `Products`, `ShopProducts`, and `OrderItems`, including the declared order-item relationship/index. `Down` removes these objects in dependency-aware order.

This is a historical initial schema: later migration `20260929030714_MvpFoundation` adds more entities and columns, and later migrations alter/remove some initial structures.

## Evidence boundary

The source migration describes intended DDL only. It does not prove this migration was applied, that its tables remain, or what the live database currently contains. The designer is generated target-model metadata, not an additional migration.

**Execution/test status:** NOT TESTED; no migration was applied or database queried.

