# Notifications, WhatsApp, email, and SMS flow

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Customer route/page | `/notifications` → `NotificationsPage`; `AppShell` creates `useNotifications(user)` and supplies unread count to the header. |
| UI state/service | `notificationService` gets feed and marks one/all read. Order placement/status/payment code calls backend notification and channel services; storefront does not directly send email, SMS, or WhatsApp. |
| HTTP contract | Customer authenticated `GET /api/notifications?take=N`, `POST /api/notifications/{id}/read`, `POST /api/notifications/read-all`. Admin WhatsApp controls use `/api/admin/whatsapp` routes in [admin-whatsapp.md](admin-whatsapp.md). No customer-facing email/SMS send endpoint is mapped. |
| Backend | `NotificationsController` lists only current customer's InApp channel rows and marks read. `NotificationService.AddForOrder` records in-app state. `OrdersController.Create`, status change, and payment-state change invoke notification service and email/SMS/WhatsApp interfaces. `WhatsAppNotificationService`, `EmailNotificationService`, and `SmsNotificationService` perform/configure delivery attempts. `StockAlertService` also emits low-stock notifications after order stock decrement. |
| Data | `Notification` → `Notifications`; `WhatsAppNotification` → `WhatsAppNotifications`; order and stock context from `Orders`, `Products`, `OrderStatusHistory`, and `Payments`. |

## Distinct channels and error path

- **In-app:** query response includes unread count and recent items; read operations are customer-scoped and return 204/404.
- **WhatsApp:** attempt/status logging is separate from the in-app feed. Admin can inspect, configure safe settings, test, and retry via the admin controller. Provider acceptance is not guaranteed delivery.
- **Email/SMS:** triggered by order creation/status/payment events; admin order-created messages are conditional on configured admin contact values. These are backend service calls, not browser HTTP endpoints.

Notification sends are intended as downstream side effects and must not be interpreted as transactional proof of order or payment success. `OrdersController` calls some sends after state persistence and the WhatsApp service records failures; email/SMS services report provider/configuration failure rather than claiming success when unconfigured/rejected.

## Tests and status

- **Tests:** `NotificationDeliveryTests` includes tests for unconfigured SMTP, placeholder/rejected SMS provider, and accepted Twilio SMS response/phone formatting. `OrderStateMachineTests` includes notification event-message and WhatsApp option/normalization tests. These are service/helper tests, not a live-provider end-to-end run.
- **Source status:** **Confirmed** from [NotificationsPage.jsx](../../../frontend/src/pages/customer/NotificationsPage.jsx), [notificationService.js](../../../frontend/src/services/notificationService.js), [useNotifications.js](../../../frontend/src/hooks/useNotifications.js), [OrdersController.cs](../../../backend/OMStationary.Api/Controllers/OrdersController.cs), [NotificationsController.cs](../../../backend/OMStationary.Api/Controllers/NotificationsController.cs), [NotificationService.cs](../../../backend/OMStationary.Api/Services/NotificationService.cs), [EmailNotificationService.cs](../../../backend/OMStationary.Api/Services/EmailNotificationService.cs), [SmsNotificationService.cs](../../../backend/OMStationary.Api/Services/SmsNotificationService.cs), [WhatsAppNotificationService.cs](../../../backend/OMStationary.Api/Services/WhatsAppNotificationService.cs), and [NotificationDeliveryTests.cs](../../../backend/OMStationary.Api.Tests/NotificationDeliveryTests.cs).
- **Runtime status:** **Unverified.** Unit tests do not prove live SMTP, Twilio, WhatsApp Cloud API delivery, or production notification records.
