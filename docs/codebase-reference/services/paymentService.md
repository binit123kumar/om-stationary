# paymentService.js

**Source:** `frontend/src/services/paymentService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** paymentService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: /api/payments/options
- Explicit HTTP methods: POST
- API client/import boundary: apiFetch -> services/api.js

## Declarations and dependencies

- Exports: getPaymentOptions, createPaymentIntent, verifyPayment
- Named function-like declarations: getPaymentOptions, createPaymentIntent, verifyPayment
- Direct local imports: apiFetch -> services/api.js
- Direct static consumers (impact): components/checkout/UpiPaymentPanel.jsx, components/orders/TrackingTimeline.jsx, hooks/useDelivery.js, pages/customer/PaymentPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: getPaymentOptions, apiFetch, json, createPaymentIntent, encodeURIComponent, verifyPayment
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/paymentService.js/_index.md) for one report per statically identified named declaration in this source file.
