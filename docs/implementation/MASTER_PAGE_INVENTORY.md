# Master Page Inventory

## Scope and method

This inventory is based on the actual route registry in `frontend/src/App.jsx` and the page resolution in `frontend/src/RouteView.jsx`. It records the pages that are currently present in the repository and their real source files. It intentionally does not invent routes or pages that are not present in the source tree.

## Actual route inventory

| Page ID | Visible name | Actual route | Source file | Layout used | Access requirement | Purpose and functionality | Current status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| home | Home | `/` | `frontend/src/pages/customer/HomePage.jsx` | `AppShell` | Public | Storefront landing page with hero, categories, search and catalog browsing | Present |
| search | Product Listing | `/search` | `frontend/src/pages/customer/ProductListingPage.jsx` | `AppShell` | Public | Search and catalogue listing with filters and sorting | Present |
| product | Product Detail | `/product/:id` | `frontend/src/pages/customer/ProductDetailPage.jsx` | `AppShell` | Public | Product gallery, pricing, stock info, reviews and quantity selection | Present |
| cart | Shopping Cart | `/cart` | `frontend/src/pages/customer/CartPage.jsx` | `AppShell` | Customer | View/edit cart, quantities, totals and pricing summary | Present |
| wishlist | Wishlist | `/wishlist` | `frontend/src/pages/customer/WishlistPage.jsx` | `AppShell` | Customer | Saved favorite products and quick add-to-cart actions | Present |
| checkout | Checkout | `/checkout` | `frontend/src/pages/customer/CheckoutPage.jsx` | `AppShell` | Customer | Shipping details, delivery method and order summary | Present |
| payment | Payment | `/payment` | `frontend/src/pages/customer/PaymentPage.jsx` | `AppShell` | Customer | Payment selection and verification flow entry | Present |
| order-success | Order Success | `/order-success` | `frontend/src/pages/customer/OrderSuccessPage.jsx` | `AppShell` | Customer | Successful order confirmation and follow-up actions | Present |
| invoice | Invoice | `/invoice/:id` | `frontend/src/pages/customer/InvoicePage.jsx` | `AppShell` | Customer | Order invoice view with totals and print/download actions | Present |
| orders | My Orders | `/orders` | `frontend/src/pages/customer/OrdersPage.jsx` | `AppShell` | Customer | Order history and status overview | Present |
| track | Track Order | `/track/:id` | `frontend/src/pages/customer/TrackOrderPage.jsx` | `AppShell` | Customer | Shipment order timeline and tracking state | Present |
| login | Login | `/login` | `frontend/src/pages/customer/LoginPage.jsx` | `AppShell` | Public | Email/mobile login and account access | Present |
| register | Registration | `/register` | `frontend/src/pages/customer/RegisterPage.jsx` | `AppShell` | Public | Sign-up for customer account | Present |
| account | Account Dashboard | `/account` | `frontend/src/pages/customer/AccountPage.jsx` | `AppShell` | Customer | Account info, profile, preferences and account fast-links | Present |
| notifications | Notifications | `/notifications` | `frontend/src/pages/customer/NotificationsPage.jsx` | `AppShell` | Customer | User-facing notification list | Present |
| about | About Us | `/about` | `frontend/src/pages/customer/AboutPage.jsx` | `AppShell` | Public | Company/about page content | Present |
| contact | Contact Us | `/contact` | `frontend/src/pages/customer/ContactPage.jsx` | `AppShell` | Public | Contact details and inquiry form | Present |
| help | Help & Support | `/help` | `frontend/src/pages/customer/HelpPage.jsx` | `AppShell` | Public | Help centre landing page | Present |
| privacy | Privacy Policy | `/privacy` | `frontend/src/pages/customer/PrivacyPage.jsx` | `AppShell` | Public | Privacy and data handling policy | Present |
| terms | Terms & Conditions | `/terms` | `frontend/src/pages/customer/TermsPage.jsx` | `AppShell` | Public | Terms of use | Present |
| refund | Return & Refund | `/refund-policy` | `frontend/src/pages/customer/RefundPolicyPage.jsx` | `AppShell` | Public | Return/refund policy | Present |
| admin-home | Admin Dashboard | `/admin` | `frontend/src/pages/admin/AdminDashboardPage.jsx` | `AdminLayout` | Admin | Administrative analytics and overview | Present |
| admin-orders | Admin Orders | `/admin/orders` | `frontend/src/pages/admin/AdminOrdersPage.jsx` | `AdminLayout` | Admin | Order management view | Present |
| admin-order | Admin Order Detail | `/admin/orders/:id` | `frontend/src/pages/admin/AdminOrderDetailPage.jsx` | `AdminLayout` | Admin | Detailed order review and status actions | Present |
| admin-products | Admin Products | `/admin/products` | `frontend/src/pages/admin/AdminProductsPage.jsx` | `AdminLayout` | Admin | Product catalog administration | Present |
| admin-product-form | Product Form | `/admin/products/new`, `/admin/products/:id/edit` | `frontend/src/pages/admin/AdminProductFormPage.jsx` | `AdminLayout` | Admin | Create and edit products | Present |
| admin-categories | Categories | `/admin/categories` | `frontend/src/pages/admin/AdminCategoriesPage.jsx` | `AdminLayout` | Admin | Category administration | Present |
| admin-inventory | Inventory | `/admin/inventory` | `frontend/src/pages/admin/AdminInventoryPage.jsx` | `AdminLayout` | Admin | Stock tracking and low-stock review | Present |
| admin-customers | Customers | `/admin/customers` | `frontend/src/pages/admin/AdminCustomersPage.jsx` | `AdminLayout` | Admin | Customer list and profile management | Present |
| admin-payments | Payments | `/admin/payments` | `frontend/src/pages/admin/AdminPaymentsPage.jsx` | `AdminLayout` | Admin | Payment overview and reconciliation | Present |
| admin-coupons | Coupons | `/admin/coupons` | `frontend/src/pages/admin/AdminCouponsPage.jsx` | `AdminLayout` | Admin | Offer and promotional code management | Present |
| admin-delivery | Delivery | `/admin/delivery` | `frontend/src/pages/admin/AdminDeliveryPage.jsx` | `AdminLayout` | Admin | Delivery operations and assignment overview | Present |
| admin-invoices | Invoices | `/admin/invoices` | `frontend/src/pages/admin/AdminInvoicesPage.jsx` | `AdminLayout` | Admin | Invoice records and export actions | Present |
| admin-partners | Partner Shops | `/admin/partners` | `frontend/src/pages/admin/AdminPartnerShopsPage.jsx` | `AdminLayout` | Admin | Partner/shop administration | Present |
| admin-reports | Reports | `/admin/reports` | `frontend/src/pages/admin/AdminReportsPage.jsx` | `AdminLayout` | Admin | Analytics and reporting screens | Present |
| admin-notifications | Notifications | `/admin/notifications` | `frontend/src/pages/admin/AdminNotificationsPage.jsx` | `AdminLayout` | Admin | Notification centre and campaigns | Present |
| admin-whatsapp | WhatsApp | `/admin/whatsapp` | `frontend/src/pages/admin/AdminWhatsAppPage.jsx` | `AdminLayout` | Admin | WhatsApp delivery settings and logs | Present |
| admin-settings | Store Settings | `/admin/settings` | `frontend/src/pages/admin/AdminSettingsPage.jsx` | `AdminLayout` | Admin | Store configuration and general settings | Present |
| admin-audit | Audit Log | `/admin/audit-log` | `frontend/src/pages/admin/AdminAuditLogPage.jsx` | `AdminLayout` | Admin | Audit trail and administrative history | Present |
| partner-home | Partner Dashboard | `/partner` | `frontend/src/pages/partner/PartnerDashboardPage.jsx` | `AdminLayout` | PartnerShop | Partner overview and operations summary | Present |
| partner-inventory | Partner Inventory | `/partner/inventory` | `frontend/src/pages/partner/PartnerInventoryPage.jsx` | `AdminLayout` | PartnerShop | Partner stock management | Present |
| partner-orders | Partner Orders | `/partner/orders` | `frontend/src/pages/partner/PartnerOrdersPage.jsx` | `AdminLayout` | PartnerShop | Partner order backlog | Present |
| partner-profile | Partner Profile | `/partner/profile` | `frontend/src/pages/partner/PartnerProfilePage.jsx` | `AdminLayout` | PartnerShop | Partner account/profile | Present |
| partner-products | Partner Products | `/partner/products` | `frontend/src/pages/partner/PartnerProductsPage.jsx` | `AdminLayout` | PartnerShop | Partner product administration | Present |
| partner-order | Partner Order Detail | `/partner/orders/:id` | `frontend/src/pages/partner/PartnerOrderDetailPage.jsx` | `AdminLayout` | PartnerShop | Detailed partner order operations | Present |
| delivery-home | Delivery Dashboard | `/delivery` | `frontend/src/pages/delivery/DeliveryDashboardPage.jsx` | `AdminLayout` | DeliveryPartner | Delivery overview | Present |
| delivery-assigned | Assigned Deliveries | `/delivery/assigned` | `frontend/src/pages/delivery/AssignedDeliveriesPage.jsx` | `AdminLayout` | DeliveryPartner | Assigned deliveries queue | Present |
| delivery-detail | Delivery Detail | `/delivery/:id` | `frontend/src/pages/delivery/DeliveryDetailPage.jsx` | `AdminLayout` | DeliveryPartner | Individual delivery actions/details | Present |
| delivery-history | Delivery History | `/delivery/history` | `frontend/src/pages/delivery/DeliveryHistoryPage.jsx` | `AdminLayout` | DeliveryPartner | Completed or historical deliveries | Present |
| delivery-profile | Delivery Profile | `/delivery/profile` | `frontend/src/pages/delivery/DeliveryProfilePage.jsx` | `AdminLayout` | DeliveryPartner | Delivery profile and settings | Present |

## Route ownership and implementation notes

- The route registry is in `frontend/src/App.jsx`. The actual component selection is centralized in `frontend/src/RouteView.jsx`.
- `ProtectedRoute` and `RoleRoute` are used to gate customer, admin, partner and delivery access.
- The app currently keeps route-level page files in dedicated folders for customer, admin, partner and delivery flows rather than moving everything into a single file.
- The final `*` route falls back to home.

## Current implementation status

- 53 route-level page entries are resolvable from the actual router.
- The project is modular across customer/admin/partner/delivery ownership groups.
- Live physical-device/mobile verification is not recorded in the repository; responsive coverage is based on static assessment and build validation, not actual iPhone/Android hardware tests.
- PWA manifests, a service worker, and installation flows are not present in the frontend source tree at this time.
