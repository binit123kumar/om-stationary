# OM Stationary Modularization Inventory

## Executive assessment

The repository already reflects a modular architecture in both the frontend and backend. The source-of-truth inventory below documents the current state rather than proposing a wholesale rewrite. The project is aligned to the requested modular structure with page files, reusable components, services and backend domain modules separated by responsibility.

## Route inventory

| Route | Page key | Source file | Delegation | Phase |
| --- | --- | --- | --- | --- |
| `/` | `home` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/search` | `search` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/product/:id` | `product` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/cart` | `cart` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/wishlist` | `wishlist` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/checkout` | `checkout` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/payment` | `payment` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/order-success` | `order-success` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/invoice/:id` | `invoice` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/orders` | `orders` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/track/:id` | `track` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/login` | `login` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/register` | `register` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/account` | `account` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/notifications` | `notifications` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/about` | `about` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/contact` | `contact` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/help` | `help` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/privacy` | `privacy` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/terms` | `terms` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/refund-policy` | `refund` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `*` | `home` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin` | `admin-home` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/orders` | `admin-orders` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/orders/:id` | `admin-order` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/products` | `admin-products` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/products/new` | `admin-product-form` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/products/:id/edit` | `admin-product-form` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/categories` | `admin-categories` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/inventory` | `admin-inventory` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/customers` | `admin-customers` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/payments` | `admin-payments` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/coupons` | `admin-coupons` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/delivery` | `admin-delivery` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/invoices` | `admin-invoices` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/partners` | `admin-partners` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/reports` | `admin-reports` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/notifications` | `admin-notifications` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/whatsapp` | `admin-whatsapp` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/settings` | `admin-settings` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/admin/audit-log` | `admin-audit` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/partner` | `partner-home` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/partner/inventory` | `partner-inventory` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/partner/orders` | `partner-orders` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/partner/profile` | `partner-profile` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/partner/products` | `partner-products` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/partner/orders/:id` | `partner-order` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/delivery` | `delivery-home` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/delivery/assigned` | `delivery-assigned` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/delivery/history` | `delivery-history` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/delivery/profile` | `delivery-profile` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |
| `/delivery/:id` | `delivery-detail` | `frontend\src\App.jsx` | `RouteView` + `ProtectedRoute` | Phase B-L |

## Frontend page inventory

| Page file | Proposed destination | Dependencies | Refactoring phase |
| --- | --- | --- | --- |
| `pages\admin\AdminAuditLogPage.jsx` | `pages\admin\AdminAuditLogPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminCategoriesPage.jsx` | `pages\admin\AdminCategoriesPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminCouponsPage.jsx` | `pages\admin\AdminCouponsPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminCustomersPage.jsx` | `pages\admin\AdminCustomersPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminDashboardPage.jsx` | `pages\admin\AdminDashboardPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminDeliveryPage.jsx` | `pages\admin\AdminDeliveryPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminInventoryPage.jsx` | `pages\admin\AdminInventoryPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminInvoicesPage.jsx` | `pages\admin\AdminInvoicesPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminNotificationsPage.jsx` | `pages\admin\AdminNotificationsPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminOrderDetailPage.jsx` | `pages\admin\AdminOrderDetailPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminOrdersPage.jsx` | `pages\admin\AdminOrdersPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminPartnerShopsPage.jsx` | `pages\admin\AdminPartnerShopsPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminPaymentsPage.jsx` | `pages\admin\AdminPaymentsPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminProductFormPage.jsx` | `pages\admin\AdminProductFormPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminProductsPage.jsx` | `pages\admin\AdminProductsPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminReportsPage.jsx` | `pages\admin\AdminReportsPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminSettingsPage.jsx` | `pages\admin\AdminSettingsPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\admin\AdminWhatsAppPage.jsx` | `pages\admin\AdminWhatsAppPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\customer\AboutPage.jsx` | `pages\customer\AboutPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\AccountPage.jsx` | `pages\customer\AccountPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\CartPage.jsx` | `pages\customer\CartPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\CheckoutPage.jsx` | `pages\customer\CheckoutPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\ContactPage.jsx` | `pages\customer\ContactPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\HelpPage.jsx` | `pages\customer\HelpPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\HomePage.jsx` | `pages\customer\HomePage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\InvoicePage.jsx` | `pages\customer\InvoicePage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\LegalContent.jsx` | `pages\customer\LegalContent.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\LegalPages.jsx` | `pages\customer\LegalPages.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\LoginPage.jsx` | `pages\customer\LoginPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\NotificationsPage.jsx` | `pages\customer\NotificationsPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\OrderSuccessPage.jsx` | `pages\customer\OrderSuccessPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\OrdersPage.jsx` | `pages\customer\OrdersPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\PaymentPage.jsx` | `pages\customer\PaymentPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\PrivacyPage.jsx` | `pages\customer\PrivacyPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\ProductDetailPage.jsx` | `pages\customer\ProductDetailPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\ProductListingPage.jsx` | `pages\customer\ProductListingPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\RefundPolicyPage.jsx` | `pages\customer\RefundPolicyPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\RegisterPage.jsx` | `pages\customer\RegisterPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\TermsPage.jsx` | `pages\customer\TermsPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\TrackOrderPage.jsx` | `pages\customer\TrackOrderPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\WishlistPage.jsx` | `pages\customer\WishlistPage.jsx` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\customer\content.js` | `pages\customer\content.js` | RouteView + AppShell + feature hook/service | Phase I |
| `pages\delivery\AssignedDeliveriesPage.jsx` | `pages\delivery\AssignedDeliveriesPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\delivery\DeliveryDashboardPage.jsx` | `pages\delivery\DeliveryDashboardPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\delivery\DeliveryDetailPage.jsx` | `pages\delivery\DeliveryDetailPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\delivery\DeliveryHistoryPage.jsx` | `pages\delivery\DeliveryHistoryPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\delivery\DeliveryProfilePage.jsx` | `pages\delivery\DeliveryProfilePage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\partner\PartnerDashboardPage.jsx` | `pages\partner\PartnerDashboardPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\partner\PartnerInventoryPage.jsx` | `pages\partner\PartnerInventoryPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\partner\PartnerOrderDetailPage.jsx` | `pages\partner\PartnerOrderDetailPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\partner\PartnerOrdersPage.jsx` | `pages\partner\PartnerOrdersPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\partner\PartnerProductsPage.jsx` | `pages\partner\PartnerProductsPage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |
| `pages\partner\PartnerProfilePage.jsx` | `pages\partner\PartnerProfilePage.jsx` | RouteView + AppShell + admin/partner/delivery state | Phase I |

## Component inventory

### 
- `components\account\AccountSidebar.jsx`
- `components\account\AccountStats.jsx`
- `components\account\AddressCard.jsx`
- `components\account\AddressForm.jsx`
- `components\account\AddressList.jsx`
- `components\account\ProfileCard.jsx`
- `components\account\ProfileForm.jsx`
- `components\account\RecentOrders.jsx`
- `components\admin\AdminChartCard.jsx`
- `components\admin\AdminConfirmDialog.jsx`
- `components\admin\AdminDataTable.jsx`
- `components\admin\AdminHeader.jsx`
- `components\admin\AdminKpiCard.jsx`
- `components\admin\AdminLayout.jsx`
- `components\admin\AdminModal.jsx`
- `components\admin\AdminSidebar.jsx`
- `components\admin\AdminSignIn.jsx`
- `components\admin\AdminToast.jsx`
- `components\admin\LowStockTable.jsx`
- `components\admin\OrderStatusChart.jsx`
- `components\admin\RecentOrdersTable.jsx`
- `components\admin\SalesChart.jsx`
- `components\admin\TopProductsTable.jsx`
- `components\auth\AuthError.jsx`
- `components\auth\AuthSuccessModal.jsx`
- `components\auth\ForgotPassword.jsx`
- `components\auth\LoginForm.jsx`
- `components\auth\PasswordField.jsx`
- `components\auth\RegisterForm.jsx`
- `components\auth\RememberMe.jsx`
- `components\cart\CartBadge.jsx`
- `components\cart\CartItem.jsx`
- `components\cart\CartList.jsx`
- `components\cart\CartQuantityControl.jsx`
- `components\cart\CartSummary.jsx`
- `components\cart\CartTotals.jsx`
- `components\cart\EmptyCart.jsx`
- `components\checkout\AddressForm.jsx`
- `components\checkout\AuthGate.jsx`
- `components\checkout\CodConfirmation.jsx`
- `components\checkout\CouponBox.jsx`
- `components\checkout\CustomerDetailsForm.jsx`
- `components\checkout\DeliveryMethodSelector.jsx`
- `components\checkout\DeliveryQuote.jsx`
- `components\checkout\OrderSummary.jsx`
- `components\checkout\PaymentMethodSelector.jsx`
- `components\checkout\PlaceOrderButton.jsx`
- `components\checkout\UpiPaymentPanel.jsx`
- `components\common\Badge.jsx`
- `components\common\Button.jsx`
- `components\common\Card.jsx`
- `components\common\Checkbox.jsx`
- `components\common\ConfirmDialog.jsx`
- `components\common\EmptyState.jsx`
- `components\common\ErrorState.jsx`
- `components\common\IconButton.jsx`
- `components\common\Input.jsx`
- `components\common\Loader.jsx`
- `components\common\Modal.jsx`
- `components\common\Pagination.jsx`
- `components\common\Radio.jsx`
- `components\common\SearchBar.jsx`
- `components\common\Select.jsx`
- `components\common\Skeleton.jsx`
- `components\common\Tabs.jsx`
- `components\common\Toast.jsx`
- `components\delivery\DeliveryCard.jsx`
- `components\delivery\DeliveryStatusActions.jsx`
- `components\invoice\InvoiceActions.jsx`
- `components\invoice\InvoiceBusinessInfo.jsx`
- `components\invoice\InvoiceCustomerInfo.jsx`
- `components\invoice\InvoiceFooter.jsx`
- `components\invoice\InvoiceHeader.jsx`
- `components\invoice\InvoiceItemsTable.jsx`
- `components\invoice\InvoiceTotals.jsx`
- `components\layout\AdminRoute.jsx`
- `components\layout\AppShell.jsx`
- `components\layout\Breadcrumbs.jsx`
- `components\layout\Footer.jsx`
- `components\layout\FooterMap.jsx`
- `components\layout\Header.jsx`
- `components\layout\MobileNav.jsx`
- `components\layout\PageContainer.jsx`
- `components\layout\PickupStation.jsx`
- `components\layout\ProtectedRoute.jsx`
- `components\layout\RoleRoute.jsx`
- `components\layout\TopNav.jsx`
- `components\notifications\NotificationBadge.jsx`
- `components\notifications\NotificationList.jsx`
- `components\orders\OrderActions.jsx`
- `components\orders\OrderCard.jsx`
- `components\orders\OrderFilters.jsx`
- `components\orders\OrderList.jsx`
- `components\orders\OrderStatusBadge.jsx`
- `components\orders\OrderStatusTimeline.jsx`
- `components\orders\OrderSummary.jsx`
- `components\orders\TrackingTimeline.jsx`
- `components\partner\PartnerInventoryForm.jsx`
- `components\partner\PartnerOrderCard.jsx`
- `components\products\BrandFilter.jsx`
- `components\products\CategoryFilter.jsx`
- `components\products\PriceFilter.jsx`
- `components\products\ProductCard.jsx`
- `components\products\ProductFilters.jsx`
- `components\products\ProductGallery.jsx`
- `components\products\ProductGrid.jsx`
- `components\products\ProductImage.jsx`
- `components\products\ProductInfo.jsx`
- `components\products\ProductPrice.jsx`
- `components\products\ProductQuantity.jsx`
- `components\products\ProductSearch.jsx`
- `components\products\ProductStock.jsx`
- `components\products\ProductTabs.jsx`
- `components\products\ProductWishlistButton.jsx`
- `components\products\SortControl.jsx`
- `components\whatsapp\WhatsAppEventList.jsx`
- `components\whatsapp\WhatsAppLogsTable.jsx`
- `components\whatsapp\WhatsAppRetryButton.jsx`
- `components\whatsapp\WhatsAppSettingsForm.jsx`
- `components\whatsapp\WhatsAppStatus.jsx`
- `components\whatsapp\WhatsAppTestButton.jsx`

## Hooks and API service inventory

### Hooks
- `hooks\useAdmin.js`
- `hooks\useAuth.js`
- `hooks\useCart.js`
- `hooks\useCatalog.js`
- `hooks\useCategories.js`
- `hooks\useDelivery.js`
- `hooks\useNotifications.js`
- `hooks\useOrders.js`
- `hooks\usePartner.js`
- `hooks\usePickupLocation.js`
- `hooks\useProducts.js`
- `hooks\useWishlist.js`

### Services
- `services\adminService.js`
- `services\api.js`
- `services\authService.js`
- `services\cartService.js`
- `services\deliveryService.js`
- `services\invoiceService.js`
- `services\notificationService.js`
- `services\orderService.js`
- `services\partnerService.js`
- `services\paymentService.js`
- `services\productService.js`
- `services\session.js`
- `services\whatsappService.js`
- `services\wishlistService.js`

### Utilities
- `utils\config.js`
- `utils\constants.js`
- `utils\formatCurrency.js`
- `utils\formatDate.js`
- `utils\formatOrderStatus.js`
- `utils\storage.js`
- `utils\validation.js`

## Backend inventory

### Controllers\AdminCatalogueController.cs
- `Controllers\AdminCatalogueController.cs`

### Controllers\AdminController.cs
- `Controllers\AdminController.cs`

### Controllers\AdminReportsController.cs
- `Controllers\AdminReportsController.cs`

### Controllers\AdminSettingsController.cs
- `Controllers\AdminSettingsController.cs`

### Controllers\AdminWhatsAppController.cs
- `Controllers\AdminWhatsAppController.cs`

### Controllers\AuthController.cs
- `Controllers\AuthController.cs`

### Controllers\CartController.cs
- `Controllers\CartController.cs`

### Controllers\CategoriesController.cs
- `Controllers\CategoriesController.cs`

### Controllers\CouponsController.cs
- `Controllers\CouponsController.cs`

### Controllers\CustomersController.cs
- `Controllers\CustomersController.cs`

### Controllers\DeliveryController.cs
- `Controllers\DeliveryController.cs`

### Controllers\DeliveryOperationsController.cs
- `Controllers\DeliveryOperationsController.cs`

### Controllers\LocationsController.cs
- `Controllers\LocationsController.cs`

### Controllers\NotificationsController.cs
- `Controllers\NotificationsController.cs`

### Controllers\OrdersController.cs
- `Controllers\OrdersController.cs`

### Controllers\PartnerController.cs
- `Controllers\PartnerController.cs`

### Controllers\PaymentsController.cs
- `Controllers\PaymentsController.cs`

### Controllers\ProductsController.cs
- `Controllers\ProductsController.cs`

### Controllers\WishlistController.cs
- `Controllers\WishlistController.cs`

### Data\OmDbContext.cs
- `Data\OmDbContext.cs`

### Data\OmDbContextFactory.cs
- `Data\OmDbContextFactory.cs`

### Data\SafeMigrationBootstrap.cs
- `Data\SafeMigrationBootstrap.cs`

### Dtos\AuthRequests.cs
- `Dtos\AuthRequests.cs`

### Dtos\CatalogRequests.cs
- `Dtos\CatalogRequests.cs`

### Dtos\OrderRequests.cs
- `Dtos\OrderRequests.cs`

### Migrations\20260929022303_InitialMvpSchema.Designer.cs
- `Migrations\20260929022303_InitialMvpSchema.Designer.cs`

### Migrations\20260929022303_InitialMvpSchema.cs
- `Migrations\20260929022303_InitialMvpSchema.cs`

### Migrations\20260929030714_MvpFoundation.Designer.cs
- `Migrations\20260929030714_MvpFoundation.Designer.cs`

### Migrations\20260929030714_MvpFoundation.cs
- `Migrations\20260929030714_MvpFoundation.cs`

### Migrations\20260930065632_OmStationaryDirectCommerce.Designer.cs
- `Migrations\20260930065632_OmStationaryDirectCommerce.Designer.cs`

### Migrations\20260930065632_OmStationaryDirectCommerce.cs
- `Migrations\20260930065632_OmStationaryDirectCommerce.cs`

### Migrations\20261003093401_AdminStoreSettingsAndAuditValues.Designer.cs
- `Migrations\20261003093401_AdminStoreSettingsAndAuditValues.Designer.cs`

### Migrations\20261003093401_AdminStoreSettingsAndAuditValues.cs
- `Migrations\20261003093401_AdminStoreSettingsAndAuditValues.cs`

### Migrations\20261003110615_WhatsAppNotifications.Designer.cs
- `Migrations\20261003110615_WhatsAppNotifications.Designer.cs`

### Migrations\20261003110615_WhatsAppNotifications.cs
- `Migrations\20261003110615_WhatsAppNotifications.cs`

### Migrations\OmDbContextModelSnapshot.cs
- `Migrations\OmDbContextModelSnapshot.cs`

### Models\Models.cs
- `Models\Models.cs`

### OMStationary.Api.csproj
- `OMStationary.Api.csproj`

### Program.cs
- `Program.cs`

### Properties\launchSettings.json
- `Properties\launchSettings.json`

### Services\CouponService.cs
- `Services\CouponService.cs`

### Services\EmailNotificationService.cs
- `Services\EmailNotificationService.cs`

### Services\FulfillmentSelection.cs
- `Services\FulfillmentSelection.cs`

### Services\GeoDistance.cs
- `Services\GeoDistance.cs`

### Services\InvoiceService.cs
- `Services\InvoiceService.cs`

### Services\JwtAuthenticationHandler.cs
- `Services\JwtAuthenticationHandler.cs`

### Services\NotificationService.cs
- `Services\NotificationService.cs`

### Services\OrderStateMachine.cs
- `Services\OrderStateMachine.cs`

### Services\PaymentProviders.cs
- `Services\PaymentProviders.cs`

### Services\PaytmQrPaymentGateway.cs
- `Services\PaytmQrPaymentGateway.cs`

### Services\SettlementService.cs
- `Services\SettlementService.cs`

### Services\SmsNotificationService.cs
- `Services\SmsNotificationService.cs`

### Services\StockAlertService.cs
- `Services\StockAlertService.cs`

### Services\StoreSettingsService.cs
- `Services\StoreSettingsService.cs`

### Services\TaxCalculator.cs
- `Services\TaxCalculator.cs`

### Services\TokenService.cs
- `Services\TokenService.cs`

### Services\WhatsAppNotificationService.cs
- `Services\WhatsAppNotificationService.cs`

### appsettings.Development.json
- `appsettings.Development.json`

### appsettings.json
- `appsettings.json`

### bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### bin\Debug\net10.0\OMStationary.Api.deps.json
- `bin\Debug\net10.0\OMStationary.Api.deps.json`

### bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### bin\Debug\net10.0\appsettings.Development.json
- `bin\Debug\net10.0\appsettings.Development.json`

### bin\Debug\net10.0\appsettings.json
- `bin\Debug\net10.0\appsettings.json`

### bin\Development\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `bin\Development\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### bin\Development\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `bin\Development\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### bin\Development\net10.0\OMStationary.Api.deps.json
- `bin\Development\net10.0\OMStationary.Api.deps.json`

