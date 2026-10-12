# Cart, checkout, and order-creation flow

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | `/cart` renders `CartPage`; `/checkout` renders `CheckoutPage`. `RouteView` passes cart state and operations from `AppShell`. |
| Handler/state | `AppShell` keeps cart state and a localStorage `omcart` cache. Guests edit local state. Signed-in users load `GET /api/cart` and debounce replacement writes with `PUT /api/cart`. Checkout requires a signed-in user and a nonempty cart. It gathers fulfilment, customer/address/location, coupon, payment, and pickup-slot state; asks for a delivery quote when Delivery is selected; validates form fields; then calls `createOrder`. |
| Hook/service | `useStoreConfig` loads delivery, payment, and pickup-location options. Checkout uses `apiFetch`, `orderService.createOrder`, `rememberOrder`, and `readFailure`. CouponBox calls the coupon validation service; cart synchronization is also available through `cartService`. |
| HTTP contract | Signed-in cart: `GET /api/cart`, `PUT /api/cart`; supported backend item routes are `POST /api/cart/items`, `PUT /api/cart/items/{itemId}`, `DELETE /api/cart/items/{itemId}`, `DELETE /api/cart`, `POST /api/cart/merge`. Quote: `POST /api/delivery/quote`. Coupon check: `POST /api/coupons/validate`. Order creation: authenticated `POST /api/orders`. |
| Backend | `CartController` owns a customer cart and joins active `Products` for current item display/pricing. `DeliveryController.Quote` validates serviceability and delegates shop/stock selection to `FulfillmentSelectionService`, applying coupon and tax services. `OrdersController.Create` independently validates customer role, fulfilment/payment configuration, addresses, products, quantity, stock, price, delivery and coupon, then writes order records. |
| Data | Cart: `Cart`/`CartItem` → `Carts`/`CartItems`; products from `Products`. Creation writes `Order`, `OrderItem`, `OrderStatusHistory`, `Payment`, `Invoice`/`InvoiceLine`, optionally `Delivery`; it may also affect `ShopProduct`, `Coupon`, `Notifications`, `AuditLogs`, and low-stock notification state. Corresponding DbSets are declared in `OmDbContext`. |

## Response and error path

The quote may return `{available:false,reason}` for unsupported city/PIN, missing coordinates/configuration, unavailable products, or no fulfilling shop. Invalid item duplication/form values return 400; unavailable products may return 400/409 depending on action; missing auth returns 401 and non-customer role is forbidden. Invalid configuration can return 503. The order action returns 201 with the server-issued order number, tracking token, server totals, payment status, invoice number, and line items. The page stores the tracking token, clears cart state, then navigates to `/payment?order=…` for UPI or `/order-success?order=…` for COD. Network failure is shown as a service-unreachable error; no order-success route is taken on failure.

The browser subtotal/quote is display state only. The order endpoint recalculates/validates authoritative prices, inventory, tax, and fees before persistence; never treat a successful quote as an order or payment confirmation.

## Tests and status

- **Tests:** `OrderStateMachineTests` covers order transition rules, not the full checkout transaction. No `OrdersController.Create` integration test was found (**route-level test coverage: NOT_MAPPED**).
- **Source status:** **Confirmed** from [AppShell.jsx](../../../frontend/src/components/layout/AppShell.jsx), [CheckoutPage.jsx](../../../frontend/src/pages/customer/CheckoutPage.jsx), [cartService.js](../../../frontend/src/services/cartService.js), [orderService.js](../../../frontend/src/services/orderService.js), [deliveryService.js](../../../frontend/src/services/deliveryService.js), [OrdersController.cs](../../../backend/OMStationary.Api/Controllers/OrdersController.cs), [CartController.cs](../../../backend/OMStationary.Api/Controllers/CartController.cs), and [DeliveryController.cs](../../../backend/OMStationary.Api/Controllers/DeliveryController.cs).
- **Runtime status:** **Unverified.** No checkout, transaction, stock reservation, email/SMS, or persisted order was exercised for this report.
