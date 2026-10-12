# Frontend codebase-reference scope summary

**Inspection scope:** `frontend/src/pages`, `components`, `services`, `hooks`, and `utils`, plus route mappings from `App.jsx` and component dispatch from `RouteView.jsx`. Documentation changes are limited to `docs/codebase-reference`; no source code or existing implementation/cleanup documentation was modified.

## Exact inventory

| Requested scope | Source files | Module reports | Per-source indexes | Individual named declaration reports |
|---|---:|---:|---:|---:|
| Pages | 53 | 53 | 53 | 100 |
| Components | 122 | 122 | 122 | 159 |
| Services | 14 | 14 | 14 | 93 |
| Hooks and utilities | 19 | 19 | 19 | 53 |
| **Total** | **208** | **208** | **208** | **405** |

Named declaration count is **405 individually reported files** from **405 lexical entries**. Function-valued declarations are kept separate, with a source index for each file. Repeated names in one source get numeric filename suffixes. Approximate anonymous-arrow/callback exclusions listed by source index: **524**; they are not included in the named count.

## Page route inventory

### Route-mapped page files (50)

- [`pages/admin/AdminAuditLogPage.jsx`](pages/admin/AdminAuditLogPage.md): /admin/audit-log (ProtectedRoute role: Admin)
- [`pages/admin/AdminCategoriesPage.jsx`](pages/admin/AdminCategoriesPage.md): /admin/categories (ProtectedRoute role: Admin)
- [`pages/admin/AdminCouponsPage.jsx`](pages/admin/AdminCouponsPage.md): /admin/coupons (ProtectedRoute role: Admin)
- [`pages/admin/AdminCustomersPage.jsx`](pages/admin/AdminCustomersPage.md): /admin/customers (ProtectedRoute role: Admin)
- [`pages/admin/AdminDashboardPage.jsx`](pages/admin/AdminDashboardPage.md): /admin (ProtectedRoute role: Admin)
- [`pages/admin/AdminDeliveryPage.jsx`](pages/admin/AdminDeliveryPage.md): /admin/delivery (ProtectedRoute role: Admin)
- [`pages/admin/AdminInventoryPage.jsx`](pages/admin/AdminInventoryPage.md): /admin/inventory (ProtectedRoute role: Admin)
- [`pages/admin/AdminInvoicesPage.jsx`](pages/admin/AdminInvoicesPage.md): /admin/invoices (ProtectedRoute role: Admin)
- [`pages/admin/AdminNotificationsPage.jsx`](pages/admin/AdminNotificationsPage.md): /admin/notifications (ProtectedRoute role: Admin)
- [`pages/admin/AdminOrderDetailPage.jsx`](pages/admin/AdminOrderDetailPage.md): /admin/orders/:id (ProtectedRoute role: Admin)
- [`pages/admin/AdminOrdersPage.jsx`](pages/admin/AdminOrdersPage.md): /admin/orders (ProtectedRoute role: Admin)
- [`pages/admin/AdminPartnerShopsPage.jsx`](pages/admin/AdminPartnerShopsPage.md): /admin/partners (ProtectedRoute role: Admin)
- [`pages/admin/AdminPaymentsPage.jsx`](pages/admin/AdminPaymentsPage.md): /admin/payments (ProtectedRoute role: Admin)
- [`pages/admin/AdminProductFormPage.jsx`](pages/admin/AdminProductFormPage.md): /admin/products/new (ProtectedRoute role: Admin); /admin/products/:id/edit (ProtectedRoute role: Admin)
- [`pages/admin/AdminProductsPage.jsx`](pages/admin/AdminProductsPage.md): /admin/products (ProtectedRoute role: Admin)
- [`pages/admin/AdminReportsPage.jsx`](pages/admin/AdminReportsPage.md): /admin/reports (ProtectedRoute role: Admin)
- [`pages/admin/AdminSettingsPage.jsx`](pages/admin/AdminSettingsPage.md): /admin/settings (ProtectedRoute role: Admin)
- [`pages/admin/AdminWhatsAppPage.jsx`](pages/admin/AdminWhatsAppPage.md): /admin/whatsapp (ProtectedRoute role: Admin)
- [`pages/customer/AboutPage.jsx`](pages/customer/AboutPage.md): /about
- [`pages/customer/AccountPage.jsx`](pages/customer/AccountPage.md): /account
- [`pages/customer/CartPage.jsx`](pages/customer/CartPage.md): /cart
- [`pages/customer/CheckoutPage.jsx`](pages/customer/CheckoutPage.md): /checkout
- [`pages/customer/ContactPage.jsx`](pages/customer/ContactPage.md): /contact
- [`pages/customer/HelpPage.jsx`](pages/customer/HelpPage.md): /help
- [`pages/customer/HomePage.jsx`](pages/customer/HomePage.md): /; *
- [`pages/customer/InvoicePage.jsx`](pages/customer/InvoicePage.md): /invoice/:id
- [`pages/customer/LoginPage.jsx`](pages/customer/LoginPage.md): /login
- [`pages/customer/NotificationsPage.jsx`](pages/customer/NotificationsPage.md): /notifications
- [`pages/customer/OrdersPage.jsx`](pages/customer/OrdersPage.md): /orders
- [`pages/customer/OrderSuccessPage.jsx`](pages/customer/OrderSuccessPage.md): /order-success
- [`pages/customer/PaymentPage.jsx`](pages/customer/PaymentPage.md): /payment
- [`pages/customer/PrivacyPage.jsx`](pages/customer/PrivacyPage.md): /privacy
- [`pages/customer/ProductDetailPage.jsx`](pages/customer/ProductDetailPage.md): /product/:id
- [`pages/customer/ProductListingPage.jsx`](pages/customer/ProductListingPage.md): /search
- [`pages/customer/RefundPolicyPage.jsx`](pages/customer/RefundPolicyPage.md): /refund-policy
- [`pages/customer/RegisterPage.jsx`](pages/customer/RegisterPage.md): /register
- [`pages/customer/TermsPage.jsx`](pages/customer/TermsPage.md): /terms
- [`pages/customer/TrackOrderPage.jsx`](pages/customer/TrackOrderPage.md): /track/:id
- [`pages/customer/WishlistPage.jsx`](pages/customer/WishlistPage.md): /wishlist
- [`pages/delivery/AssignedDeliveriesPage.jsx`](pages/delivery/AssignedDeliveriesPage.md): /delivery/assigned (ProtectedRoute role: DeliveryPartner)
- [`pages/delivery/DeliveryDashboardPage.jsx`](pages/delivery/DeliveryDashboardPage.md): /delivery (ProtectedRoute role: DeliveryPartner)
- [`pages/delivery/DeliveryDetailPage.jsx`](pages/delivery/DeliveryDetailPage.md): /delivery/:id (ProtectedRoute role: DeliveryPartner)
- [`pages/delivery/DeliveryHistoryPage.jsx`](pages/delivery/DeliveryHistoryPage.md): /delivery/history (ProtectedRoute role: DeliveryPartner)
- [`pages/delivery/DeliveryProfilePage.jsx`](pages/delivery/DeliveryProfilePage.md): /delivery/profile (ProtectedRoute role: DeliveryPartner)
- [`pages/partner/PartnerDashboardPage.jsx`](pages/partner/PartnerDashboardPage.md): /partner (ProtectedRoute role: PartnerShop)
- [`pages/partner/PartnerInventoryPage.jsx`](pages/partner/PartnerInventoryPage.md): /partner/inventory (ProtectedRoute role: PartnerShop)
- [`pages/partner/PartnerOrderDetailPage.jsx`](pages/partner/PartnerOrderDetailPage.md): /partner/orders/:id (ProtectedRoute role: PartnerShop)
- [`pages/partner/PartnerOrdersPage.jsx`](pages/partner/PartnerOrdersPage.md): /partner/orders (ProtectedRoute role: PartnerShop)
- [`pages/partner/PartnerProductsPage.jsx`](pages/partner/PartnerProductsPage.md): /partner/products (ProtectedRoute role: PartnerShop)
- [`pages/partner/PartnerProfilePage.jsx`](pages/partner/PartnerProfilePage.md): /partner/profile (ProtectedRoute role: PartnerShop)

