# `WhatsAppNotificationStatuses`

- **Source:** [`Models.cs`](../../../../../backend/OMStationary.Api/Models/Models.cs).
- **Declaration:** Static constants, not an EF entity/table.
- **Constants:** `Pending = "Pending"`, `Sent = "Sent"`, `Delivered = "Delivered"`, `Failed = "Failed"`, and `NotConfigured = "NotConfigured"`.
- **Database mapping:** None declared; status values are stored as string values by code in `WhatsAppNotification.Status`, not as separate schema objects.