### bin\Development\net10.0\OMStationary.Api.runtimeconfig.json
- `bin\Development\net10.0\OMStationary.Api.runtimeconfig.json`

### bin\Development\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `bin\Development\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### bin\Development\net10.0\appsettings.Development.json
- `bin\Development\net10.0\appsettings.Development.json`

### bin\Development\net10.0\appsettings.json
- `bin\Development\net10.0\appsettings.json`

### bin\Release\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `bin\Release\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### bin\Release\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `bin\Release\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### bin\Release\net10.0\OMStationary.Api.deps.json
- `bin\Release\net10.0\OMStationary.Api.deps.json`

### bin\Release\net10.0\OMStationary.Api.runtimeconfig.json
- `bin\Release\net10.0\OMStationary.Api.runtimeconfig.json`

### bin\Release\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `bin\Release\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### bin\Release\net10.0\appsettings.Development.json
- `bin\Release\net10.0\appsettings.Development.json`

### bin\Release\net10.0\appsettings.json
- `bin\Release\net10.0\appsettings.json`

### obj\Debug\net10.0\.NETCoreApp,Version=v10.0.AssemblyAttributes.cs
- `obj\Debug\net10.0\.NETCoreApp,Version=v10.0.AssemblyAttributes.cs`

### obj\Debug\net10.0\OMStationary.Api.AssemblyInfo.cs
- `obj\Debug\net10.0\OMStationary.Api.AssemblyInfo.cs`

