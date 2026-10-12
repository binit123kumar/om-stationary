# TrackingTimeline.jsx

**Source:** `frontend/src/components/orders/TrackingTimeline.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** TrackingTimeline is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: { order, onOrderRefresh }
- React hooks/state APIs referenced: useState
- DOM/component event props and named event handlers found: onOrderRefresh, onClick
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: OrderStatusBadge, OrderSummary, CheckCircle2, OrderStatusTimeline

## Declarations and dependencies

- Exports: TrackingTimeline
- Named function-like declarations: TrackingTimeline, verify
- Direct local imports: verifyPayment -> services/paymentService.js; readTrackingToken -> utils/storage.js; OrderStatusBadge -> components/orders/OrderStatusBadge.jsx; OrderStatusTimeline -> components/orders/OrderStatusTimeline.jsx; OrderSummary -> components/orders/OrderSummary.jsx; formatDateTime -> utils/formatDate.js; paymentLabel -> utils/formatOrderStatus.js; rupees -> utils/formatCurrency.js
- Direct static consumers (impact): pages/customer/TrackOrderPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: TrackingTimeline, useState, String, toLowerCase, async, setVerifying, setPayState, verifyPayment, readTrackingToken, json, onOrderRefresh, map, rupees, Number, Payment, paymentLabel
- Error/control-flow markers: try/catch, finally
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/orders/TrackingTimeline.jsx/_index.md) for one report per statically identified named declaration in this source file.
