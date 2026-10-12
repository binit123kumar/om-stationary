# PaymentPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/PaymentPage.jsx](../../../frontend/src/pages/customer/PaymentPage.jsx)
- Route key(s): **payment**
- Route declarations and guards: **/payment** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: PaymentPage.
- RouteView dispatch branch: case 'payment': return <PaymentPage />;.

## Imported project modules

### components

- [UpiPaymentPanel](../components/checkout/UpiPaymentPanel.md) — source frontend/src/components/checkout/UpiPaymentPanel.jsx.
- [OrderSummary](../components/checkout/OrderSummary.md) — source frontend/src/components/checkout/OrderSummary.jsx.

### services

- [getOrderByNumber](../services/orderService.md) — source frontend/src/services/orderService.js.
- [getPaymentOptions](../services/paymentService.md) — source frontend/src/services/paymentService.js.

### hooks

- No imports from this source area detected.

### utils

- readTrackingToken — source frontend/src/utils/storage.js.
- isPaid — source frontend/src/utils/formatOrderStatus.js.
- rupees — source frontend/src/utils/formatCurrency.js.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useEffect.
- Imported service functions whose names also appear as calls: [getOrderByNumber](../services/orderService.md), [getPaymentOptions](../services/paymentService.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
