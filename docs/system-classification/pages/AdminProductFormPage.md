# AdminProductFormPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/admin/AdminProductFormPage.jsx](../../../frontend/src/pages/admin/AdminProductFormPage.jsx)
- Route key(s): **admin-product-form**, **admin-product-form**
- Route declarations and guards: **/admin/products/new** (Admin); **/admin/products/:id/edit** (Admin)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: AdminProductFormPage.
- RouteView dispatch branch: case 'admin-product-form': return <AdminProductFormPage {...adminProps} />;.

## Imported project modules

### components

- [AdminLayout](../components/admin/AdminLayout.md) — source frontend/src/components/admin/AdminLayout.jsx.
- [Input](../components/common/Input.md) — source frontend/src/components/common/Input.jsx.
- [Checkbox](../components/common/Checkbox.md) — source frontend/src/components/common/Checkbox.jsx.
- [Button](../components/common/Button.md) — source frontend/src/components/common/Button.jsx.

### services

- [getProduct](../services/productService.md) — source frontend/src/services/productService.js.
- [readSession](../services/session.md) — source frontend/src/services/session.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useNavigate, useParams, useState, useEffect.
- Imported service functions whose names also appear as calls: [getProduct](../services/productService.md), [readSession](../services/session.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
