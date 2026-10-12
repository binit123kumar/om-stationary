# DeliveryDashboardPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/delivery/DeliveryDashboardPage.jsx](../../../frontend/src/pages/delivery/DeliveryDashboardPage.jsx)
- Route key(s): **delivery-home**
- Route declarations and guards: **/delivery** (DeliveryPartner)
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: DeliveryDashboardPage.
- RouteView dispatch branch: case 'delivery-home': return <DeliveryDashboardPage />;.

## Imported project modules

### components

- [DeliveryCard](../components/delivery/DeliveryCard.md) — source frontend/src/components/delivery/DeliveryCard.jsx.

### services

- No imports from this source area detected.

### hooks

- [useDeliveryAssignments](../hooks/useDelivery.md) — source frontend/src/hooks/useDelivery.js.

### utils

- No imports from this source area detected.

## Source observations

- Hook-call identifiers lexically invoked here: useDeliveryAssignments.
- Imported service functions whose names also appear as calls: none detected.
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
