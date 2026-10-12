# AdminInvoicesPage.jsx

**Source:** `frontend/src/pages/admin/AdminInvoicesPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/invoices (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminInvoicesPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, AdminDataTable, Link
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `Invoices`; `{data.total} invoices`; `{error &&`; `{error}`; `Search`; `{i.invoiceNumber}`; `{i.orderNumber}`; `{i.customerName}`; `{i.customerEmail || i.customerPhone}`

## Declarations and dependencies

- Exports: AdminInvoicesPage
- Named function-like declarations: AdminInvoicesPage
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; AdminDataTable -> components/admin/AdminDataTable.jsx; adminHeaders, listAdminInvoices -> services/adminService.js; readSession -> services/session.js; formatDateTime -> utils/formatDate.js; rupeesShort -> utils/formatCurrency.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { user, onLogout }
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: q, setQ, data, setData, loading, setLoading, error, setError
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, listAdminInvoices -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminInvoicesPage, adminHeaders, readSession, useState, useEffect, setLoading, setError, listAdminInvoices, then, setData, finally, setQ, encodeURIComponent, formatDateTime, rupeesShort
- Error/control-flow markers: finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminInvoicesPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
