# api.js

**Source:** `frontend/src/services/api.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** api is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: No literal /api path in this file.
- Explicit HTTP methods: No method option literal detected; inspect listed exports for default GET or indirect behavior.
- API client/import boundary: refreshSession, readSession -> services/session.js

## Declarations and dependencies

- Exports: apiFetch, readFailure
- Named function-like declarations: apiFetch, send, readFailure
- Direct local imports: refreshSession, readSession -> services/session.js
- Direct static consumers (impact): components/checkout/CouponBox.jsx, components/checkout/UpiPaymentPanel.jsx, components/layout/AppShell.jsx, hooks/useAdmin.js, hooks/useCart.js, hooks/useOrders.js, hooks/useWishlist.js, pages/customer/AccountPage.jsx, pages/customer/CheckoutPage.jsx, services/adminService.js, services/authService.js, services/cartService.js, services/deliveryService.js, services/invoiceService.js, services/notificationService.js, services/orderService.js, services/partnerService.js, services/paymentService.js, services/productService.js, services/whatsappService.js, services/wishlistService.js

## Behavior, errors, security, and maintenance

- Statically observed calls: apiFetch, readSession, Headers, set, fetch, startsWith, send, refreshSession, readFailure, json, isArray, trim
- Error/control-flow markers: try/catch
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/api.js/_index.md) for one report per statically identified named declaration in this source file.
