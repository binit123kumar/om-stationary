# session.js

**Source:** `frontend/src/services/session.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** session is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: No literal /api path in this file.
- Explicit HTTP methods: POST
- API client/import boundary: API_BASE -> utils/constants.js

## Declarations and dependencies

- Exports: readSession, saveSession, clearSession, mapServerCart, refreshSession
- Named function-like declarations: readSession, saveSession, clearSession, refreshSession, mapServerCart
- Direct local imports: API_BASE -> utils/constants.js
- Direct static consumers (impact): components/auth/LoginForm.jsx, components/layout/AppShell.jsx, components/layout/ProtectedRoute.jsx, hooks/useAdmin.js, hooks/useAuth.js, hooks/useCart.js, pages/admin/AdminAuditLogPage.jsx, pages/admin/AdminCategoriesPage.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminCustomersPage.jsx, pages/admin/AdminDashboardPage.jsx, pages/admin/AdminDeliveryPage.jsx, pages/admin/AdminInventoryPage.jsx, pages/admin/AdminInvoicesPage.jsx, pages/admin/AdminNotificationsPage.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminPartnerShopsPage.jsx, pages/admin/AdminPaymentsPage.jsx, pages/admin/AdminProductFormPage.jsx, pages/admin/AdminProductsPage.jsx, pages/admin/AdminReportsPage.jsx, pages/admin/AdminSettingsPage.jsx, pages/admin/AdminWhatsAppPage.jsx, pages/customer/CheckoutPage.jsx, pages/customer/NotificationsPage.jsx, services/api.js, services/authService.js, services/cartService.js

## Behavior, errors, security, and maintenance

- Statically observed calls: readSession, parse, getItem, saveSession, setItem, stringify, clearSession, removeItem, refreshSession, fetch, then, async, Error, json, finally, mapServerCart, map
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: network call, web storage
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/session.js/_index.md) for one report per statically identified named declaration in this source file.
