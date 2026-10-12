# AdminAuditLogPage.jsx

**Source:** `frontend/src/pages/admin/AdminAuditLogPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/audit-log (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminAuditLogPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, AdminDataTable
- JSX text-region fragments (lexical; may include expressions): ?setLoading(false));},[]); return?; `ADMIN PANEL`; `Audit log`; `Recent administrative actions recorded by the server.`; `{error&&`; `{error}`; `{formatDateTime(r.createdAt||r.CreatedAt)}`; `{r.adminEmail||r.AdminEmail}`; `{r.action||r.Action}`; `{r.entityType||r.EntityType}`

## Declarations and dependencies

- Exports: AdminAuditLogPage
- Named function-like declarations: AdminAuditLogPage
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; AdminDataTable -> components/admin/AdminDataTable.jsx; adminHeaders, getAuditLog -> services/adminService.js; readSession -> services/session.js; formatDateTime -> utils/formatDate.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: {user,onLogout}
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: rows, setRows, error, setError, loading, setLoading
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, getAuditLog -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminAuditLogPage, useState, useEffect, getAuditLog, adminHeaders, readSession, then, setError, finally, setLoading, formatDateTime
- Error/control-flow markers: finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminAuditLogPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
