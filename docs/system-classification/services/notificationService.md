# notificationService service

## Source identity

- Source: [frontend/src/services/notificationService.js](../../../frontend/src/services/notificationService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: getNotifications, markNotificationRead, markAllNotificationsRead.
- Important function exports, signatures, and adjacent source comments:
- **getNotifications(take = 30)** — No directly preceding source comment.
- **markNotificationRead(id)** — No directly preceding source comment.
- **markAllNotificationsRead()** — No directly preceding source comment.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/notifications?take=${take}.
- POST via apiFetch; path expression: /api/notifications/${encodeURIComponent(id)}/read.
- POST via apiFetch; path expression: /api/notifications/read-all.

## Local dependencies

- apiFetch from frontend/src/services/api.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
