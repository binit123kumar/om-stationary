# authService.js

**Source:** `frontend/src/services/authService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** authService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: /api/auth/logout, /api/auth/me
- Explicit HTTP methods: POST
- API client/import boundary: apiFetch -> services/api.js; apiBase -> services/session.js

## Declarations and dependencies

- Exports: login, register, logout, getMe
- Named function-like declarations: login, register, logout, getMe
- Direct local imports: apiFetch -> services/api.js; apiBase -> services/session.js
- Direct static consumers (impact): components/auth/LoginForm.jsx, pages/delivery/DeliveryProfilePage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: login, fetch, stringify, trim, register, logout, apiFetch, getMe
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/authService.js/_index.md) for one report per statically identified named declaration in this source file.
