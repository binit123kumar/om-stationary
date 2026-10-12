# deliveryService service

## Source identity

- Source: [frontend/src/services/deliveryService.js](../../../frontend/src/services/deliveryService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: getDeliveryOptions, getDeliveryQuote, getPickupLocation, getMyAssignments, updateAssignmentStatus.
- Important function exports, signatures, and adjacent source comments:
- **getDeliveryOptions()** — No directly preceding source comment.
- **getDeliveryQuote(payload)** — No directly preceding source comment.
- **getPickupLocation()** — Store location (pickup station address, hours, map pins).
- **getMyAssignments()** — The signed-in delivery partner's own assignments. The Bearer token is attached automatically by apiFetch.
- **updateAssignmentStatus(id, status)** — Advance one assignment. The server only permits the next legal delivery states for the current status.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/delivery/options.
- POST via apiFetch; path expression: /api/delivery/quote.
- GET/DEFAULT via apiFetch; path expression: /api/locations/om-stationary.
- GET/DEFAULT via apiFetch; path expression: /api/delivery/assignments.
- PATCH via apiFetch; path expression: /api/delivery/assignments/${encodeURIComponent(id)}/status.

## Local dependencies

- apiFetch from frontend/src/services/api.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
