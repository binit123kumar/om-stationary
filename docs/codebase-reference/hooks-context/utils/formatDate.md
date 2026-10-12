# formatDate.js

**Source:** `frontend/src/utils/formatDate.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** formatDate is a utility module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: formatDate, formatDateTime, formatTime, formatSlot, toLocalInputValue, toMinutes, relativeDays
- Named function-like declarations: formatDate, formatDateTime, formatTime, formatSlot, toLocalInputValue, toMinutes, relativeDays
- Direct local imports: None.
- Direct static consumers (impact): components/admin/RecentOrdersTable.jsx, components/notifications/NotificationList.jsx, components/orders/OrderCard.jsx, components/orders/OrderStatusTimeline.jsx, components/orders/TrackingTimeline.jsx, components/whatsapp/WhatsAppLogsTable.jsx, pages/admin/AdminAuditLogPage.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminCustomersPage.jsx, pages/admin/AdminInvoicesPage.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminPaymentsPage.jsx, pages/customer/CheckoutPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: Date, isNaN, getTime, toLocaleDateString, toLocaleString, toLocaleTimeString, getTimezoneOffset, toISOString, slice, String, split, map, floor, now
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/utils/formatDate.js/_index.md) for one report per statically identified named declaration in this source file.
