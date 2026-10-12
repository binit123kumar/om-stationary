# HomePage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/HomePage.jsx](../../../frontend/src/pages/customer/HomePage.jsx)
- Route key(s): **home**, **home**
- Route declarations and guards: **/** (Public (no ProtectedRoute wrapper in declaration)); ***** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: HomePage, rememberRecentProduct.
- RouteView dispatch branch: case 'home': return <HomePage {...customerProps} />;.

## Imported project modules

### components

- [ProductCard](../components/products/ProductCard.md) — source frontend/src/components/products/ProductCard.jsx.

### services

- No imports from this source area detected.

### hooks

- No imports from this source area detected.

### utils

- readRecentProducts, writeRecentProducts — source frontend/src/utils/storage.js.

## Source observations

- Hook-call identifiers lexically invoked here: useState.
- Imported service functions whose names also appear as calls: none detected.
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
