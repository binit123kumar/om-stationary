# Migration 20261003110615_WhatsAppNotifications

- **Identity:** `backend/OMStationary.Api/Migrations/20261003110615_WhatsAppNotifications.cs`; migration id/class are emitted in source attributes/declaration.
- **Operations in Up/Down:** CreateTable, CreateIndex, CreateIndex, CreateIndex, CreateIndex, DropTable
- **Schema identifiers:** WhatsAppNotifications, FK_WhatsAppNotifications_Orders_OrderId, IX_WhatsAppNotifications_CreatedAt, IX_WhatsAppNotifications_NotificationType, IX_WhatsAppNotifications_OrderId, IX_WhatsAppNotifications_Status
- **Operation detail:** `Up` creates `WhatsAppNotifications` with optional order FK, notification type, recipient, message, provider ID, status/error, attempt count and created/sent/delivered timestamps; creates indexes for creation time, type, optional order and status. `Down` drops that table.
- **Designer note:** Companion `backend/OMStationary.Api/Migrations/20261003110615_WhatsAppNotifications.Designer.cs` is generated target-model metadata (EF Core 10.0.0), not a separate hand-authored schema operation; it overrides `BuildTargetModel`.
- **Purpose/flow:** This is the migration operation source; apply/revert behavior is limited to the literal operations in ``Up``/``Down``. See exact source before editing.
- **Data effect:** Declares schema changes in migrations; this is not evidence that any live database applied them.
- **Test evidence:** NOT TESTED; no runtime migration execution performed for documentation.
- **Maintenance:** Keep migration Up/Down reversible as intended and regenerate/compare snapshot through EF tooling when model changes.
