# Verified Function Call Maps

This map summarizes source-supported application flows. Route-to-page links come from `frontend/src/App.jsx` and `frontend/src/RouteView.jsx`; service/controller associations are verified from their imports, method calls and ASP.NET route attributes. Where a chain was not traced completely, the gap is called out rather than inferred.

## Application and role routing

`BrowserRouter / Routes` → `AppShell` → `Header`, `Outlet`, `FooterMap`, `PwaExperience`

`Route path` → optional `ProtectedRoute roles=[...]` → `RouteView(page=...)` → route-level page component

- Source: [`frontend/src/App.jsx`](../../frontend/src/App.jsx), [`frontend/src/RouteView.jsx`](../../frontend/src/RouteView.jsx), [`frontend/src/components/layout/AppShell.jsx`](../../frontend/src/components/layout/AppShell.jsx).
- `ProtectedRoute` is explicitly used for Admin, PartnerShop and DeliveryPartner paths. Public/customer routes are not wrapped in this role gate in the route registry; some page actions still require authentication.

## Login and registration

`/login` → `RouteView(page="login")` → `LoginPage(onAuth)` → `LoginForm` → `authService.login(...)` → shared `apiFetch(...)` → `POST /api/auth/login` → `AuthController.Login` → `OmDbContext.Users` lookup + password hash verification → `CreateSession` → token/session response → `onAuth` callback in `AppShell`.

`/register` → `RegisterPage` → `RegisterForm` → `authService.register(...)` → shared API client → `POST /api/auth/register` → `AuthController.Register` → password/identity validation → user/profile persistence → best-effort new-customer notification → `CreateSession`.

- Frontend source: [`LoginPage.jsx`](../../frontend/src/pages/customer/LoginPage.jsx), [`RegisterPage.jsx`](../../frontend/src/pages/customer/RegisterPage.jsx), [`LoginForm.jsx`](../../frontend/src/components/auth/LoginForm.jsx), [`RegisterForm.jsx`](../../frontend/src/components/auth/RegisterForm.jsx), [`authService.js`](../../frontend/src/services/authService.js), [`api.js`](../../frontend/src/services/api.js), [`session.js`](../../frontend/src/services/session.js).
- Backend source: [`AuthController.cs`](../../backend/OMStationary.Api/Controllers/AuthController.cs), [`Program.cs`](../../backend/OMStationary.Api/Program.cs).
- Exact downstream provider/database state is not runtime-verified; code uses EF Core context.

## Product loading and search

`HomePage` / `ProductListingPage` / `ProductDetailPage` → `useCatalog` or `useProducts` → product service/API client → `ProductsController` and/or `CategoriesController` → EF Core query.

- Verified route-to-page and import ownership: `RouteView` and page module imports.
- The precise per-page endpoint, query parameters and EF operation are documented in each page/service/controller report.
- The live API was not available during browser checks; product responses were not runtime-verified.

## Cart updates

Page/component quantity or add action → cart operations passed through `RouteView` from `AppShell` (`add`, `addN`, `change`, `remove`) → React cart state update → localStorage persistence; authenticated state additionally synchronizes through the cart API effect and `CartController`.

- Source: [`AppShell.jsx`](../../frontend/src/components/layout/AppShell.jsx), [`RouteView.jsx`](../../frontend/src/RouteView.jsx), [`CartPage.jsx`](../../frontend/src/pages/customer/CartPage.jsx), [`CartController.cs`](../../backend/OMStationary.Api/Controllers/CartController.cs).
- Background cart synchronization errors are not reported here as successful API operations; runtime API verification was blocked.

## Checkout and order creation

`CheckoutPage` → checkout validation/quote flow → `POST /api/delivery/quote` (delivery quote path) → user selects fulfilment/payment → `createOrder(...)` from order service → `POST /api/orders` → `OrdersController` → business services/EF persistence → navigate to payment or order-success flow.

- Sources: [`CheckoutPage.jsx`](../../frontend/src/pages/customer/CheckoutPage.jsx), [`orderService.js`](../../frontend/src/services/orderService.js), [`OrdersController.cs`](../../backend/OMStationary.Api/Controllers/OrdersController.cs), [`FulfillmentSelection.cs`](../../backend/OMStationary.Api/Services/FulfillmentSelection.cs), [`CouponService.cs`](../../backend/OMStationary.Api/Services/CouponService.cs), [`TaxCalculator.cs`](../../backend/OMStationary.Api/Services/TaxCalculator.cs).
- The checkout source states that stock, price, delivery charge and GST are re-verified by the API. Runtime database state and a real order were not tested.

## Payment status

`PaymentPage` / checkout payment selection → payment service → `PaymentsController` and configured payment provider abstraction → server-side verification/status response → page status.

