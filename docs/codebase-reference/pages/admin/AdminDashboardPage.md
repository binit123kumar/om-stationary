# AdminDashboardPage.jsx

**Source:** `frontend/src/pages/admin/AdminDashboardPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminDashboardPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, AdminKpiCard, AdminChartCard, SalesChart, OrderStatusChart, RecentOrdersTable, TopProductsTable, Link
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `OM Stationary control centre`; `Manage orders, catalogue, stock and delivery for the OM Stationary store.`; `{error}`; `Loading dashboard...`; `Manage orders`; `Open reports`

## Declarations and dependencies

- Exports: AdminDashboardPage
- Named function-like declarations: AdminDashboardPage
- Direct local imports: AdminKpiCard -> components/admin/AdminKpiCard.jsx; AdminChartCard -> components/admin/AdminChartCard.jsx; OrderStatusChart -> components/admin/OrderStatusChart.jsx; RecentOrdersTable -> components/admin/RecentOrdersTable.jsx; SalesChart -> components/admin/SalesChart.jsx; TopProductsTable -> components/admin/TopProductsTable.jsx; AdminLayout -> components/admin/AdminLayout.jsx; getAnalytics, getDashboard -> services/adminService.js; adminHeaders -> services/adminService.js; readSession -> services/session.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { user, key, onLogout }
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: dashboard, setDashboard, analytics, setAnalytics, orders, setOrders, error, setError, loading, setLoading
- API path literals in this file: http://localhost:5000
- Direct imports that can carry data/API behavior: getAnalytics, getDashboard -> services/adminService.js; adminHeaders -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminDashboardPage, adminHeaders, readSession, useState, useEffect, async, all, getDashboard, getAnalytics, fetch, Error, json, setOrders, isArray, setDashboard, setAnalytics, setLoading, setError
- Error/control-flow markers: try/catch, throw
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminDashboardPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
