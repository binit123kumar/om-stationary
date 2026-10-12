# AdminSettingsPage.jsx

**Source:** `frontend/src/pages/admin/AdminSettingsPage.jsx`  
**Classification:** Routed page source
**Route classification:** /admin/settings (ProtectedRoute role: Admin)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AdminSettingsPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: AdminLayout
- JSX text-region fragments (lexical; may include expressions): `ADMIN PANEL`; `Store settings`; `Update supported store, billing, pickup and delivery fields.`; `{error&&`; `{error}`; `}{message&&`; `{message}`; `}{data&&`; `{k.replace(/([A-Z])/g,' $1')}`; `{busy`'Saving…':'Save settings'}?

## Declarations and dependencies

- Exports: AdminSettingsPage
- Named function-like declarations: AdminSettingsPage, save
- Direct local imports: AdminLayout -> components/admin/AdminLayout.jsx; adminHeaders, getAdminSettings, saveAdminSettings -> services/adminService.js; readSession -> services/session.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: {user,onLogout}
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: data, setData, form, setForm, error, setError, message, setMessage, busy, setBusy
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: adminHeaders, getAdminSettings, saveAdminSettings -> services/adminService.js; readSession -> services/session.js

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminSettingsPage, useState, adminHeaders, readSession, useEffect, getAdminSettings, then, setData, setForm, fromEntries, filter, map, setError, preventDefault, setBusy, setMessage, saveAdminSettings, Error, json, replace
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/admin/AdminSettingsPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