### Page-folder modules without direct routes (3)

- [`pages/customer/content.js`](pages/customer/content.md): marked as a non-route page-folder/shared module
- [`pages/customer/LegalContent.jsx`](pages/customer/LegalContent.md): marked as a non-route page-folder/shared module
- [`pages/customer/LegalPages.jsx`](pages/customer/LegalPages.md): marked as a non-route page-folder/shared module

Route matching is static from `App.jsx` and `RouteView.jsx`; it does not assert runtime guard behavior.

## Exact report roots

- Module reports: `docs/codebase-reference/pages/{admin,customer,partner,delivery}/` (53 files); `components/<actual-category>/` (122); `services/` (14); `hooks-context/{hooks,utils}/` (19).
- Function/method reports: `docs/codebase-reference/functions-methods/frontend/<source-relative-path>/<declaration>.md` (405 named reports). Each source-relative folder contains an `_index.md` linking declarations and listing anonymous callback exclusions.
- Module indexes are included at category/root levels.

## Verification and limitations

- All module reports and individual named declaration reports were generated from source files and linked to their corresponding reports/indexes. API path literals, props, hooks, imports, routes, calls, return markers, and side effects are source-derived only.
- API/backend/data integrations and all application behavior are **not runtime-verified**. No API requests or backend systems were exercised.
- Frontend scan found no files matching `*.test.*` or `*.spec.*`; frontend test evidence is absent from this scope.
- Named declaration reports use lexical extraction. Anonymous callbacks are listed as exclusions at their enclosing source indexes; they do not each have detailed behavior reports. Lexical extraction can miss shorthand methods, dynamic definitions, and complex syntactic constructs.
- Function call lists, return fragments, and control-flow markers are lexical source evidence rather than execution proofs. Security effectiveness, authorization guarantees, and backend behavior are not claimed.
