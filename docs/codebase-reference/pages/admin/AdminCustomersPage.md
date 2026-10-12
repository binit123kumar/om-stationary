# AdminCustomersPage.jsx

**Source:** `frontend/src/pages/admin/AdminCustomersPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/customers (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminCustomersPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, AdminDataTable
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `Customers`; `{data.total} registered customers`; `{error &&`; `{error}`; `Search customers`; `{c.fullName || '-'}`; `{c.email}`; `{c.phone}`; `{c.isActive ` 'Active' : 'Inactive'}?

## Declarations and dependencies

- Exports: AdminCustomersPage
- Named function-like declarations: AdminCustomersPage
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; AdminDataTable -> components/admin/AdminDataTable.jsx; adminHeaders, listAdminCustomers -> services/adminService.js; readSession -> services/session.js; formatDateTime -> utils/formatDate.js; rupeesShort -> utils/formatCurrency.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { user, onLogout }
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: q, setQ, data, setData, loading, setLoading, error, setError
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, listAdminCustomers -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminCustomersPage, adminHeaders, readSession, useState, useEffect, setLoading, setError, listAdminCustomers, then, setData, finally, setQ, formatDateTime, rupeesShort
- Error/control-flow markers: finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminCustomersPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
