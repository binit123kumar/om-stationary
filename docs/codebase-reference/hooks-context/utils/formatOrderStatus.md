# formatOrderStatus.js

**Source:** `frontend/src/utils/formatOrderStatus.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** formatOrderStatus is a utility module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: paymentLabel, fulfillmentLabel, isPaid, nextStatusesFor, actionLabelFor, stockStateLabel
- Named function-like declarations: paymentLabel, fulfillmentLabel, isPaid, nextStatusesFor, actionLabelFor, stockStateLabel
- Direct local imports: None.
- Direct static consumers (impact): components/orders/TrackingTimeline.jsx, pages/admin/AdminOrderDetailPage.jsx, pages/admin/AdminProductsPage.jsx, pages/customer/InvoicePage.jsx, pages/customer/OrderSuccessPage.jsx, pages/customer/PaymentPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: machine, Payment, Shop, String, toLowerCase, isArray, Confirmed, Number
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/utils/formatOrderStatus.js/_index.md) for one report per statically identified named declaration in this source file.
