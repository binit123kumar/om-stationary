# AdminDashboardPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/admin/AdminDashboardPage.jsx](../../../frontend/src/pages/admin/AdminDashboardPage.jsx)
- Route key(s): **admin-home**
- Route declarations and guards: **/admin** (Admin)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: AdminDashboardPage.
- RouteView dispatch branch: case 'admin-home': return <AdminDashboardPage {...adminProps} />;.

## Imported project modules

### components

- [AdminKpiCard](../components/admin/AdminKpiCard.md) — source frontend/src/components/admin/AdminKpiCard.jsx.
- [AdminChartCard](../components/admin/AdminChartCard.md) — source frontend/src/components/admin/AdminChartCard.jsx.
- [OrderStatusChart](../components/admin/OrderStatusChart.md) — source frontend/src/components/admin/OrderStatusChart.jsx.
- [RecentOrdersTable](../components/admin/RecentOrdersTable.md) — source frontend/src/components/admin/RecentOrdersTable.jsx.
- [SalesChart](../components/admin/SalesChart.md) — source frontend/src/components/admin/SalesChart.jsx.
- [TopProductsTable](../components/admin/TopProductsTable.md) — source frontend/src/components/admin/TopProductsTable.jsx.
- [AdminLayout](../components/admin/AdminLayout.md) — source frontend/src/components/admin/AdminLayout.jsx.

### services

- [getAnalytics, getDashboard](../services/adminService.md) — source frontend/src/services/adminService.js.
- [adminHeaders](../services/adminService.md) — source frontend/src/services/adminService.js.
- [readSession](../services/session.md) — source frontend/src/services/session.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useEffect.
- Imported service functions whose names also appear as calls: [getAnalytics](../services/adminService.md), [getDashboard](../services/adminService.md), [adminHeaders](../services/adminService.md), [readSession](../services/session.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
