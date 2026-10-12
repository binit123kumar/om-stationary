# DeliveryProfilePage.jsx

**Source:** `frontend/src/pages/delivery/DeliveryProfilePage.jsx`  
**Classification:** Routed page source
**Route classification:** /delivery/profile (ProtectedRoute role: DeliveryPartner)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** DeliveryProfilePage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: No uppercase JSX component tags statically found.
- JSX text-region fragments (lexical; may include expressions): ?setError(e.message));},[]); return?; `DELIVERY PARTNER`; `Profile`; `Account information available from the signed-in account service.`; `{error&&`; `{error}`; `}{user&&`; `Name: {user.fullName||user.name}`; `Email: {user.email}`; `Phone: {user.phone||'—'}`

## Declarations and dependencies

- Exports: DeliveryProfilePage
- Named function-like declarations: DeliveryProfilePage
- Direct local imports: getMe -> services/authService.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: (none declared)
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: user, setUser, error, setError
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: getMe -> services/authService.js

## Behavior, errors, security, and maintenance

- Statically observed calls: DeliveryProfilePage, useState, useEffect, getMe, then, Error, setUser, json, setError
- Error/control-flow markers: throw
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/delivery/DeliveryProfilePage.jsx/_index.md) for one report per statically identified named declaration in this source file.
