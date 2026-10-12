# AdminOrderDetailPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/admin/AdminOrderDetailPage.jsx](../../../frontend/src/pages/admin/AdminOrderDetailPage.jsx)
- Route key(s): **admin-order**
- Route declarations and guards: **/admin/orders/:id** (Admin)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: AdminOrderDetailPage.
- RouteView dispatch branch: case 'admin-order': return <AdminOrderDetailPage {...adminProps} />;.

## Imported project modules

### components

- [AdminLayout](../components/admin/AdminLayout.md) — source frontend/src/components/admin/AdminLayout.jsx.
- [OrderStatusBadge](../components/orders/OrderStatusBadge.md) — source frontend/src/components/orders/OrderStatusBadge.jsx.
- [OrderStatusTimeline](../components/orders/OrderStatusTimeline.md) — source frontend/src/components/orders/OrderStatusTimeline.jsx.

### services

- [readSession](../services/session.md) — source frontend/src/services/session.js.

### hooks

- No imports from this source area detected.

### utils

- formatDateTime — source frontend/src/utils/formatDate.js.
- actionLabelFor — source frontend/src/utils/formatOrderStatus.js.
- rupees — source frontend/src/utils/formatCurrency.js.

## Source observations

- Hook-call identifiers lexically invoked here: useParams, useState, useCallback, useEffect.
- Imported service functions whose names also appear as calls: [readSession](../services/session.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
