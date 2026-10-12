# AdminProductsPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/admin/AdminProductsPage.jsx](../../../frontend/src/pages/admin/AdminProductsPage.jsx)
- Route key(s): **admin-products**
- Route declarations and guards: **/admin/products** (Admin)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: AdminProductsPage.
- RouteView dispatch branch: case 'admin-products': return <AdminProductsPage {...adminProps} />;.

## Imported project modules

### components

- [AdminLayout](../components/admin/AdminLayout.md) — source frontend/src/components/admin/AdminLayout.jsx.
- [AdminKpiCard](../components/admin/AdminKpiCard.md) — source frontend/src/components/admin/AdminKpiCard.jsx.
- [AdminDataTable](../components/admin/AdminDataTable.md) — source frontend/src/components/admin/AdminDataTable.jsx.

### services

- [readSession](../services/session.md) — source frontend/src/services/session.js.

### hooks

- No imports from this source area detected.

### utils

- rupeesShort — source frontend/src/utils/formatCurrency.js.
- stockStateLabel — source frontend/src/utils/formatOrderStatus.js.
- ADMIN_PAGE_SIZE — source frontend/src/utils/constants.js.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useCallback, useEffect.
- Imported service functions whose names also appear as calls: [readSession](../services/session.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
