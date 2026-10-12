# NotificationsPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/NotificationsPage.jsx](../../../frontend/src/pages/customer/NotificationsPage.jsx)
- Route key(s): **notifications**
- Route declarations and guards: **/notifications** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: NotificationsPage.
- RouteView dispatch branch: case 'notifications': return <NotificationsPage />;.

## Imported project modules

### components

- [NotificationList](../components/notifications/NotificationList.md) — source frontend/src/components/notifications/NotificationList.jsx.

### services

- [readSession](../services/session.md) — source frontend/src/services/session.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useCallback, useEffect.
- Imported service functions whose names also appear as calls: [readSession](../services/session.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
