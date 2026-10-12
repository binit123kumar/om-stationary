# deliveryService.js

**Source:** `frontend/src/services/deliveryService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** deliveryService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: /api/delivery/options, /api/delivery/quote, /api/locations/om-stationary, /api/delivery/assignments
- Explicit HTTP methods: POST, PATCH
- API client/import boundary: apiFetch -> services/api.js

## Declarations and dependencies

- Exports: getDeliveryOptions, getDeliveryQuote, getPickupLocation, getMyAssignments, updateAssignmentStatus
- Named function-like declarations: getDeliveryOptions, getDeliveryQuote, getPickupLocation, getMyAssignments, updateAssignmentStatus
- Direct local imports: apiFetch -> services/api.js
- Direct static consumers (impact): hooks/useDelivery.js, hooks/usePickupLocation.js

## Behavior, errors, security, and maintenance

- Statically observed calls: API, getDeliveryOptions, apiFetch, json, getDeliveryQuote, stringify, location, getPickupLocation, portal, getMyAssignments, Error, updateAssignmentStatus, encodeURIComponent
- Error/control-flow markers: throw
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/deliveryService.js/_index.md) for one report per statically identified named declaration in this source file.
