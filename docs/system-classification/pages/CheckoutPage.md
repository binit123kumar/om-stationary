# CheckoutPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/CheckoutPage.jsx](../../../frontend/src/pages/customer/CheckoutPage.jsx)
- Route key(s): **checkout**
- Route declarations and guards: **/checkout** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: CheckoutPage.
- RouteView dispatch branch: case 'checkout': return <CheckoutPage cart={state.cart} user={state.user} onCartCleared={state.clearCart} />;.

## Imported project modules

### components

- [AuthGate](../components/checkout/AuthGate.md) — source frontend/src/components/checkout/AuthGate.jsx.
- [AddressForm](../components/checkout/AddressForm.md) — source frontend/src/components/checkout/AddressForm.jsx.
- [CouponBox](../components/checkout/CouponBox.md) — source frontend/src/components/checkout/CouponBox.jsx.
- [CustomerDetailsForm](../components/checkout/CustomerDetailsForm.md) — source frontend/src/components/checkout/CustomerDetailsForm.jsx.
- [DeliveryMethodSelector](../components/checkout/DeliveryMethodSelector.md) — source frontend/src/components/checkout/DeliveryMethodSelector.jsx.
- [OrderSummary](../components/checkout/OrderSummary.md) — source frontend/src/components/checkout/OrderSummary.jsx.
- [PaymentMethodSelector](../components/checkout/PaymentMethodSelector.md) — source frontend/src/components/checkout/PaymentMethodSelector.jsx.
- [PlaceOrderButton](../components/checkout/PlaceOrderButton.md) — source frontend/src/components/checkout/PlaceOrderButton.jsx.

### services

- [apiFetch, readFailure](../services/api.md) — source frontend/src/services/api.js.
- [createOrder](../services/orderService.md) — source frontend/src/services/orderService.js.
- [readSession](../services/session.md) — source frontend/src/services/session.js.

### hooks

- [useStoreConfig](../hooks/useDelivery.md) — source frontend/src/hooks/useDelivery.js.

### utils

- rememberOrder — source frontend/src/utils/storage.js.
- formatSlot, toLocalInputValue, toMinutes — source frontend/src/utils/formatDate.js.
- rupees, rupeesShort — source frontend/src/utils/formatCurrency.js.
- validateCheckoutDetails — source frontend/src/utils/validation.js.

## Source observations

- Hook-call identifiers lexically invoked here: useNavigate, useStoreConfig, useState, useMemo, useEffect.
- Imported service functions whose names also appear as calls: [apiFetch](../services/api.md), [readFailure](../services/api.md), [createOrder](../services/orderService.md), [readSession](../services/session.md).
- Literal /api/ strings present in this module: /api/delivery/quote. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
