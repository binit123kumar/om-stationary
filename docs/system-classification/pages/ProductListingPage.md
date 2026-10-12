# ProductListingPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/ProductListingPage.jsx](../../../frontend/src/pages/customer/ProductListingPage.jsx)
- Route key(s): **search**
- Route declarations and guards: **/search** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: ProductListingPage.
- RouteView dispatch branch: case 'search': return <ProductListingPage {...customerProps} />;.

## Imported project modules

### components

- [ProductCard](../components/products/ProductCard.md) — source frontend/src/components/products/ProductCard.jsx.
- [ProductFilters](../components/products/ProductFilters.md) — source frontend/src/components/products/ProductFilters.jsx.
- [Pagination](../components/common/Pagination.md) — source frontend/src/components/common/Pagination.jsx.

### services

- No imports from this source area detected.

### hooks

- [useProductSearch, useSearchCategories](../hooks/useProducts.md) — source frontend/src/hooks/useProducts.js.

### utils

- PAGE_SIZE — source frontend/src/utils/constants.js.

## Source observations

- Hook-call identifiers lexically invoked here: useLocation, useNavigate, useState, useEffect, useMemo, useProductSearch, useSearchCategories.
- Imported service functions whose names also appear as calls: none detected.
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
