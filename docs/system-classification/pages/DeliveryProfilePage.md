# DeliveryProfilePage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/delivery/DeliveryProfilePage.jsx](../../../frontend/src/pages/delivery/DeliveryProfilePage.jsx)
- Route key(s): **delivery-profile**
- Route declarations and guards: **/delivery/profile** (DeliveryPartner)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: DeliveryProfilePage.
- RouteView dispatch branch: case 'delivery-profile': return <DeliveryProfilePage />;.

## Imported project modules

### components

- No imports from this source area detected.

### services

- [getMe](../services/authService.md) — source frontend/src/services/authService.js.

### hooks

- No imports from this source area detected.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useState, useEffect.
- Imported service functions whose names also appear as calls: [getMe](../services/authService.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
