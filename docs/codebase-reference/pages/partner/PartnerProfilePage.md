# PartnerProfilePage.jsx

**Source:** `frontend/src/pages/partner/PartnerProfilePage.jsx`  
**Classification:** Routed page source
**Route classification:** /partner/profile (ProtectedRoute role: PartnerShop)
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** PartnerProfilePage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: No uppercase JSX component tags statically found.
- JSX text-region fragments (lexical; may include expressions): `PARTNER PORTAL`; `Shop profile`; `Update the supported business and delivery details for your shop.`; `{error&&`; `{error}`; `}{message&&`; `{message}`; `}{shop&&`; `{label}`; `Supports delivery`

## Declarations and dependencies

- Exports: PartnerProfilePage
- Named function-like declarations: PartnerProfilePage, save
- Direct local imports: usePartner -> hooks/usePartner.js; updatePartnerShop -> services/partnerService.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: (none declared)
- React hooks/state APIs: usePartner, useState
- State bindings found in useState/useReducer pair destructuring: busy, setBusy, message, setMessage
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: usePartner -> hooks/usePartner.js; updatePartnerShop -> services/partnerService.js

## Behavior, errors, security, and maintenance

- Statically observed calls: PartnerProfilePage, usePartner, useState, preventDefault, setBusy, setMessage, FormData, updatePartnerShop, get, Number, Error, json, reload, map
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/partner/PartnerProfilePage.jsx/_index.md) for one report per statically identified named declaration in this source file.
