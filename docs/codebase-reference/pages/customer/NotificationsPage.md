# NotificationsPage.jsx

**Source:** `frontend/src/pages/customer/NotificationsPage.jsx`  
**Classification:** Routed page source
**Route classification:** /notifications
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** NotificationsPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: Bell, Link, NotificationList
- JSX text-region fragments (lexical; may include expressions): `Sign in to see notifications`; `Order updates appear here once you are signed in.`; `Sign in`; `NOTIFICATIONS`; `Your notifications`; `Order updates from OM Stationary. Refreshes automatically every 15 seconds.`; `Mark all as read`; `Loading notifications...`; `No notifications yet`; `You will be notified here when your order status changes.`

## Declarations and dependencies

- Exports: NotificationsPage
- Named function-like declarations: NotificationsPage, markAll
- Direct local imports: getNotifications, markAllNotificationsRead, markNotificationRead -> services/notificationService.js; NotificationList -> components/notifications/NotificationList.jsx; readSession -> services/session.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: (none declared)
- React hooks/state APIs: useState, useCallback, useEffect
- State bindings found in useState/useReducer pair destructuring: data, setData, loading, setLoading
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: getNotifications, markAllNotificationsRead, markNotificationRead -> services/notificationService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: NotificationsPage, readSession, useState, useCallback, async, setLoading, getNotifications, setData, useEffect, load, setInterval, clearInterval, markAllNotificationsRead
- Error/control-flow markers: try/catch, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/NotificationsPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
