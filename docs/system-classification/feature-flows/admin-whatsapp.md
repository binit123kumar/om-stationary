# Admin WhatsApp operations

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | `/admin/whatsapp` → `AdminWhatsAppPage`, Admin-role guarded. UI components include status/log lists, settings form, test button, and retry button. |
| Handler/state | Page loads recent status/events, saves editable settings, requests a test send, or retries a selected notification. Errors are rendered from service responses. The access token is server configuration and not returned to browser. |
| Service | `whatsappService.getWhatsAppConfig`, `saveWhatsAppSettings`, `sendWhatsAppTest`, `retryWhatsAppNotification`. |
| HTTP contract | `GET /api/admin/whatsapp?take=…`; `PUT /api/admin/whatsapp/settings`; `POST /api/admin/whatsapp/test`; `POST /api/admin/whatsapp/{id}/retry`. |
| Backend | Admin-authorized `AdminWhatsAppController` reads status/log entries, updates settings, triggers a test, and retries one recorded notification. `WhatsAppNotificationService` handles outbound sends and records attempt/result; `WhatsAppOptions` validates/normalizes configuration and phone number. |
| Data | `WhatsAppNotification` → `WhatsAppNotifications`; settings updates add an `AuditLog` → `AuditLogs` record. The controller changes live `IConfiguration` values; durable restart persistence is a deployment/configuration concern, not a `StoreSettings` write. Event source records may refer to `Orders`. |

## Response and error path

Service methods throw/display backend detail for failed config reads or updates. Test/retry methods return the raw HTTP response so the page can present success/failure. Missing or invalid settings, provider rejection, and delivery failures are not evidence of successful message delivery; attempt status is recorded. WhatsApp endpoint and background message-trigger behavior are cross-linked in [notifications-messaging.md](notifications-messaging.md).

## Tests and status

- **Tests:** `OrderStateMachineTests` includes WhatsApp option configuration/phone normalization tests. `NotificationDeliveryTests` covers email/SMS, not a live WhatsApp Cloud API send. Admin controller route tests were not found (**NOT_MAPPED**).
- **Source status:** **Confirmed** from [AdminWhatsAppPage.jsx](../../../frontend/src/pages/admin/AdminWhatsAppPage.jsx), [whatsappService.js](../../../frontend/src/services/whatsappService.js), [AdminWhatsAppController.cs](../../../backend/OMStationary.Api/Controllers/AdminWhatsAppController.cs), [WhatsAppNotificationService.cs](../../../backend/OMStationary.Api/Services/WhatsAppNotificationService.cs), and [OmDbContext.cs](../../../backend/OMStationary.Api/Data/OmDbContext.cs).
- **Runtime status:** **Unverified.** No provider credentials, delivery, retry, or persisted message record was tested.
