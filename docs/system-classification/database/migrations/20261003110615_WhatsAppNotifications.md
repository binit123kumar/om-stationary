# Migration: `20261003110615_WhatsAppNotifications`

**Source:** [`20261003110615_WhatsAppNotifications.cs`](../../../../backend/OMStationary.Api/Migrations/20261003110615_WhatsAppNotifications.cs)  
**Generated companion:** [`20261003110615_WhatsAppNotifications.Designer.cs`](../../../../backend/OMStationary.Api/Migrations/20261003110615_WhatsAppNotifications.Designer.cs)

## Declared operations

`Up` creates `WhatsAppNotifications` with notification type, recipient, message, provider message ID, status/error, attempts, creation/sent/delivered timestamps, and optional `OrderId` foreign key. The migration declares indexes for creation time, notification type, order ID, and status. `Down` drops the table.

## Evidence boundary

The source does not prove the table exists in a live database or that this migration ran. The designer is generated target-model metadata.

**Execution/test status:** NOT TESTED; no migration was applied or database queried.

