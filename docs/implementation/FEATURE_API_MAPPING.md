# Feature API Mapping

## Overview

The app already separates route-level pages, hook logic and API clients by domain. This mapping captures the actual front-end and back-end boundaries visible in the repository.

| Feature | Frontend page/component | Hook/state module | Frontend service | Backend endpoint/controller | Related model/table | Validation and authorization | Test status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Auth and customer identity | `frontend/src/pages/customer/LoginPage.jsx`, `RegisterPage.jsx`, `AccountPage.jsx` | `frontend/src/hooks/useAuth.js` | `frontend/src/services/authService.js` | `backend/OMStationary.Api/Controllers/AuthController.cs`, `CustomersController.cs` | `User`, `Customer`, authentication/session state | Route protection via `ProtectedRoute`; request validation in API controllers | Backend unit tests cover core order state logic; no dedicated auth flow tests were found |
| Catalog and product browsing | `HomePage.jsx`, `ProductListingPage.jsx`, `ProductDetailPage.jsx` | `useProducts.js`, `useCatalog.js` | `productService.js` | `ProductsController.cs`, `CategoriesController.cs` | Product, Category entities | Product and category endpoints expected to validate IDs and stock state | Build-verified; browser-specific search interactions not automated |
| Wishlist | `WishlistPage.jsx`, `ProductWishlistButton.jsx` | `useWishlist.js` | `wishlistService.js` | `WishlistController.cs` | Wishlist entries | Customer ownership expected; not independently verified in automated tests | Not clearly covered by automated tests |
| Cart and pricing | `CartPage.jsx`, `CartList.jsx`, `CartSummary.jsx` | `useCart.js` | `cartService.js` | `CartController.cs` | Cart and pricing data | Client-side totals and server-side cart actions should be validated | Build-tested; server-side cart validation not separately automated |
| Checkout and order creation | `CheckoutPage.jsx`, `OrderSummary.jsx`, `AddressForm.jsx` | `useOrders.js` | `orderService.js` | `OrdersController.cs` | Order, address and status entities | Requires customer identity and order totals; status transitions are handled by domain logic | Backend order state machine tests exist |
| Payment | `PaymentPage.jsx`, `UpiPaymentPanel.jsx` | `useOrders.js` | `paymentService.js` | `PaymentsController.cs` | Payment transaction records | Payment verification should occur server-side; current repo contains provider abstractions but no live provider verification proof | Not verified against a real payment provider |
| Invoice and order history | `InvoicePage.jsx`, `OrdersPage.jsx`, `TrackOrderPage.jsx` | `useOrders.js` | `invoiceService.js`, `orderService.js` | `OrdersController.cs`, `PaymentsController.cs` | Order, invoice entities | Ownership checks needed for customer access; route protections are present | Build-ready; no live DB invoice export verification found |
| Admin catalogue management | `AdminProductsPage.jsx`, `AdminProductFormPage.jsx`, `AdminCategoriesPage.jsx` | `useAdmin.js` | `adminService.js` | `AdminCatalogueController.cs` | Product and category management tables | Admin-only access via route protection | Route and build verification present; no full admin CRUD automation found |
| Admin orders and payments | `AdminOrdersPage.jsx`, `AdminOrderDetailPage.jsx`, `AdminPaymentsPage.jsx` | `useAdmin.js`, `useOrders.js` | `adminService.js`, `orderService.js`, `paymentService.js` | `AdminController.cs`, `OrdersController.cs`, `PaymentsController.cs` | Orders, payments and audit data | Role restrictions and admin-only actions | Build and core backend tests passed |
| Inventory and low stock | `AdminInventoryPage.jsx`, `LowStockTable.jsx` | `useAdmin.js` | `adminService.js` | `AdminController.cs`, `ProductsController.cs` | Inventory records and stock alerts | Stock thresholds and validation are expected in business services | Build-verified; no live stock-monitoring test data captured |
| Notifications | `NotificationsPage.jsx`, `AdminNotificationsPage.jsx` | `useNotifications.js` | `notificationService.js` | `NotificationsController.cs` | Notification entities or logs | Customer/admin access boundaries expected | Not clearly covered by automated test suite |
| WhatsApp notifications | `AdminWhatsAppPage.jsx`, `WhatsAppSettingsForm.jsx`, `WhatsAppEventList.jsx` | `useAdmin.js` | `whatsappService.js` | `AdminWhatsAppController.cs` | Notification logs and configuration | Credentials should be environment-backed; provider abstraction exists | Integration with a real WhatsApp provider was not validated |
| Partner/shop operations | `PartnerDashboardPage.jsx`, `PartnerInventoryPage.jsx`, `PartnerProductsPage.jsx`, `PartnerOrdersPage.jsx` | `usePartner.js`, `useAdmin.js` | `partnerService.js` | `PartnerController.cs` | Partner, shop and inventory entities | Partner role restrictions required | Present in route registry; no explicit automated partner tests found |
| Delivery operations | `DeliveryDashboardPage.jsx`, `AssignedDeliveriesPage.jsx`, `DeliveryDetailPage.jsx` | `useDelivery.js` | `deliveryService.js` | `DeliveryController.cs`, `DeliveryOperationsController.cs` | Delivery assignment and status state | Delivery-only role restrictions required | Present in route registry; no explicit automated delivery tests found |

## Backend domain modules in use

- Controllers: `backend/OMStationary.Api/Controllers/*.cs`
- DTOs: `backend/OMStationary.Api/Dtos/*.cs`
- Data layer: `backend/OMStationary.Api/Data/*.cs`
- Services: `backend/OMStationary.Api/Services/*.cs`
- Data access and EF Core migrations: `backend/OMStationary.Api/Migrations/*.cs`

## Evidence summary

- Frontend build: `npm run build` passed in `frontend/`
- Backend tests: `dotnet test backend/OMStationary.Api.Tests/OMStationary.Api.Tests.csproj --nologo` passed with 14/14 test results
- No live database connection verification was recorded for the local SQL Server configuration in the repo at this time
- No live payment or WhatsApp provider validation was recorded in the repository