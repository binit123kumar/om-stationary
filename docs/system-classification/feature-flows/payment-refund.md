# Payment and refund flow

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | Checkout chooses COD or UPI; UPI orders navigate to `/payment`, which renders `PaymentPage` and `UpiPaymentPanel`. Admin payment review is `/admin/payments` → `AdminPaymentsPage`. |
| Handler/state | `PaymentPage` reads order number from query string, reads the saved tracking token, loads the persisted order and payment options, and uses API order/payment status rather than a client-computed amount. Admin manually confirms COD receipt through the order action. |
| Service | `paymentService.getPaymentOptions`, `createPaymentIntent`, and `verifyPayment`; `orderService.confirmOrderPayment`; `apiFetch` supplies auth/refresh behavior where applicable. |
| HTTP contract | `GET /api/payments/options`; `POST /api/payments/orders/{orderNumber}/intent`; `POST /api/payments/orders/{orderNumber}/status` (tracking token header supported); admin `PATCH /api/orders/{id}/payment`; admin payment list `GET /api/admin/payments`. |
| Backend | `PaymentsController.Options`, `CreateIntent`, and `CheckOrderStatus`. The current source explicitly reports `verificationAvailable=false`; intent constructs a UPI URI/QR data when configured and persists a Pending payment. `OrdersController.PaymentStatus` only permits an admin to mark COD Paid. Refund request/completion are order state transitions in `OrdersController.Status`, not a standalone refund endpoint. |
| Data | `Payment` → `Payments`; `Order` → `Orders`; `Refund` → `Refunds`; `Notification` → `Notifications`; optional invoice/payment references in `Invoices`. |

## Response, refund, and error path

UPI options report whether configuration enables UPI and the configured tax rate. Intent access is allowed to an authenticated Admin, the owning customer, or a holder of the order tracking token; missing order/access returns 404. Wrong payment method returns 400; missing/disabled UPI configuration returns 503; a missing payment row returns 409. Status returns current order/payment status with `verified:false` and explicitly says verification is not available: the source does not establish automatic UPI confirmation or settlement.

Admin COD confirmation accepts only a `Paid` transition on a COD order; it updates payment/order state and triggers notification logic. To request refund, admin transitions a paid order to `RefundPending`; backend inserts a `Refund` row with Pending status. A later transition to `Refunded` requires that pending row, marks it Refunded and updates order payment status. This is state bookkeeping in source; no external refund provider execution or separate refund API is mapped.

## Tests and status

- **Tests:** `OrderStateMachineTests` validates legal order transitions and confirms terminal states, but no payment-provider or refund-controller integration test was found. Payment/refund route test coverage is **NOT_MAPPED**.
- **Source status:** **Confirmed** from [PaymentPage.jsx](../../../frontend/src/pages/customer/PaymentPage.jsx), [paymentService.js](../../../frontend/src/services/paymentService.js), [orderService.js](../../../frontend/src/services/orderService.js), [PaymentsController.cs](../../../backend/OMStationary.Api/Controllers/PaymentsController.cs), and [OrdersController.cs](../../../backend/OMStationary.Api/Controllers/OrdersController.cs).
- **Runtime status:** **Unverified.** No live UPI provider, payment verification, COD reconciliation, refund transaction, or database write was tested. Source explicitly marks UPI verification unavailable.
