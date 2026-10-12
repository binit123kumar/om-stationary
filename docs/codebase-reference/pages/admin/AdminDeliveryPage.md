# AdminDeliveryPage.jsx

**Source:** `frontend/src/pages/admin/AdminDeliveryPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/delivery (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminDeliveryPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout, AdminDataTable, Modal
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `Delivery management`; `Manage delivery partners and server-recorded assignments.`; `Create delivery partner`; `{error &&`; `{error}`; `Delivery partners`; `{p.name}`; `{p.mobile}`; `{p.email}`

## Declarations and dependencies

- Exports: AdminDeliveryPage
- Named function-like declarations: AdminDeliveryPage, create, assign
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; AdminDataTable -> components/admin/AdminDataTable.jsx; Modal -> components/common/Modal.jsx; adminHeaders, assignDeliveryPartner, createDeliveryPartner, listAllAssignments, listDeliveryPartners -> services/adminService.js; readSession -> services/session.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { user, onLogout }
- React hooks/state APIs: useState, useCallback, useEffect
- State bindings found in useState/useReducer pair destructuring: partners, setPartners, assignments, setAssignments, loading, setLoading, error, setError, busy, setBusy, createOpen, setCreateOpen, partner, setPartner, selection, setSelection
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, assignDeliveryPartner, createDeliveryPartner, listAllAssignments, listDeliveryPartners -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminDeliveryPage, adminHeaders, readSession, useState, useCallback, async, setLoading, setError, all, listDeliveryPartners, listAllAssignments, setPartners, setAssignments, useEffect, load, preventDefault, setBusy, createDeliveryPartner, Error, json, setCreateOpen, setPartner, some, String
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminDeliveryPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
