# adminService service

## Source identity

- Source: [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: adminHeaders, getDashboard, getAnalytics, getFilterOptions, listAdminOrders, updateOrderStatus, confirmOrderPayment, assignDelivery, assignDeliveryPartner, listAdminProducts, createProduct, updateProduct, deactivateProduct, adjustStock, listAdminCategories, createCategory, updateCategory, listAdminCoupons, createCoupon, updateCoupon, listAdminCustomers, listAdminPayments, listAdminInvoices, getAdminNotifications, getAdminWishlistStats, getAuditLog, getReport, exportReport, getAdminSettings, saveAdminSettings, listPartnerShops, setPartnerShopApproval, listDeliveryPartners, createDeliveryPartner, listAllAssignments, getAdminOrder.
- Important function exports, signatures, and adjacent source comments:
- **adminHeaders(session, legacyKey)** — No directly preceding source comment.
- **getDashboard(headers)** — No directly preceding source comment.
- **getAnalytics(headers, days = 14)** — No directly preceding source comment.
- **getFilterOptions(headers)** — No directly preceding source comment.
- **listAdminOrders(headers, params = {})** — Filtered, paged order list. Every filter maps to a real column.
- **updateOrderStatus(id, status, headers)** — Transition an order. The server validates the transition against the state machine and rejects anything illegal.
- **confirmOrderPayment(id, headers)** — Confirm a COD payment as cash received.
- **assignDelivery(id, partner, trackingCode = '', headers)** — Assign a delivery partner. Either a partner id (active, available) or a free-text partner name, plus an optional tracking code.
- **assignDeliveryPartner(orderId, deliveryPartnerId, trackingCode = '', headers)** — Assign using a real delivery partner ID from the administration API.
- **listAdminProducts(headers, params = {})** — No directly preceding source comment.
- **createProduct(product, headers)** — No directly preceding source comment.
- **updateProduct(id, product, headers)** — No directly preceding source comment.
- **deactivateProduct(id, headers)** — No directly preceding source comment.
- **adjustStock(id, delta, reason = '', headers)** — No directly preceding source comment.
- **listAdminCategories(headers)** — No directly preceding source comment.
- **createCategory(name, isActive, headers)** — No directly preceding source comment.
- **updateCategory(id, name, isActive, headers)** — No directly preceding source comment.
- **listAdminCoupons(headers)** — No directly preceding source comment.
- **createCoupon(coupon, headers)** — No directly preceding source comment.
- **updateCoupon(id, coupon, headers)** — No directly preceding source comment.
- **listAdminCustomers(headers, params = {})** — No directly preceding source comment.
- **listAdminPayments(headers, params = {})** — No directly preceding source comment.
- **listAdminInvoices(headers, params = {})** — No directly preceding source comment.
- **getAdminNotifications(headers)** — No directly preceding source comment.
- **getAdminWishlistStats(headers)** — No directly preceding source comment.
- **getAuditLog(headers, take = 100)** — No directly preceding source comment.
- **getReport(headers, from, to)** — No directly preceding source comment.
- **exportReport(headers, report, from, to)** — No directly preceding source comment.
- **getAdminSettings(headers)** — No directly preceding source comment.
- **saveAdminSettings(settings, headers)** — No directly preceding source comment.
- **listPartnerShops(headers)** — No directly preceding source comment.
- **setPartnerShopApproval(id, approved, headers)** — No directly preceding source comment.
- **listDeliveryPartners(headers)** — No directly preceding source comment.
- **createDeliveryPartner(partner, headers)** — No directly preceding source comment.
- **listAllAssignments(headers)** — No directly preceding source comment.
- **getAdminOrder(id, headers)** — No directly preceding source comment.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/admin/dashboard.
- GET/DEFAULT via apiFetch; path expression: /api/admin/analytics?days=${days}.
- GET/DEFAULT via apiFetch; path expression: /api/admin/filter-options.
- GET/DEFAULT via apiFetch; path expression: /api/admin/orders?${query.toString()}.
- PATCH via apiFetch; path expression: /api/orders/${encodeURIComponent(id)}/status.
- PATCH via apiFetch; path expression: /api/orders/${encodeURIComponent(id)}/payment.
- POST via apiFetch; path expression: /api/orders/${encodeURIComponent(id)}/delivery.
- POST via apiFetch; path expression: /api/orders/${encodeURIComponent(orderId)}/delivery.
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: '/api/admin/products?' + query.toString().
- POST via apiFetch; path expression: /api/admin/products.
- PUT via apiFetch; path expression: /api/admin/products/${encodeURIComponent(id)}.
- DELETE via apiFetch; path expression: /api/admin/products/${encodeURIComponent(id)}.
- POST via apiFetch; path expression: /api/admin/products/${encodeURIComponent(id)}/stock.
- GET/DEFAULT via apiFetch; path expression: /api/admin/categories.
- POST via apiFetch; path expression: /api/admin/categories.
- PUT via apiFetch; path expression: /api/admin/categories/${encodeURIComponent(id)}.
- GET/DEFAULT via apiFetch; path expression: /api/admin/coupons.
- POST via apiFetch; path expression: /api/coupons.
- PUT via apiFetch; path expression: /api/admin/coupons/${encodeURIComponent(id)}.
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: '/api/admin/customers?' + query.toString().
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: '/api/admin/payments?' + query.toString().
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: '/api/admin/invoices?' + query.toString().
- GET/DEFAULT via apiFetch; path expression: /api/admin/notifications.
- GET/DEFAULT via apiFetch; path expression: /api/admin/wishlist.
- GET/DEFAULT via apiFetch; path expression: /api/admin/audit-log?take=${take}.
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: '/api/admin/reports?' + params.toString().
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: '/api/admin/reports/export?' + params.toString().
- GET/DEFAULT via apiFetch; path expression: /api/admin/settings.
- PUT via apiFetch; path expression: /api/admin/settings.
- GET/DEFAULT via apiFetch; path expression: /api/partner/shops.
- PUT via apiFetch; path expression: /api/partner/shops/${encodeURIComponent(id)}/approval.
- GET/DEFAULT via apiFetch; path expression: /api/delivery/management/partners.
- POST via apiFetch; path expression: /api/delivery/management/partners.
- GET/DEFAULT via apiFetch; path expression: /api/delivery/management/assignments.
- GET/DEFAULT via apiFetch; path expression: /api/admin/orders/${encodeURIComponent(id)}.

## Local dependencies

- apiFetch from frontend/src/services/api.js.
- ADMIN_PAGE_SIZE from frontend/src/utils/constants.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
