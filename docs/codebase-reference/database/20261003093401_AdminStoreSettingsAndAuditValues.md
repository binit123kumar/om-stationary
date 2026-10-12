# Migration 20261003093401_AdminStoreSettingsAndAuditValues

- **Identity:** `backend/OMStationary.Api/Migrations/20261003093401_AdminStoreSettingsAndAuditValues.cs`; migration id/class are emitted in source attributes/declaration.
- **Operations in Up/Down:** CreateTable, CreateIndex, DropTable, DropColumn, DropColumn
- **Schema identifiers:** NewValue, OldValue, StoreSettings, IX_StoreSettings_UpdatedAt
- **Operation detail:** `Up` adds nullable `AuditLogs.NewValue` and `AuditLogs.OldValue` columns (`nvarchar(500)`), creates `StoreSettings` with store/tax/pickup/delivery/payment configuration fields, and indexes `UpdatedAt`. `Down` drops the settings table and both audit columns.
- **Designer note:** Companion `backend/OMStationary.Api/Migrations/20261003093401_AdminStoreSettingsAndAuditValues.Designer.cs` is generated target-model metadata (EF Core 10.0.0), not a separate hand-authored schema operation; it overrides `BuildTargetModel`.
- **Purpose/flow:** This is the migration operation source; apply/revert behavior is limited to the literal operations in ``Up``/``Down``. See exact source before editing.
- **Data effect:** Declares schema changes in migrations; this is not evidence that any live database applied them.
- **Test evidence:** NOT TESTED; no runtime migration execution performed for documentation.
- **Maintenance:** Keep migration Up/Down reversible as intended and regenerate/compare snapshot through EF tooling when model changes.
