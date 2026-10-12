# LegalContent.jsx

**Source:** `frontend/src/pages/customer/LegalContent.jsx`  
**Classification:** Shared/unrouted page-folder source
**Route classification:** No direct route mapping found in App.jsx + RouteView.jsx; treat as shared/unrouted page module, not a route.
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** LegalContent is the page-folder module identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: Link
- JSX text-region fragments (lexical; may include expressions): `Page not found`; `Back to home`; `OM STATIONARY`; `{doc.title}`; `{doc.intro}`; `{heading}`; `{paragraph}`

## Declarations and dependencies

- Exports: LegalContent
- Named function-like declarations: LegalContent
- Direct local imports: LEGAL, OM_CONTACT -> utils/constants.js
- Direct static consumers (impact): pages/customer/PrivacyPage.jsx, pages/customer/RefundPolicyPage.jsx, pages/customer/TermsPage.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: { kind }
- React hooks/state APIs: None statically detected.
- State bindings found in useState/useReducer pair destructuring: None detected.
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: None.

## Behavior, errors, security, and maintenance

- Statically observed calls: renderer, LegalContent, map
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/LegalContent.jsx/_index.md) for one report per statically identified named declaration in this source file.
