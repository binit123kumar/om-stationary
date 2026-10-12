# Migration: `20261003093401_AdminStoreSettingsAndAuditValues`

**Source:** [`20261003093401_AdminStoreSettingsAndAuditValues.cs`](../../../../backend/OMStationary.Api/Migrations/20261003093401_AdminStoreSettingsAndAuditValues.cs)  
**Generated companion:** [`20261003093401_AdminStoreSettingsAndAuditValues.Designer.cs`](../../../../backend/OMStationary.Api/Migrations/20261003093401_AdminStoreSettingsAndAuditValues.Designer.cs)

## Declared operations

`Up` adds nullable `AuditLogs.OldValue` and `AuditLogs.NewValue` columns (`nvarchar(500)` in the migration source), creates `StoreSettings` with store/tax/pickup/delivery/payment override fields, and creates an index on `StoreSettings.UpdatedAt`. `Down` drops the settings table and both audit columns.

## Evidence boundary

These are the migration's source-declared operations, not verified live columns/tables. The designer is generated target-model metadata.

**Execution/test status:** NOT TESTED; no migration was applied or database queried.

