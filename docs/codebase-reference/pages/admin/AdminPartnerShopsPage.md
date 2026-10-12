# AdminPartnerShopsPage.jsx

**Source:** `frontend/src/pages/admin/AdminPartnerShopsPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/partners (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminPartnerShopsPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, AdminDataTable
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `Partner shops`; `Review shop details and approval status.`; `{error &&`; `{error}`; `{s.name}`; `{s.ownerName || s.owner}`; `{s.phone}`; `{s.address}`; `{s.pincode}`

## Declarations and dependencies

- Exports: AdminPartnerShopsPage
- Named function-like declarations: AdminPartnerShopsPage, load, approval
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; AdminDataTable -> components/admin/AdminDataTable.jsx; adminHeaders, listPartnerShops, setPartnerShopApproval -> services/adminService.js; readSession -> services/session.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { user, onLogout }
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: rows, setRows, error, setError, loading, setLoading, busy, setBusy
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, listPartnerShops, setPartnerShopApproval -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminPartnerShopsPage, useState, async, setLoading, setRows, listPartnerShops, adminHeaders, readSession, setError, useEffect, load, setBusy, setPartnerShopApproval, Error, json, approval
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminPartnerShopsPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
