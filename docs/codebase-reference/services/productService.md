# productService.js

**Source:** `frontend/src/services/productService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** productService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: /api/products, /api/products?, /api/products/, /api/categories
- Explicit HTTP methods: No method option literal detected; inspect listed exports for default GET or indirect behavior.
- API client/import boundary: apiFetch -> services/api.js

## Declarations and dependencies

- Exports: mapProduct, listProducts, searchProducts, getProduct, listCategories
- Named function-like declarations: mapProduct, listProducts, searchProducts, getProduct, listCategories
- Direct local imports: apiFetch -> services/api.js; PAGE_SIZE -> utils/constants.js
- Direct static consumers (impact): hooks/useCatalog.js, hooks/useCategories.js, hooks/useProducts.js, pages/admin/AdminProductFormPage.jsx, pages/customer/ProductDetailPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: mapProduct, listProducts, apiFetch, Error, json, isArray, map, searchProducts, URLSearchParams, String, set, toString, getProduct, encodeURIComponent, listCategories
- Error/control-flow markers: try/catch, throw
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/productService.js/_index.md) for one report per statically identified named declaration in this source file.
