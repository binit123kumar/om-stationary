# AboutPage.jsx

**Source:** `frontend/src/pages/customer/AboutPage.jsx`  
**Classification:** Routed page source
**Route classification:** /about
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** AboutPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: Navigation
- JSX text-region fragments (lexical; may include expressions): `ABOUT US`; `OM Stationary`; `Your neighbourhood stationery and office supplies store in Patna, online and in person.`; `Who we are`; `Visit the store`; `{OM_CONTACT.address}`; `{OM_CONTACT.plusCode}`; `How ordering works`; `Browse the catalogue and add products to your cart.`; `Choose delivery to your address, or pickup from the store.`

## Declarations and dependencies

- Exports: AboutPage
- Named function-like declarations: AboutPage
- Direct local imports: OM_CONTACT -> utils/constants.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: (none declared)
- React hooks/state APIs: None statically detected.
- State bindings found in useState/useReducer pair destructuring: None detected.
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: None.

## Behavior, errors, security, and maintenance

- Statically observed calls: AboutPage
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/AboutPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
