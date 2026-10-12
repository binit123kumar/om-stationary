# Admin order operations

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | Admin routes `/admin/orders` and `/admin/orders/:id` resolve to `AdminOrdersPage` and `AdminOrderDetailPage`, guarded by `ProtectedRoute` role Admin. |
| Handler/state | The list page loads the paginated/filterable admin order queue; detail page loads an order and exposes status/payment/delivery actions. Service responses are inspected for HTTP failure and displayed in page state. |
| Service | `adminService.listAdminOrders`, `getAdminOrder`, `updateOrderStatus`, `confirmOrderPayment`, `assignDelivery` / `assignDeliveryPartner`. |
| HTTP contract | `GET /api/admin/orders?page=…`; `GET /api/admin/orders/{id}`; `GET /api/orders/status-workflow`; `PATCH /api/orders/{id}/status`; `PATCH /api/orders/{id}/payment`; `POST /api/orders/{id}/delivery`. The shared `OrdersController` checks Admin role for its order collection/workflow/mutations; `/api/admin/orders` routes are implemented by `AdminOrdersController`. |
| Backend | `AdminOrdersController` provides admin list/detail. `OrdersController` returns state-machine transitions; status PATCH rejects unsupported/illegal transitions, updates order/delivery history, writes audit event, may create settlement, and triggers customer/admin notifications. Payment PATCH is restricted to manual COD Paid confirmation. Delivery assignment attaches a delivery partner or a named carrier according to request. |
| Data | `Order`/`OrderItem`/`OrderStatusHistory` → `Orders`/`OrderItems`/`OrderStatusHistory`; assignment state → `Deliveries`/`DeliveryStatusHistory`; audit → `AuditLogs`; paid/delivery settlement paths may write `Payments`, `Refunds`, `Settlements`, and `Notifications`. |

## Response and error path

Order list/detail failures enter UI error state. A missing order is 404; unauthorized admin request returns 401/forbidden response. Illegal transition is 400 with the rejected source/destination states. Repeating the existing status is idempotent in `OrdersController.Status`. Refund-related states are documented in [payment-refund.md](payment-refund.md); status changes do not imply external refund execution. Notifications occur after persistence and cannot undo an order state change.

## Tests and status

- **Tests:** `OrderStateMachineTests` covers `NextStatuses` and transition constraints, including preventing skipped steps and cancellation after handover. Controller-route integration coverage was not found (**NOT_MAPPED**).
- **Source status:** **Confirmed** from [App.jsx](../../../frontend/src/App.jsx), [RouteView.jsx](../../../frontend/src/RouteView.jsx), [adminService.js](../../../frontend/src/services/adminService.js), [AdminCatalogueController.cs](../../../backend/OMStationary.Api/Controllers/AdminCatalogueController.cs), [OrdersController.cs](../../../backend/OMStationary.Api/Controllers/OrdersController.cs), and [OrderStateMachine.cs](../../../backend/OMStationary.Api/Services/OrderStateMachine.cs).
- **Runtime status:** **Unverified.** Unit tests do not establish live Admin authorization, persistence, delivery assignment, or notification delivery.
