# paymentService service

## Source identity

- Source: [frontend/src/services/paymentService.js](../../../frontend/src/services/paymentService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: getPaymentOptions, createPaymentIntent, verifyPayment.
- Important function exports, signatures, and adjacent source comments:
- **getPaymentOptions()** — No directly preceding source comment.
- **createPaymentIntent(orderNumber)** — No directly preceding source comment.
- **verifyPayment(orderNumber, trackingToken = '')** — No directly preceding source comment.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/payments/options.
- POST via apiFetch; path expression: /api/payments/orders/${encodeURIComponent(orderNumber)}/intent.
- POST via apiFetch; path expression: /api/payments/orders/${encodeURIComponent(orderNumber)}/status.

## Local dependencies

- apiFetch from frontend/src/services/api.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
