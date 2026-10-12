# AdminLayout.jsx

**Source:** `frontend/src/components/admin/AdminLayout.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** AdminLayout is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: { user, onLogout, children }
- React hooks/state APIs referenced: useNavigate
- DOM/component event props and named event handlers found: onLogout, onClick
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: AdminSidebar, AdminHeader, Outlet, Link, ShieldAlert, LayoutGrid

## Declarations and dependencies

- Exports: AdminLayout, AdminBrandLink, AdminHomeLink
- Named function-like declarations: AdminLayout, AdminBrandLink, AdminHomeLink
- Direct local imports: AdminSidebar -> components/admin/AdminSidebar.jsx
- Direct static consumers (impact): pages/admin/AdminAuditLogPage.jsx, pages/admin/AdminCategoriesPage.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminCustomersPage.jsx, pages/admin/AdminDashboardPage.jsx, pages/admin/AdminDeliveryPage.jsx, pages/admin/AdminInventoryPage.jsx, pages/admin/AdminInvoicesPage.jsx, pages/admin/AdminNotificationsPage.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminPartnerShopsPage.jsx, pages/admin/AdminPaymentsPage.jsx, pages/admin/AdminProductFormPage.jsx, pages/admin/AdminProductsPage.jsx, pages/admin/AdminReportsPage.jsx, pages/admin/AdminSettingsPage.jsx, pages/admin/AdminWhatsAppPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: AdminLayout, AdminBrandLink, AdminHomeLink, useNavigate, preventDefault, navigate
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: navigation
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/admin/AdminLayout.jsx/_index.md) for one report per statically identified named declaration in this source file.
