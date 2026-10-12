# Delivery flow

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | Customer checkout uses delivery selector/quote. Delivery role routes `/delivery`, `/delivery/assigned`, `/delivery/history`, `/delivery/profile`, `/delivery/:id` map to dashboard, assigned queue, history, profile, and detail pages, guarded as `DeliveryPartner`. Admin delivery operations live at `/admin/delivery`. |
| Handler/state | Checkout obtains options, location and a quote before order submit. Delivery pages load the current partner's assignments and call `updateAssignmentStatus`; admin delivery screen manages partner accounts, all assignments, and order assignment actions. |
| Service | `deliveryService.getDeliveryOptions`, `getDeliveryQuote`, `getPickupLocation`, `getMyAssignments`, `updateAssignmentStatus`; `useStoreConfig`, `useDeliveryAssignments`; admin service lists/creates delivery partners and assignments and assigns to orders. |
| HTTP contract | Public `GET /api/delivery/options`, `POST /api/delivery/quote`, `GET /api/locations/om-stationary`. Admin `GET/POST /api/delivery/management/partners`; `GET /api/delivery/management/assignments`. DeliveryPartner `GET /api/delivery/assignments`; `PATCH /api/delivery/assignments/{deliveryId}/status`. Order assignment: `POST /api/orders/{id}/delivery`. |
| Backend | `DeliveryController` validates config, city/PIN/coordinates, requested items, coupon and tax and delegates nearby shop selection. `DeliveryOperationsController` manages delivery partner and assignment records, scopes assignments to authenticated partner, and validates next delivery status; it synchronizes relevant order state and history. `OrdersController.AssignDelivery` links an order to a partner/name. |
| Data | `Delivery`, `DeliveryPartner`, `DeliveryStatusHistory` → `Deliveries`, `DeliveryPartners`, `DeliveryStatusHistory`; associated `Order`, `OrderItem`, `OrderStatusHistory`, `PartnerShop`, and `ShopProduct` → corresponding DbSets. |

## Response and error path

Options are config-derived. Quote may return a business-level `available:false` and reason (not an HTTP error) when no serviceable route/shop exists; malformed request is 400. Assignment status updates permit only listed transitions from current state, otherwise return 400 with detail; wrong/missing partner assignment returns 404. When delivery reaches Delivered/Failed/OutForDelivery, backend synchronizes order status and history; Delivered can create settlement. Admin assignment is a different operation from delivery partner state advancement.

## Tests and status

- **Tests:** `OrderStateMachineTests` does not test delivery-partner state transitions. `NotificationDeliveryTests` is unrelated. Delivery endpoint/UI test coverage is **NOT_MAPPED**.
- **Source status:** **Confirmed** from [App.jsx](../../../frontend/src/App.jsx), [RouteView.jsx](../../../frontend/src/RouteView.jsx), [deliveryService.js](../../../frontend/src/services/deliveryService.js), [useDelivery.js](../../../frontend/src/hooks/useDelivery.js), [DeliveryController.cs](../../../backend/OMStationary.Api/Controllers/DeliveryController.cs), [DeliveryOperationsController.cs](../../../backend/OMStationary.Api/Controllers/DeliveryOperationsController.cs), and [OmDbContext.cs](../../../backend/OMStationary.Api/Data/OmDbContext.cs).
- **Runtime status:** **Unverified.** No quote, partner assignment, device location, delivery-state update, or settlement was run against a live service/database.
