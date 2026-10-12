# cartService.js

**Source:** `frontend/src/services/cartService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** cartService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: /api/cart
- Explicit HTTP methods: PUT
- API client/import boundary: apiFetch -> services/api.js; mapServerCart -> services/session.js

## Declarations and dependencies

- Exports: getCart, saveCart, mergeGuestCart
- Named function-like declarations: getCart, saveCart, mergeGuestCart
- Direct local imports: apiFetch -> services/api.js; mapServerCart -> services/session.js
- Direct static consumers (impact): components/auth/LoginForm.jsx, hooks/useCart.js

## Behavior, errors, security, and maintenance

- Statically observed calls: getCart, apiFetch, Error, mapServerCart, json, saveCart, stringify, mergeGuestCart, map, Map, set, min, max, get, entries
- Error/control-flow markers: throw
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/cartService.js/_index.md) for one report per statically identified named declaration in this source file.
