# useDelivery.js

**Source:** `frontend/src/hooks/useDelivery.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** useDelivery is a React hook module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: useStoreConfig, useDeliveryAssignments
- Named function-like declarations: useStoreConfig, useDeliveryAssignments, reload, changeStatus
- Direct local imports: getDeliveryOptions -> services/deliveryService.js; getPickupLocation -> services/deliveryService.js; getPaymentOptions -> services/paymentService.js; getMyAssignments, updateAssignmentStatus -> services/deliveryService.js
- Direct static consumers (impact): pages/customer/CheckoutPage.jsx, pages/delivery/AssignedDeliveriesPage.jsx, pages/delivery/DeliveryDashboardPage.jsx, pages/delivery/DeliveryDetailPage.jsx, pages/delivery/DeliveryHistoryPage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: useStoreConfig, useState, useEffect, all, getDeliveryOptions, getPaymentOptions, getPickupLocation, then, setConfig, useDeliveryAssignments, async, getMyAssignments, setError, setAssignments, isArray, reload, updateAssignmentStatus
- Error/control-flow markers: try/catch
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/hooks/useDelivery.js/_index.md) for one report per statically identified named declaration in this source file.
