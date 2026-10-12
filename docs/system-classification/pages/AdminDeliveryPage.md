# AdminDeliveryPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/admin/AdminDeliveryPage.jsx](../../../frontend/src/pages/admin/AdminDeliveryPage.jsx)
- Route key(s): **admin-delivery**
- Route declarations and guards: **/admin/delivery** (Admin)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: AdminDeliveryPage.
- RouteView dispatch branch: case 'admin-delivery': return <AdminDeliveryPage {...adminProps} />;.

## Imported project modules

### components

- [AdminLayout](../components/admin/AdminLayout.md) — source frontend/src/components/admin/AdminLayout.jsx.
- [AdminDataTable](../components/admin/AdminDataTable.md) — source frontend/src/components/admin/AdminDataTable.jsx.
- [Modal](../components/common/Modal.md) — source frontend/src/components/common/Modal.jsx.

### services

- [adminHeaders, assignDeliveryPartner, createDeliveryPartner, listAllAssignments, listDeliveryPartners](../services/adminService.md) — source frontend/src/services/adminService.js.
- [readSession](../services/session.md) — source frontend/src/services/session.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useCallback, useEffect.
- Imported service functions whose names also appear as calls: [adminHeaders](../services/adminService.md), [assignDeliveryPartner](../services/adminService.md), [createDeliveryPartner](../services/adminService.md), [listAllAssignments](../services/adminService.md), [listDeliveryPartners](../services/adminService.md), [readSession](../services/session.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
