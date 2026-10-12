# TrackOrderPage

## Route and source identity

- Classification: active route-level page module dispatched by RouteView.
- Source: [frontend/src/pages/customer/TrackOrderPage.jsx](../../../frontend/src/pages/customer/TrackOrderPage.jsx)
- Route key(s): **track**
- Route declarations and guards: **/track/:id** (Public (no ProtectedRoute wrapper in declaration))
- Registration: [frontend/src/App.jsx](../../../frontend/src/App.jsx); dispatch: [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx).
- Named exports detected: TrackOrderPage.
- RouteView dispatch branch: case 'track': return <TrackOrderPage />;.

## Imported project modules

### components

- [OrderActions](../components/orders/OrderActions.md) — source frontend/src/components/orders/OrderActions.jsx.
- [TrackingTimeline](../components/orders/TrackingTimeline.md) — source frontend/src/components/orders/TrackingTimeline.jsx.
- [PickupStation](../components/layout/PickupStation.md) — source frontend/src/components/layout/PickupStation.jsx.

### services

- [getOrderByNumber](../services/orderService.md) — source frontend/src/services/orderService.js.

### hooks

- [useOrderLookup](../hooks/useOrders.md) — source frontend/src/hooks/useOrders.js.
- [usePickupLocation](../hooks/usePickupLocation.md) — source frontend/src/hooks/usePickupLocation.js.

### utils

- readTrackingToken — source frontend/src/utils/storage.js.

## Source observations

- Hook-call identifiers lexically invoked here: useParams, usePickupLocation, useOrderLookup, useEffect.
- Imported service functions whose names also appear as calls: [getOrderByNumber](../services/orderService.md).
- Literal /api/ strings present in this module: none found. Service-mediated HTTP call expressions are documented in their service reports.

## Verification boundary

Static source inspection only. This report does not assert a rendered/browser result, successful service response, authorization outcome, or database effect. No backend mapping is asserted here unless independently source-mapped elsewhere.
