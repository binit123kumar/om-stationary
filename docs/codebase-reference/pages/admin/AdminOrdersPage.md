# AdminOrdersPage.jsx

**Source:** `frontend/src/pages/admin/AdminOrdersPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/orders (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminOrdersPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, AdminDataTable, Link, OrderStatusBadge
- JSX text-region fragments (lexical; may include expressions): `All`; `{value}`; `ADMIN PANEL`; `Orders`; `{total} total`; `{error}`; `Pickup`; `Delivery`; `{order.orderNumber}`; `Invoice {order.invoiceNumber}`

## Declarations and dependencies

- Exports: AdminOrdersPage
- Named function-like declarations: AdminOrdersPage, selectOptions
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; AdminDataTable -> components/admin/AdminDataTable.jsx; OrderStatusBadge -> components/orders/OrderStatusBadge.jsx; adminHeaders, getFilterOptions, listAdminOrders -> services/adminService.js; readSession -> services/session.js; formatDateTime -> utils/formatDate.js; rupeesShort -> utils/formatCurrency.js; PAGE_SIZE -> utils/constants.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { user, key, onLogout }
- React hooks/state APIs: useState, useMemo, useEffect
- State bindings found in useState/useReducer pair destructuring: rows, setRows, total, setTotal, loading, setLoading, error, setError, options, setOptions, q, setQ, status, setStatus, paymentStatus, setPaymentStatus, paymentMethod, setPaymentMethod, fulfillment, setFulfillment, page, setPage
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, getFilterOptions, listAdminOrders -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminOrdersPage, adminHeaders, readSession, useState, useMemo, useEffect, getFilterOptions, then, setOptions, setLoading, setError, URLSearchParams, String, entries, forEach, set, listAdminOrders, fromEntries, async, Error, json, setRows, isArray, setTotal
- Error/control-flow markers: throw
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminOrdersPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