### obj\Debug\net10.0\OMStationary.Api.GlobalUsings.g.cs
- `obj\Debug\net10.0\OMStationary.Api.GlobalUsings.g.cs`

### obj\Debug\net10.0\OMStationary.Api.MvcApplicationPartsAssemblyInfo.cs
- `obj\Debug\net10.0\OMStationary.Api.MvcApplicationPartsAssemblyInfo.cs`

### obj\Debug\net10.0\OMStationary.Api.sourcelink.json
- `obj\Debug\net10.0\OMStationary.Api.sourcelink.json`

### obj\Debug\net10.0\rjsmcshtml.dswa.cache.json
- `obj\Debug\net10.0\rjsmcshtml.dswa.cache.json`

### obj\Debug\net10.0\rjsmrazor.dswa.cache.json
- `obj\Debug\net10.0\rjsmrazor.dswa.cache.json`

### obj\Debug\net10.0\rpswa.dswa.cache.json
- `obj\Debug\net10.0\rpswa.dswa.cache.json`

### obj\Debug\net10.0\staticwebassets.build.endpoints.json
- `obj\Debug\net10.0\staticwebassets.build.endpoints.json`

### obj\Debug\net10.0\staticwebassets.build.json
- `obj\Debug\net10.0\staticwebassets.build.json`

