# Admin settings and notifications

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | `/admin/settings` → `AdminSettingsPage`; `/admin/notifications` → `AdminNotificationsPage`; both are Admin-role protected in `App`. |
| Handler/state | Settings page reads a settings document, edits form state, and submits it. Notifications page loads admin notification rows. Admin headers come from an Admin session or the legacy admin-key fallback in `adminHeaders`. |
| Service | `adminService.getAdminSettings` / `saveAdminSettings`; `getAdminNotifications`; notification queries are also available via `getAuditLog` only for audit page. |
| HTTP contract | `GET/PUT /api/admin/settings`; `GET /api/admin/notifications`. Customer notification feed is separate: `GET /api/notifications?take=…`, `POST /api/notifications/{id}/read`, `POST /api/notifications/read-all`. |
| Backend | `AdminSettingsController.Get/Update` is Admin-authorized and uses `StoreSettingsService`; `AdminReportsController.Notifications` supplies admin notification review. `NotificationsController` is Customer-authorized and updates only the caller's in-app items. |
| Data | `StoreSetting` → `StoreSettings`; `Notification` → `Notifications`; order history and notification channel metadata can refer to `Orders`. |

## Response and error path

Admin settings updates validate and save settings then return the effective settings model; non-success responses are displayed by the page. Admin notification listing is a separate read-only surface; do not conflate it with customer in-app read/unread operations. Customer mark-read endpoints return 204 when updated and 404 when the item does not belong to the customer or does not exist. Admin requests require role authorization; `ProtectedRoute` is a client guard, not a substitute for API authorization.

## Tests and status

- **Tests:** `NotificationDeliveryTests` covers outbound email/SMS behavior, not admin settings or in-app notification endpoints. Route/UI coverage is **NOT_MAPPED**.
- **Source status:** **Confirmed** from [App.jsx](../../../frontend/src/App.jsx), [RouteView.jsx](../../../frontend/src/RouteView.jsx), [adminService.js](../../../frontend/src/services/adminService.js), [AdminSettingsController.cs](../../../backend/OMStationary.Api/Controllers/AdminSettingsController.cs), [AdminReportsController.cs](../../../backend/OMStationary.Api/Controllers/AdminReportsController.cs), [NotificationsController.cs](../../../backend/OMStationary.Api/Controllers/NotificationsController.cs), and [OmDbContext.cs](../../../backend/OMStationary.Api/Data/OmDbContext.cs).
- **Runtime status:** **Unverified.** No settings write, notification-list query, or database state was exercised.
