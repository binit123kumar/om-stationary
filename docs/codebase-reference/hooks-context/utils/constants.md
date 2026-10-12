# constants.js

**Source:** `frontend/src/utils/constants.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** constants is a utility module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: trackingTokenKey
- Named function-like declarations: trackingTokenKey
- Direct local imports: None.
- Direct static consumers (impact): hooks/useOrders.js, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminProductsPage.jsx, pages/customer/AboutPage.jsx, pages/customer/ContactPage.jsx, pages/customer/LegalContent.jsx, pages/customer/ProductListingPage.jsx, services/adminService.js, services/productService.js, services/session.js, utils/storage.js

## Behavior, errors, security, and maintenance

- Statically observed calls: No ordinary call expressions extracted.
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/utils/constants.js/_index.md) for one report per statically identified named declaration in this source file.