### obj\Development\net10.0\.NETCoreApp,Version=v10.0.AssemblyAttributes.cs
- `obj\Development\net10.0\.NETCoreApp,Version=v10.0.AssemblyAttributes.cs`

### obj\Development\net10.0\OMStationary.Api.AssemblyInfo.cs
- `obj\Development\net10.0\OMStationary.Api.AssemblyInfo.cs`

### obj\Development\net10.0\OMStationary.Api.GlobalUsings.g.cs
- `obj\Development\net10.0\OMStationary.Api.GlobalUsings.g.cs`

### obj\Development\net10.0\OMStationary.Api.MvcApplicationPartsAssemblyInfo.cs
- `obj\Development\net10.0\OMStationary.Api.MvcApplicationPartsAssemblyInfo.cs`

### obj\Development\net10.0\OMStationary.Api.sourcelink.json
- `obj\Development\net10.0\OMStationary.Api.sourcelink.json`

### obj\Development\net10.0\rjsmcshtml.dswa.cache.json
- `obj\Development\net10.0\rjsmcshtml.dswa.cache.json`

### obj\Development\net10.0\rjsmrazor.dswa.cache.json
- `obj\Development\net10.0\rjsmrazor.dswa.cache.json`

### obj\Development\net10.0\rpswa.dswa.cache.json
- `obj\Development\net10.0\rpswa.dswa.cache.json`

