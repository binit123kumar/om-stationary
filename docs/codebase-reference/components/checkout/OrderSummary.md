# OrderSummary.jsx

**Source:** `frontend/src/components/checkout/OrderSummary.jsx`  
**Classification:** Reusable component source

## Source-grounded summary

**Purpose:** OrderSummary is the reusable UI module in its source folder. The report records JSX composition, parameters, state, event-related identifiers, styles, and direct consumers.

## Props, state, events, and styles

- First named function-like declaration parameters: {
  items,
  subtotal,
  discount = 0,
  deliveryCharge = 0,
  taxRatePercent = 0,
  taxAmount = 0,
  grandTotal,
  payableLabel = 'Grand Total',
  showDelivery = true
}
- React hooks/state APIs referenced: None statically detected.
- DOM/component event props and named event handlers found: None detected.
- Stylesheet imports: No direct stylesheet imports.
- JSX component tags: None detected.

## Declarations and dependencies

- Exports: OrderSummary
- Named function-like declarations: OrderSummary
- Direct local imports: rupees -> utils/formatCurrency.js
- Direct static consumers (impact): pages/customer/CheckoutPage.jsx, pages/customer/OrderSuccessPage.jsx, pages/customer/PaymentPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: OrderSummary, map, rupees, Number, GST, toLocaleString
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/components/checkout/OrderSummary.jsx/_index.md) for one report per statically identified named declaration in this source file.
