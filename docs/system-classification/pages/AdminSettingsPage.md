# AdminSettingsPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/admin/AdminSettingsPage.jsx](../../../frontend/src/pages/admin/AdminSettingsPage.jsx)
- Route key(s): **admin-settings**
- Route declarations and guards: **/admin/settings** (Admin)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: AdminSettingsPage.
- RouteView dispatch branch: case 'admin-settings': return <AdminSettingsPage {...adminProps} />;.

## Imported project modules

### components

- [AdminLayout](../components/admin/AdminLayout.md) — source frontend/src/components/admin/AdminLayout.jsx.

### services

- [adminHeaders, getAdminSettings, saveAdminSettings](../services/adminService.md) — source frontend/src/services/adminService.js.
- [readSession](../services/session.md) — source frontend/src/services/session.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useEffect.
- Imported service functions whose names also appear as calls: [adminHeaders](../services/adminService.md), [getAdminSettings](../services/adminService.md), [saveAdminSettings](../services/adminService.md), [readSession](../services/session.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
