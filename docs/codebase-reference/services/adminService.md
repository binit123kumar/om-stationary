# adminService.js

**Source:** `frontend/src/services/adminService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** adminService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: /api/admin/dashboard, /api/admin/filter-options, /api/admin/products`, /api/admin/products, /api/admin/categories, /api/admin/coupons, /api/coupons, /api/admin/customers`, /api/admin/payments`, /api/admin/invoices`, /api/admin/notifications, /api/admin/wishlist, /api/admin/reports`, /api/admin/reports/export`, /api/admin/settings, /api/partner/shops, /api/delivery/management/partners, /api/delivery/management/assignments
- Explicit HTTP methods: PATCH, POST, PUT, DELETE
- API client/import boundary: apiFetch -> services/api.js

## Declarations and dependencies

- Exports: adminHeaders, getDashboard, getAnalytics, getFilterOptions, listAdminOrders, updateOrderStatus, confirmOrderPayment, assignDelivery, assignDeliveryPartner, listAdminProducts, createProduct, updateProduct, deactivateProduct, adjustStock, listAdminCategories, createCategory, updateCategory, listAdminCoupons, createCoupon, updateCoupon, listAdminCustomers, listAdminPayments, listAdminInvoices, getAdminNotifications, getAdminWishlistStats, getAuditLog, getReport, exportReport, getAdminSettings, saveAdminSettings, listPartnerShops, setPartnerShopApproval, listDeliveryPartners, createDeliveryPartner, listAllAssignments, getAdminOrder
- Named function-like declarations: adminHeaders, getDashboard, getAnalytics, getFilterOptions, listAdminOrders, updateOrderStatus, confirmOrderPayment, assignDelivery, assignDeliveryPartner, listAdminProducts, createProduct, updateProduct, deactivateProduct, adjustStock, listAdminCategories, createCategory, updateCategory, listAdminCoupons, createCoupon, updateCoupon, listAdminCustomers, listAdminPayments, listAdminInvoices, getAdminNotifications, getAdminWishlistStats, getAuditLog, getReport, exportReport, getAdminSettings, saveAdminSettings, listPartnerShops, setPartnerShopApproval, listDeliveryPartners, createDeliveryPartner, listAllAssignments, getAdminOrder
- Direct local imports: apiFetch -> services/api.js; ADMIN_PAGE_SIZE -> utils/constants.js
- Direct static consumers (impact): hooks/useAdmin.js, pages/admin/AdminAuditLogPage.jsx, pages/admin/AdminCategoriesPage.jsx, pages/admin/AdminCouponsPage.jsx, pages/admin/AdminCustomersPage.jsx, pages/admin/AdminDashboardPage.jsx, pages/admin/AdminDeliveryPage.jsx, pages/admin/AdminInventoryPage.jsx, pages/admin/AdminInvoicesPage.jsx, pages/admin/AdminNotificationsPage.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminOrdersPage.jsx, pages/admin/AdminPartnerShopsPage.jsx, pages/admin/AdminPaymentsPage.jsx, pages/admin/AdminProductFormPage.jsx, pages/admin/AdminProductsPage.jsx, pages/admin/AdminReportsPage.jsx, pages/admin/AdminSettingsPage.jsx, pages/admin/AdminWhatsAppPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: getDashboard, apiFetch, json, getAnalytics, getFilterOptions, management, listAdminOrders, URLSearchParams, toString, Error, updateOrderStatus, encodeURIComponent, stringify, confirmOrderPayment, id, assignDelivery, parseInt, isFinite, String, trim, assignDeliveryPartner, Number, listAdminProducts, createProduct
- Error/control-flow markers: throw
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/adminService.js/_index.md) for one report per statically identified named declaration in this source file.
