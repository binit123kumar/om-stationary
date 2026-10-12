# orderService service

## Source identity

- Source: [frontend/src/services/orderService.js](../../../frontend/src/services/orderService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: createOrder, getOrderByNumber, getCustomerOrders, getStatusWorkflow, listAdminOrders, updateOrderStatus, confirmOrderPayment, assignDelivery, validateCoupon.
- Important function exports, signatures, and adjacent source comments:
- **createOrder(payload)** — Creates an order. The server re-verifies stock, price, delivery charge and GST.
- **getOrderByNumber(orderNumber, trackingToken = '')** — Public tracking lookup. The tracking token is issued when the order is placed.
- **getCustomerOrders()** — No directly preceding source comment.
- **getStatusWorkflow()** — No directly preceding source comment.
- **listAdminOrders(headers)** — Admin transitions.
- **updateOrderStatus(id, status, headers)** — No directly preceding source comment.
- **confirmOrderPayment(id, headers)** — No directly preceding source comment.
- **assignDelivery(id, partnerName, trackingCode, headers)** — No directly preceding source comment.
- **validateCoupon(code, items)** — Coupon validation happens against the real coupon table before an order is placed.

## HTTP call expressions detected
- POST via apiFetch; path expression: /api/orders.
- GET/DEFAULT via apiFetch; path expression: dynamic first argument: '/api/orders/' + encodeURIComponent(orderNumber).
- GET/DEFAULT via apiFetch; path expression: /api/customers/orders.
- GET/DEFAULT via apiFetch; path expression: /api/orders/status-workflow.
- GET/DEFAULT via apiFetch; path expression: /api/orders.
- PATCH via apiFetch; path expression: /api/orders/${encodeURIComponent(id)}/status.
- PATCH via apiFetch; path expression: /api/orders/${encodeURIComponent(id)}/payment.
- POST via apiFetch; path expression: /api/orders/${encodeURIComponent(id)}/delivery.
- POST via apiFetch; path expression: /api/coupons/validate.

## Local dependencies

- apiFetch from frontend/src/services/api.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
