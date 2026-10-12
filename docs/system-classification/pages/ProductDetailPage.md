# ProductDetailPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/ProductDetailPage.jsx](../../../frontend/src/pages/customer/ProductDetailPage.jsx)
- Route key(s): **product**
- Route declarations and guards: **/product/:id** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: ProductDetailPage.
- RouteView dispatch branch: case 'product': return <ProductDetailPage {...customerProps} />;.

## Imported project modules

### components

- [ProductGallery](../components/products/ProductGallery.md) — source frontend/src/components/products/ProductGallery.jsx.
- [ProductInfo](../components/products/ProductInfo.md) — source frontend/src/components/products/ProductInfo.jsx.
- [ProductTabs](../components/products/ProductTabs.md) — source frontend/src/components/products/ProductTabs.jsx.
- [Breadcrumbs](../components/layout/Breadcrumbs.md) — source frontend/src/components/layout/Breadcrumbs.jsx.

### services

- [getProduct](../services/productService.md) — source frontend/src/services/productService.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useNavigate, useParams, useState, useEffect.
- Imported service functions whose names also appear as calls: [getProduct](../services/productService.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
