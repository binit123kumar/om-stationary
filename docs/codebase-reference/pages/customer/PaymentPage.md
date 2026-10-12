# PaymentPage.jsx

**Source:** `frontend/src/pages/customer/PaymentPage.jsx`  
**Classification:** Routed page source
**Route classification:** /payment
**Shared shell:** App.jsx nests declared routes beneath AppShell and AppErrorBoundary; AppShell renders Header, main/Outlet, FooterMap, and PwaExperience.

## Source-grounded summary

**Purpose:** PaymentPage is the routed page component identified by its source declaration and route mapping above. Directly composed UI and imports are recorded below; no behavior is inferred beyond source.

## UI and composition

- JSX component tags: PackageCheck, Link, Banknote, UpiPaymentPanel, OrderSummary
- JSX text-region fragments (lexical; may include expressions): `Loading payment…`; `Payment`; `{error || 'This order could not be loaded.'}`; `Go to orders`; `Continue shopping`; `Payment verified`; `The OM Stationary service confirmed this payment. Your invoice is ready.`; `View invoice`; `Track order`; `Order {order.orderNumber}`

## Declarations and dependencies

- Exports: PaymentPage
- Named function-like declarations: PaymentPage, loadOrder
- Direct local imports: getOrderByNumber -> services/orderService.js; getPaymentOptions -> services/paymentService.js; UpiPaymentPanel -> components/checkout/UpiPaymentPanel.jsx; OrderSummary -> components/checkout/OrderSummary.jsx; readTrackingToken -> utils/storage.js; isPaid -> utils/formatOrderStatus.js; rupees -> utils/formatCurrency.js
- Direct static consumers (impact): RouteView.jsx

## Props, hooks, and API usage

- First named function-like declaration parameters: (none declared)
- React hooks/state APIs: useState, useEffect
- State bindings found in useState/useReducer pair destructuring: order, setOrder, options, setOptions, loading, setLoading, error, setError
- API path literals in this file: None; calls may be delegated to imported hooks/services.
- Direct imports that can carry data/API behavior: getOrderByNumber -> services/orderService.js; getPaymentOptions -> services/paymentService.js

## Behavior, errors, security, and maintenance

- Statically observed calls: step, PaymentPage, URLSearchParams, get, useState, async, setLoading, setError, getOrderByNumber, readTrackingToken, Error, setOrder, json, getPaymentOptions, setOptions, useEffect, loadOrder, verified, isPaid, encodeURIComponent, map, rupees
- Error/control-flow markers: try/catch, throw, finally
- Browser storage / network / navigation markers: navigation
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/pages/customer/PaymentPage.jsx/_index.md) for one report per statically identified named declaration in this source file.