- Sources: [`PaymentPage.jsx`](../../frontend/src/pages/customer/PaymentPage.jsx), [`paymentService.js`](../../frontend/src/services/paymentService.js), [`PaymentsController.cs`](../../backend/OMStationary.Api/Controllers/PaymentsController.cs), [`PaymentProviders.cs`](../../backend/OMStationary.Api/Services/PaymentProviders.cs), [`PaytmQrPaymentGateway.cs`](../../backend/OMStationary.Api/Services/PaytmQrPaymentGateway.cs).
- No live/sandbox payment verification was performed. Do not infer paid status or provider operation from UI return paths.

## Orders, tracking and invoice

`OrdersPage` / `TrackOrderPage` / `InvoicePage` → `orderService` / `invoiceService` → relevant order or invoice API request → `OrdersController` and `InvoiceService`/`OmDbContext` → response rendered in order timeline or invoice components.

- Sources: [`OrdersPage.jsx`](../../frontend/src/pages/customer/OrdersPage.jsx), [`TrackOrderPage.jsx`](../../frontend/src/pages/customer/TrackOrderPage.jsx), [`InvoicePage.jsx`](../../frontend/src/pages/customer/InvoicePage.jsx), [`orderService.js`](../../frontend/src/services/orderService.js), [`invoiceService.js`](../../frontend/src/services/invoiceService.js), [`OrdersController.cs`](../../backend/OMStationary.Api/Controllers/OrdersController.cs), [`InvoiceService.cs`](../../backend/OMStationary.Api/Services/InvoiceService.cs).
- Customer ownership behavior must be read from the specific controller action; database runtime state is unverified.

## Admin catalogue and orders

Protected `/admin/...` route → `ProtectedRoute(Admin)` → matching Admin page → `adminService` or domain service → admin/controller API action → EF persistence/query.

- Source areas: [`frontend/src/pages/admin/`](../../frontend/src/pages/admin/), [`frontend/src/services/adminService.js`](../../frontend/src/services/adminService.js), [`backend/OMStationary.Api/Controllers/`](../../backend/OMStationary.Api/Controllers/), [`backend/OMStationary.Api/Program.cs`](../../backend/OMStationary.Api/Program.cs).
- Specific methods/endpoints and role attributes are indexed in the corresponding page, service and controller reports.
- Authenticated admin UI and API requests were not verified in a live session.

## Inventory and low stock

Admin or partner inventory page → domain hook/service → product/admin or partner endpoint → controller → inventory/product data and stock alert services.

- Backend service source includes [`StockAlertService.cs`](../../backend/OMStationary.Api/Services/StockAlertService.cs); exact trigger points and recipients are documented in the backend class/method reports.
- No live stock mutation or alert dispatch was executed.

## Notifications and WhatsApp

UI event/settings → notification/WhatsApp frontend service → `NotificationsController` / `AdminWhatsAppController` → notification service and configured provider abstraction → delivery log/result.

- Sources: [`notificationService.js`](../../frontend/src/services/notificationService.js), [`whatsappService.js`](../../frontend/src/services/whatsappService.js), [`NotificationService.cs`](../../backend/OMStationary.Api/Services/NotificationService.cs), [`WhatsAppNotificationService.cs`](../../backend/OMStationary.Api/Services/WhatsAppNotificationService.cs).
- No real WhatsApp delivery was sent; provider credentials and external delivery were not verified.

## Partner and delivery workflows

Protected role-specific route → partner/delivery page → `usePartner` / `useDelivery` or service → `PartnerController`, `DeliveryController` or `DeliveryOperationsController` → role-checked operations and data access.

- Sources: [`frontend/src/pages/partner/`](../../frontend/src/pages/partner/), [`frontend/src/pages/delivery/`](../../frontend/src/pages/delivery/), [`partnerService.js`](../../frontend/src/services/partnerService.js), [`deliveryService.js`](../../frontend/src/services/deliveryService.js), [`PartnerController.cs`](../../backend/OMStationary.Api/Controllers/PartnerController.cs), [`DeliveryController.cs`](../../backend/OMStationary.Api/Controllers/DeliveryController.cs), [`DeliveryOperationsController.cs`](../../backend/OMStationary.Api/Controllers/DeliveryOperationsController.cs).
- Authenticated PartnerShop and DeliveryPartner flows were not run during documentation work.

## Verification status

- Static source chains: documented from route/component/service/controller source. Individual detailed reports identify the confirmed call points and any uncertain downstream relationship.
- API/database runtime: `NOT TESTED`; the local API endpoint was unavailable in the previous preview check.
- Automated test evidence: backend tests previously passed 14/14; the test reports identify covered behavior.
