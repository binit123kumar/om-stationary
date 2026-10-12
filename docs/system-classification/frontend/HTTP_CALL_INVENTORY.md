# Frontend HTTP call-site inventory

This static inventory lists fetch/apiFetch expressions from active JS/JSX/TS modules under frontend/src. Filename-marked historical snapshots and backups are excluded. Paths and methods are source expressions, not observed traffic; dynamic values remain unresolved. apiFetch applies app base URL and auth/refresh logic; see [api service report](../services/api.md). Runtime behavior, server responses, and backend mappings are NOT VERIFIED here.

**Call expressions found: 103.**

| Source | Line | Client | Source method expression | First-argument path expression |
|---|---:|---|---|---|
| [frontend/src/components/auth/LoginForm.jsx](../../../frontend/src/components/auth/LoginForm.jsx) | 72 | fetch | default GET (Fetch API unless options set indirectly) | `${apiBase}/api/cart` |
| [frontend/src/components/layout/AppShell.jsx](../../../frontend/src/components/layout/AppShell.jsx) | 31 | apiFetch | default GET (apiFetch forwards options) | '/api/wishlist' |
| [frontend/src/components/layout/AppShell.jsx](../../../frontend/src/components/layout/AppShell.jsx) | 57 | apiFetch | saving ? 'POST' : 'DELETE' | `/api/wishlist/${encodeURIComponent(id)}` |
| [frontend/src/components/layout/AppShell.jsx](../../../frontend/src/components/layout/AppShell.jsx) | 82 | apiFetch | default GET (apiFetch forwards options) | '/api/cart' |
| [frontend/src/components/layout/AppShell.jsx](../../../frontend/src/components/layout/AppShell.jsx) | 91 | apiFetch | 'PUT' | '/api/cart' |
| [frontend/src/components/layout/AppShell.jsx](../../../frontend/src/components/layout/AppShell.jsx) | 102 | apiFetch | 'POST' | '/api/auth/logout' |
| [frontend/src/hooks/useAuth.js](../../../frontend/src/hooks/useAuth.js) | 19 | fetch | 'POST' | `${import.meta.env.VITE_API_URL \|\| 'http://localhost:5000'}/api/auth/logout` |
| [frontend/src/hooks/useCart.js](../../../frontend/src/hooks/useCart.js) | 36 | apiFetch | 'PUT' | '/api/cart' |
| [frontend/src/hooks/useWishlist.js](../../../frontend/src/hooks/useWishlist.js) | 45 | apiFetch | saving ? 'POST' : 'DELETE' | '/api/wishlist/' + encodeURIComponent(id) |
| [frontend/src/pages/admin/AdminDashboardPage.jsx](../../../frontend/src/pages/admin/AdminDashboardPage.jsx) | 31 | fetch | default GET (Fetch API unless options set indirectly) | `${import.meta.env.VITE_API_URL \|\| 'http://localhost:5000'}/api/orders` |
| [frontend/src/pages/customer/AccountPage.jsx](../../../frontend/src/pages/customer/AccountPage.jsx) | 20 | apiFetch | default GET (apiFetch forwards options) | '/api/customers/me' |
| [frontend/src/pages/customer/AccountPage.jsx](../../../frontend/src/pages/customer/AccountPage.jsx) | 21 | apiFetch | default GET (apiFetch forwards options) | '/api/customers/addresses' |
| [frontend/src/pages/customer/AccountPage.jsx](../../../frontend/src/pages/customer/AccountPage.jsx) | 37 | apiFetch | 'PUT' | '/api/customers/me' |
| [frontend/src/pages/customer/AccountPage.jsx](../../../frontend/src/pages/customer/AccountPage.jsx) | 59 | apiFetch | 'POST' | '/api/customers/addresses' |
| [frontend/src/pages/customer/AccountPage.jsx](../../../frontend/src/pages/customer/AccountPage.jsx) | 76 | apiFetch | 'DELETE' | `/api/customers/addresses/${address.id}` |
| [frontend/src/pages/customer/CheckoutPage.jsx](../../../frontend/src/pages/customer/CheckoutPage.jsx) | 165 | apiFetch | 'POST' | '/api/delivery/quote' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 15 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/dashboard' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 20 | apiFetch | default GET (apiFetch forwards options) | `/api/admin/analytics?days=${days}` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 25 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/filter-options' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 33 | apiFetch | default GET (apiFetch forwards options) | `/api/admin/orders?${query.toString()}` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 42 | apiFetch | 'PATCH' | `/api/orders/${encodeURIComponent(id)}/status` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 51 | apiFetch | 'PATCH' | `/api/orders/${encodeURIComponent(id)}/payment` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 65 | apiFetch | 'POST' | `/api/orders/${encodeURIComponent(id)}/delivery` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 74 | apiFetch | 'POST' | `/api/orders/${encodeURIComponent(orderId)}/delivery` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 84 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/products?' + query.toString() |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 90 | apiFetch | 'POST' | '/api/admin/products' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 94 | apiFetch | 'PUT' | `/api/admin/products/${encodeURIComponent(id)}` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 98 | apiFetch | 'DELETE' | `/api/admin/products/${encodeURIComponent(id)}` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 102 | apiFetch | 'POST' | `/api/admin/products/${encodeURIComponent(id)}/stock` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 111 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/categories' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 117 | apiFetch | 'POST' | '/api/admin/categories' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 121 | apiFetch | 'PUT' | `/api/admin/categories/${encodeURIComponent(id)}` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 130 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/coupons' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 136 | apiFetch | 'POST' | '/api/coupons' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 140 | apiFetch | 'PUT' | `/api/admin/coupons/${encodeURIComponent(id)}` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 146 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/customers?' + query.toString() |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 153 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/payments?' + query.toString() |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 160 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/invoices?' + query.toString() |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 166 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/notifications' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 172 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/wishlist' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 177 | apiFetch | default GET (apiFetch forwards options) | `/api/admin/audit-log?take=${take}` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 187 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/reports?' + params.toString() |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 195 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/reports/export?' + params.toString() |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 200 | apiFetch | default GET (apiFetch forwards options) | '/api/admin/settings' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 206 | apiFetch | 'PUT' | '/api/admin/settings' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 211 | apiFetch | default GET (apiFetch forwards options) | '/api/partner/shops' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 217 | apiFetch | 'PUT' | `/api/partner/shops/${encodeURIComponent(id)}/approval` |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 226 | apiFetch | default GET (apiFetch forwards options) | '/api/delivery/management/partners' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 232 | apiFetch | 'POST' | '/api/delivery/management/partners' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 236 | apiFetch | default GET (apiFetch forwards options) | '/api/delivery/management/assignments' |
| [frontend/src/services/adminService.js](../../../frontend/src/services/adminService.js) | 243 | apiFetch | default GET (apiFetch forwards options) | `/api/admin/orders/${encodeURIComponent(id)}` |
| [frontend/src/services/api.js](../../../frontend/src/services/api.js) | 6 | apiFetch | default GET (apiFetch forwards options) | path |
| [frontend/src/services/api.js](../../../frontend/src/services/api.js) | 11 | fetch | default GET (Fetch API unless options set indirectly) | path.startsWith('http') ? path : `${import.meta.env.VITE_API_URL \|\| 'http://localhost:5000'}${path}` |
| [frontend/src/services/authService.js](../../../frontend/src/services/authService.js) | 6 | fetch | 'POST' | `${apiBase}/api/auth/login` |
| [frontend/src/services/authService.js](../../../frontend/src/services/authService.js) | 15 | fetch | 'POST' | `${apiBase}/api/auth/register` |
| [frontend/src/services/authService.js](../../../frontend/src/services/authService.js) | 25 | apiFetch | 'POST' | '/api/auth/logout' |
| [frontend/src/services/authService.js](../../../frontend/src/services/authService.js) | 33 | apiFetch | default GET (apiFetch forwards options) | '/api/auth/me' |
| [frontend/src/services/cartService.js](../../../frontend/src/services/cartService.js) | 6 | apiFetch | default GET (apiFetch forwards options) | '/api/cart' |
| [frontend/src/services/cartService.js](../../../frontend/src/services/cartService.js) | 12 | apiFetch | 'PUT' | '/api/cart' |
| [frontend/src/services/cartService.js](../../../frontend/src/services/cartService.js) | 20 | apiFetch | default GET (apiFetch forwards options) | '/api/cart' |
| [frontend/src/services/cartService.js](../../../frontend/src/services/cartService.js) | 27 | apiFetch | 'PUT' | '/api/cart' |
| [frontend/src/services/deliveryService.js](../../../frontend/src/services/deliveryService.js) | 5 | apiFetch | default GET (apiFetch forwards options) | '/api/delivery/options' |
| [frontend/src/services/deliveryService.js](../../../frontend/src/services/deliveryService.js) | 10 | apiFetch | 'POST' | '/api/delivery/quote' |
| [frontend/src/services/deliveryService.js](../../../frontend/src/services/deliveryService.js) | 19 | apiFetch | default GET (apiFetch forwards options) | '/api/locations/om-stationary' |
| [frontend/src/services/deliveryService.js](../../../frontend/src/services/deliveryService.js) | 27 | apiFetch | default GET (apiFetch forwards options) | '/api/delivery/assignments' |
| [frontend/src/services/deliveryService.js](../../../frontend/src/services/deliveryService.js) | 36 | apiFetch | 'PATCH' | `/api/delivery/assignments/${encodeURIComponent(id)}/status` |
| [frontend/src/services/invoiceService.js](../../../frontend/src/services/invoiceService.js) | 6 | apiFetch | default GET (apiFetch forwards options) | `/api/orders/${encodeURIComponent(orderNumber)}/invoice` |
| [frontend/src/services/invoiceService.js](../../../frontend/src/services/invoiceService.js) | 12 | apiFetch | default GET (apiFetch forwards options) | `/api/orders/${encodeURIComponent(orderNumber)}/invoice/pdf` |
| [frontend/src/services/notificationService.js](../../../frontend/src/services/notificationService.js) | 5 | apiFetch | default GET (apiFetch forwards options) | `/api/notifications?take=${take}` |
| [frontend/src/services/notificationService.js](../../../frontend/src/services/notificationService.js) | 11 | apiFetch | 'POST' | `/api/notifications/${encodeURIComponent(id)}/read` |
| [frontend/src/services/notificationService.js](../../../frontend/src/services/notificationService.js) | 15 | apiFetch | 'POST' | '/api/notifications/read-all' |
| [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js) | 6 | apiFetch | 'POST' | '/api/orders' |
| [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js) | 15 | apiFetch | default GET (apiFetch forwards options) | '/api/orders/' + encodeURIComponent(orderNumber) |
| [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js) | 21 | apiFetch | default GET (apiFetch forwards options) | '/api/customers/orders' |
| [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js) | 25 | apiFetch | default GET (apiFetch forwards options) | '/api/orders/status-workflow' |
| [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js) | 31 | apiFetch | default GET (apiFetch forwards options) | '/api/orders' |
| [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js) | 35 | apiFetch | 'PATCH' | `/api/orders/${encodeURIComponent(id)}/status` |
| [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js) | 43 | apiFetch | 'PATCH' | `/api/orders/${encodeURIComponent(id)}/payment` |
| [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js) | 51 | apiFetch | 'POST' | `/api/orders/${encodeURIComponent(id)}/delivery` |
| [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js) | 60 | apiFetch | 'POST' | '/api/coupons/validate' |
| [frontend/src/services/partnerService.js](../../../frontend/src/services/partnerService.js) | 5 | apiFetch | default GET (apiFetch forwards options) | '/api/partner/shop' |
| [frontend/src/services/partnerService.js](../../../frontend/src/services/partnerService.js) | 9 | apiFetch | 'PUT' | '/api/partner/shop' |
| [frontend/src/services/partnerService.js](../../../frontend/src/services/partnerService.js) | 17 | apiFetch | default GET (apiFetch forwards options) | '/api/partner/inventory' |
| [frontend/src/services/partnerService.js](../../../frontend/src/services/partnerService.js) | 22 | apiFetch | 'PUT' | '/api/partner/inventory' |
| [frontend/src/services/partnerService.js](../../../frontend/src/services/partnerService.js) | 30 | apiFetch | default GET (apiFetch forwards options) | '/api/partner/orders' |
| [frontend/src/services/partnerService.js](../../../frontend/src/services/partnerService.js) | 35 | apiFetch | 'PATCH' | `/api/partner/orders/${encodeURIComponent(id)}/status` |
| [frontend/src/services/partnerService.js](../../../frontend/src/services/partnerService.js) | 43 | apiFetch | 'POST' | '/api/partner/register' |
| [frontend/src/services/paymentService.js](../../../frontend/src/services/paymentService.js) | 6 | apiFetch | default GET (apiFetch forwards options) | '/api/payments/options' |
| [frontend/src/services/paymentService.js](../../../frontend/src/services/paymentService.js) | 11 | apiFetch | 'POST' | `/api/payments/orders/${encodeURIComponent(orderNumber)}/intent` |
| [frontend/src/services/paymentService.js](../../../frontend/src/services/paymentService.js) | 15 | apiFetch | 'POST' | `/api/payments/orders/${encodeURIComponent(orderNumber)}/status` |
| [frontend/src/services/productService.js](../../../frontend/src/services/productService.js) | 31 | apiFetch | default GET (apiFetch forwards options) | '/api/products' |
| [frontend/src/services/productService.js](../../../frontend/src/services/productService.js) | 45 | apiFetch | default GET (apiFetch forwards options) | '/api/products?' + params.toString() |
| [frontend/src/services/productService.js](../../../frontend/src/services/productService.js) | 55 | apiFetch | default GET (apiFetch forwards options) | '/api/products/' + encodeURIComponent(id) |
| [frontend/src/services/productService.js](../../../frontend/src/services/productService.js) | 62 | apiFetch | default GET (apiFetch forwards options) | '/api/categories' |
| [frontend/src/services/session.js](../../../frontend/src/services/session.js) | 25 | fetch | 'POST' | `${apiBase}/api/auth/refresh` |
| [frontend/src/services/whatsappService.js](../../../frontend/src/services/whatsappService.js) | 8 | apiFetch | default GET (apiFetch forwards options) | `/api/admin/whatsapp?${query.toString()}` |
| [frontend/src/services/whatsappService.js](../../../frontend/src/services/whatsappService.js) | 14 | apiFetch | 'PUT' | '/api/admin/whatsapp/settings' |
| [frontend/src/services/whatsappService.js](../../../frontend/src/services/whatsappService.js) | 24 | apiFetch | 'POST' | '/api/admin/whatsapp/test' |
| [frontend/src/services/whatsappService.js](../../../frontend/src/services/whatsappService.js) | 29 | apiFetch | 'POST' | `/api/admin/whatsapp/${encodeURIComponent(id)}/retry` |
| [frontend/src/services/wishlistService.js](../../../frontend/src/services/wishlistService.js) | 6 | apiFetch | default GET (apiFetch forwards options) | '/api/wishlist' |
| [frontend/src/services/wishlistService.js](../../../frontend/src/services/wishlistService.js) | 13 | apiFetch | 'POST' | '/api/wishlist/' + encodeURIComponent(productId) |
| [frontend/src/services/wishlistService.js](../../../frontend/src/services/wishlistService.js) | 17 | apiFetch | 'DELETE' | '/api/wishlist/' + encodeURIComponent(productId) |
| [frontend/src/services/wishlistService.js](../../../frontend/src/services/wishlistService.js) | 21 | apiFetch | 'POST' | '/api/wishlist/' + encodeURIComponent(productId) + '/move-to-cart' |

## Notes

- If a method is omitted on a Fetch API or apiFetch call, the static default is GET unless method/options are set indirectly; no runtime method is asserted.
- Service call expressions are repeated in [individual service reports](../services/).
- Endpoint/controller and database mappings are omitted unless independently source-verified; this inventory does not establish them.