### obj\Development\net10.0\staticwebassets.build.endpoints.json
- `obj\Development\net10.0\staticwebassets.build.endpoints.json`

### obj\Development\net10.0\staticwebassets.build.json
- `obj\Development\net10.0\staticwebassets.build.json`

### obj\OMStationary.Api.csproj.nuget.dgspec.json
- `obj\OMStationary.Api.csproj.nuget.dgspec.json`

### obj\Release\net10.0\.NETCoreApp,Version=v10.0.AssemblyAttributes.cs
- `obj\Release\net10.0\.NETCoreApp,Version=v10.0.AssemblyAttributes.cs`

### obj\Release\net10.0\OMStationary.Api.AssemblyInfo.cs
- `obj\Release\net10.0\OMStationary.Api.AssemblyInfo.cs`

### obj\Release\net10.0\OMStationary.Api.GlobalUsings.g.cs
- `obj\Release\net10.0\OMStationary.Api.GlobalUsings.g.cs`

### obj\Release\net10.0\OMStationary.Api.MvcApplicationPartsAssemblyInfo.cs
- `obj\Release\net10.0\OMStationary.Api.MvcApplicationPartsAssemblyInfo.cs`

### obj\Release\net10.0\OMStationary.Api.sourcelink.json
- `obj\Release\net10.0\OMStationary.Api.sourcelink.json`

