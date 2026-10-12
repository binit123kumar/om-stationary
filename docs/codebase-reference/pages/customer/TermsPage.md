# TermsPage.jsx

**Source:** `frontend/src/pages/customer/TermsPage.jsx`  
**Classification:** Routed page source
**Route classification:** /terms
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** TermsPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: LegalContent
- JSX text-region fragments (lexical; may include expressions): No plain text nodes statically extracted.

## Declarations and dependencies

- Exports: TermsPage
- Named function-like declarations: TermsPage
- Direct local imports: LegalContent -> pages/customer/LegalContent.jsx
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: (none declared)
- React hooks/state APIs: None statically detected.
- State bindings found in useState/useReducer pair destructuring: None detected.
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: None.

## Behavior, errors, security, and maintenance

- Statically observed calls: TermsPage
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/TermsPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
