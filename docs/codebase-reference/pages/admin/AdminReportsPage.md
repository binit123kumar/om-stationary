# AdminReportsPage.jsx

**Source:** `frontend/src/pages/admin/AdminReportsPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/reports (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminReportsPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `Reports`; `Sales, orders, customers, inventory, payment and delivery summaries.`; `{error&&`; `{error}`; `From`; `To`; `Load report`; `{busy&&`; `Loading report…`

## Declarations and dependencies

- Exports: AdminReportsPage
- Named function-like declarations: AdminReportsPage, load, csv
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; adminHeaders, exportReport, getReport -> services/adminService.js; readSession -> services/session.js; rupeesShort -> utils/formatCurrency.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: {user,onLogout}
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: from, setFrom, to, setTo, data, setData, error, setError, busy, setBusy
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, exportReport, getReport -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminReportsPage, useState, async, setBusy, setError, getReport, adminHeaders, readSession, Error, setData, json, useEffect, load, exportReport, blob, createObjectURL, createElement, click, revokeObjectURL, setFrom, setTo, entries, filter, includes
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminReportsPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