### obj\Release\net10.0\rjsmcshtml.dswa.cache.json
- `obj\Release\net10.0\rjsmcshtml.dswa.cache.json`

### obj\Release\net10.0\rjsmrazor.dswa.cache.json
- `obj\Release\net10.0\rjsmrazor.dswa.cache.json`

### obj\Release\net10.0\rpswa.dswa.cache.json
- `obj\Release\net10.0\rpswa.dswa.cache.json`

### obj\Release\net10.0\staticwebassets.build.endpoints.json
- `obj\Release\net10.0\staticwebassets.build.endpoints.json`

### obj\Release\net10.0\staticwebassets.build.json
- `obj\Release\net10.0\staticwebassets.build.json`

### obj\compilecheck10\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck10\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck10\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck10\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck10\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck10\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck10\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck10\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck10\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck10\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck10\Debug\net10.0\appsettings.Development.json
- `obj\compilecheck10\Debug\net10.0\appsettings.Development.json`

### obj\compilecheck10\Debug\net10.0\appsettings.json
- `obj\compilecheck10\Debug\net10.0\appsettings.json`

### obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck10\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck12\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck12\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck12\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck12\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck12\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck12\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck12\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck12\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck12\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck12\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck12\Debug\net10.0\appsettings.Development.json
- `obj\compilecheck12\Debug\net10.0\appsettings.Development.json`

