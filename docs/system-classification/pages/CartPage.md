# CartPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/CartPage.jsx](../../../frontend/src/pages/customer/CartPage.jsx)
- Route key(s): **cart**
- Route declarations and guards: **/cart** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: CartPage.
- RouteView dispatch branch: case 'cart': return <CartPage cart={state.cart} change={state.change} remove={state.remove} addN={state.addN} />;.

## Imported project modules

### components

- [CartList](../components/cart/CartList.md) — source frontend/src/components/cart/CartList.jsx.
- [CartSummary](../components/cart/CartSummary.md) — source frontend/src/components/cart/CartSummary.jsx.
- [EmptyCart](../components/cart/EmptyCart.md) — source frontend/src/components/cart/EmptyCart.jsx.

### services

- No imports from this source area detected.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: none found.
- Imported service functions whose names also appear as calls: none detected.
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
