# orderService.js

**Source:** `frontend/src/services/orderService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** orderService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: /api/orders, /api/orders/, /api/customers/orders, /api/orders/status-workflow, /api/coupons/validate
- Explicit HTTP methods: POST, PATCH
- API client/import boundary: apiFetch -> services/api.js

## Declarations and dependencies

- Exports: createOrder, getOrderByNumber, getCustomerOrders, getStatusWorkflow, listAdminOrders, updateOrderStatus, confirmOrderPayment, assignDelivery, validateCoupon
- Named function-like declarations: createOrder, getOrderByNumber, getCustomerOrders, getStatusWorkflow, listAdminOrders, updateOrderStatus, confirmOrderPayment, assignDelivery, validateCoupon
- Direct local imports: apiFetch -> services/api.js
- Direct static consumers (impact): components/checkout/CouponBox.jsx, hooks/useOrders.js, pages/customer/CheckoutPage.jsx, pages/customer/OrderSuccessPage.jsx, pages/customer/PaymentPage.jsx, pages/customer/TrackOrderPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: createOrder, apiFetch, stringify, getOrderByNumber, encodeURIComponent, getCustomerOrders, getStatusWorkflow, json, listAdminOrders, updateOrderStatus, confirmOrderPayment, assignDelivery, validateCoupon
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/orderService.js/_index.md) for one report per statically identified named declaration in this source file.