### obj\compilecheck12\Debug\net10.0\appsettings.json
- `obj\compilecheck12\Debug\net10.0\appsettings.json`

### obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck12\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck2\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck2\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck2\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck2\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck2\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck2\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck2\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck2\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck2\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck2\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck2\Debug\net10.0\appsettings.json
- `obj\compilecheck2\Debug\net10.0\appsettings.json`

### obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck2\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck3\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck3\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck3\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck3\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck3\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck3\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck3\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck3\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck3\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck3\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck3\Debug\net10.0\appsettings.json
- `obj\compilecheck3\Debug\net10.0\appsettings.json`

### obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck3\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck4\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck4\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck4\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck4\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck4\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck4\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck4\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck4\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck4\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck4\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck4\Debug\net10.0\appsettings.json
- `obj\compilecheck4\Debug\net10.0\appsettings.json`

### obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck4\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck5\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck5\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck5\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck5\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck5\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck5\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck5\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck5\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck5\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck5\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck5\Debug\net10.0\appsettings.json
- `obj\compilecheck5\Debug\net10.0\appsettings.json`

### obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck5\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck6\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck6\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck6\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck6\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck6\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck6\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck6\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck6\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck6\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck6\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck6\Debug\net10.0\appsettings.json
- `obj\compilecheck6\Debug\net10.0\appsettings.json`

### obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck6\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck8\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck8\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck8\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck8\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck8\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck8\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck8\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck8\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck8\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck8\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck8\Debug\net10.0\appsettings.json
- `obj\compilecheck8\Debug\net10.0\appsettings.json`

### obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck8\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck9\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck9\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck9\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck9\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck9\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck9\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck9\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck9\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck9\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck9\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck9\Debug\net10.0\appsettings.Development.json
- `obj\compilecheck9\Debug\net10.0\appsettings.Development.json`

### obj\compilecheck9\Debug\net10.0\appsettings.json
- `obj\compilecheck9\Debug\net10.0\appsettings.json`

### obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck9\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck\Debug\net10.0\appsettings.json
- `obj\compilecheck\Debug\net10.0\appsettings.json`

### obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\compilecheck_final2\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck_final2\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck_final2\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck_final2\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck_final2\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck_final2\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck_final2\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck_final2\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck_final2\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck_final2\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck_final2\Debug\net10.0\appsettings.Development.json
- `obj\compilecheck_final2\Debug\net10.0\appsettings.Development.json`

### obj\compilecheck_final2\Debug\net10.0\appsettings.json
- `obj\compilecheck_final2\Debug\net10.0\appsettings.json`

### obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json
- `obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.deps.json`

### obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json
- `obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\BuildHost-netcore\Microsoft.CodeAnalysis.Workspaces.MSBuild.BuildHost.runtimeconfig.json`

### obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json
- `obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.deps.json`

### obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json
- `obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.runtimeconfig.json`

### obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json
- `obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\OMStationary.Api.staticwebassets.endpoints.json`

### obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\appsettings.json
- `obj\compilecheck_final2\Debug\net10.0\bin\Debug\net10.0\appsettings.json`

### obj\project.assets.json
- `obj\project.assets.json`

## Additional architecture findings

- `frontend/src/App.jsx` is the root app bootstrap and route registry.
- `frontend/src/RouteView.jsx` is the centralized route-to-page dispatcher for page-level rendering.
- `frontend/src/components/layout/AppShell.jsx` is the primary layout container for the customer app and route-level shell state.
- `frontend/src/components/layout/ProtectedRoute.jsx` and `frontend/src/components/layout/RoleRoute.jsx` handle route protection for admin, partner and delivery roles.
- The backend is already segmented into `Controllers`, `Data`, `Dtos`, `Models`, `Services`, and `Migrations`, matching the requested modularization model.
- No mandatory large monolith split was required in the actual repository state.
