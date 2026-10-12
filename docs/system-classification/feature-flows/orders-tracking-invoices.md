# Order history, tracking, and invoice flow

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | `/orders` → `OrdersPage`; `/track/:id` → `TrackOrderPage`; `/order-success` → `OrderSuccessPage`; `/invoice/:id` → `InvoicePage`. |
| Handler/state | `useOrders` gets signed-in customer rows from `GET /api/customers/orders`; for guests it resolves device-stored recent order numbers with stored tracking tokens using the order lookup endpoint. `useOrderLookup` loads an order and handles 404/429. Tracking and success pages use the same lookup service. Invoice page loads invoice JSON and supports PDF download. |
| Service | `orderService.getCustomerOrders`, `getOrderByNumber`; `invoiceService.getInvoice`, `downloadInvoicePdf`; local tracking capability is stored/read by `utils/storage.js`. |
| HTTP contract | Customer-authenticated `GET /api/customers/orders`; `GET /api/orders/{orderNumber}` with optional `X-Tracking-Token`; `GET /api/orders/{orderNumber}/invoice`; `GET /api/orders/{orderNumber}/invoice/pdf`. Admin invoice list is separately `GET /api/admin/invoices`. |
| Backend | `CustomersController.Orders` selects the current user's order summary and status history. `OrdersController.Get(orderNumber)` checks order access then returns details/history. Invoice JSON and PDF actions use `InvoiceService` to render persisted invoice data. The access check accepts owner, admin, or valid tracking capability; inaccessible and absent orders are intentionally indistinguishable as 404. |
| Data | `Order`, `OrderItem`, `OrderStatusHistory` → `Orders`, `OrderItems`, `OrderStatusHistory`; invoice `Invoice` and `InvoiceLine` → `Invoices` and `InvoiceLines`; payment summary reads `Payments`. |

## Response and error path

Order creation returns an opaque order number and tracking token; the browser remembers both locally for this device. Signed-in list output is restricted by customer user ID. Track/detail output includes status, payment and fulfilment summary, line items, and chronological status history. Invoice 404 distinguishes missing order/access from an invoice not yet generated (the latter includes a descriptive response); PDF is returned from the backend renderer. Lookup 429 is translated into a rate-limit message by the hook; other failures display page-safe messages. A device-local recent-order list is not a server account-history replacement.

## Tests and status

- **Tests:** `OrderStateMachineTests` exercises state-machine helpers; no customer-order/history/invoice endpoint integration test was found (**route-level coverage: NOT_MAPPED**).
- **Source status:** **Confirmed** from [OrdersPage.jsx](../../../frontend/src/pages/customer/OrdersPage.jsx), [useOrders.js](../../../frontend/src/hooks/useOrders.js), [TrackOrderPage.jsx](../../../frontend/src/pages/customer/TrackOrderPage.jsx), [InvoicePage.jsx](../../../frontend/src/pages/customer/InvoicePage.jsx), [orderService.js](../../../frontend/src/services/orderService.js), [invoiceService.js](../../../frontend/src/services/invoiceService.js), [CustomersController.cs](../../../backend/OMStationary.Api/Controllers/CustomersController.cs), [OrdersController.cs](../../../backend/OMStationary.Api/Controllers/OrdersController.cs), and [InvoiceService.cs](../../../backend/OMStationary.Api/Services/InvoiceService.cs).
- **Runtime status:** **Unverified.** No order lookup, invoice generation, PDF response, capability-token validation, or live database data was exercised.
