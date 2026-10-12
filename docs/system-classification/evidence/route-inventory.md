# Active route inventory

Evidence: [frontend/src/App.jsx](../../../frontend/src/App.jsx) registers the routes and wrappers; [frontend/src/RouteView.jsx](../../../frontend/src/RouteView.jsx) maps page keys to page modules. Each active routed page has an [individual report](../pages/). Static source inventory only: no route, guard, browser, API, or data outcome is claimed.

Concrete declarations: **51**. Distinct concrete route keys: **50**. Wildcard declarations: **1**. Active page modules mapped by RouteView: **50**.

| Route | Page key | Page module | Guard in route declaration |
|---|---|---|---|
| / | home | [HomePage](../pages/HomePage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /search | search | [ProductListingPage](../pages/ProductListingPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /product/:id | product | [ProductDetailPage](../pages/ProductDetailPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /cart | cart | [CartPage](../pages/CartPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /wishlist | wishlist | [WishlistPage](../pages/WishlistPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /checkout | checkout | [CheckoutPage](../pages/CheckoutPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /payment | payment | [PaymentPage](../pages/PaymentPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /order-success | order-success | [OrderSuccessPage](../pages/OrderSuccessPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /invoice/:id | invoice | [InvoicePage](../pages/InvoicePage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /orders | orders | [OrdersPage](../pages/OrdersPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /track/:id | track | [TrackOrderPage](../pages/TrackOrderPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /login | login | [LoginPage](../pages/LoginPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /register | register | [RegisterPage](../pages/RegisterPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /account | account | [AccountPage](../pages/AccountPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /notifications | notifications | [NotificationsPage](../pages/NotificationsPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /about | about | [AboutPage](../pages/AboutPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /contact | contact | [ContactPage](../pages/ContactPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /help | help | [HelpPage](../pages/HelpPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /privacy | privacy | [PrivacyPage](../pages/PrivacyPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /terms | terms | [TermsPage](../pages/TermsPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /refund-policy | refund | [RefundPolicyPage](../pages/RefundPolicyPage.md) | Public (no ProtectedRoute wrapper in declaration) |
| /admin | admin-home | [AdminDashboardPage](../pages/AdminDashboardPage.md) | Admin |
| /admin/orders | admin-orders | [AdminOrdersPage](../pages/AdminOrdersPage.md) | Admin |
| /admin/orders/:id | admin-order | [AdminOrderDetailPage](../pages/AdminOrderDetailPage.md) | Admin |
| /admin/products | admin-products | [AdminProductsPage](../pages/AdminProductsPage.md) | Admin |
| /admin/products/new | admin-product-form | [AdminProductFormPage](../pages/AdminProductFormPage.md) | Admin |
| /admin/products/:id/edit | admin-product-form | [AdminProductFormPage](../pages/AdminProductFormPage.md) | Admin |
| /admin/categories | admin-categories | [AdminCategoriesPage](../pages/AdminCategoriesPage.md) | Admin |
| /admin/inventory | admin-inventory | [AdminInventoryPage](../pages/AdminInventoryPage.md) | Admin |
| /admin/customers | admin-customers | [AdminCustomersPage](../pages/AdminCustomersPage.md) | Admin |
| /admin/payments | admin-payments | [AdminPaymentsPage](../pages/AdminPaymentsPage.md) | Admin |
| /admin/coupons | admin-coupons | [AdminCouponsPage](../pages/AdminCouponsPage.md) | Admin |
| /admin/delivery | admin-delivery | [AdminDeliveryPage](../pages/AdminDeliveryPage.md) | Admin |
| /admin/invoices | admin-invoices | [AdminInvoicesPage](../pages/AdminInvoicesPage.md) | Admin |
| /admin/partners | admin-partners | [AdminPartnerShopsPage](../pages/AdminPartnerShopsPage.md) | Admin |
| /admin/reports | admin-reports | [AdminReportsPage](../pages/AdminReportsPage.md) | Admin |
| /admin/notifications | admin-notifications | [AdminNotificationsPage](../pages/AdminNotificationsPage.md) | Admin |
| /admin/whatsapp | admin-whatsapp | [AdminWhatsAppPage](../pages/AdminWhatsAppPage.md) | Admin |
| /admin/settings | admin-settings | [AdminSettingsPage](../pages/AdminSettingsPage.md) | Admin |
| /admin/audit-log | admin-audit | [AdminAuditLogPage](../pages/AdminAuditLogPage.md) | Admin |
| /partner | partner-home | [PartnerDashboardPage](../pages/PartnerDashboardPage.md) | PartnerShop |
| /partner/inventory | partner-inventory | [PartnerInventoryPage](../pages/PartnerInventoryPage.md) | PartnerShop |
| /partner/orders | partner-orders | [PartnerOrdersPage](../pages/PartnerOrdersPage.md) | PartnerShop |
| /partner/profile | partner-profile | [PartnerProfilePage](../pages/PartnerProfilePage.md) | PartnerShop |
| /partner/products | partner-products | [PartnerProductsPage](../pages/PartnerProductsPage.md) | PartnerShop |
| /partner/orders/:id | partner-order | [PartnerOrderDetailPage](../pages/PartnerOrderDetailPage.md) | PartnerShop |
| /delivery | delivery-home | [DeliveryDashboardPage](../pages/DeliveryDashboardPage.md) | DeliveryPartner |
| /delivery/assigned | delivery-assigned | [AssignedDeliveriesPage](../pages/AssignedDeliveriesPage.md) | DeliveryPartner |
| /delivery/history | delivery-history | [DeliveryHistoryPage](../pages/DeliveryHistoryPage.md) | DeliveryPartner |
| /delivery/profile | delivery-profile | [DeliveryProfilePage](../pages/DeliveryProfilePage.md) | DeliveryPartner |
| /delivery/:id | delivery-detail | [DeliveryDetailPage](../pages/DeliveryDetailPage.md) | DeliveryPartner |
| * | home | [HomePage](../pages/HomePage.md) | Public (no ProtectedRoute wrapper in declaration) |

## Reconciliation

- Concrete route declarations without a matching RouteView branch/import: none detected by static scan.
- Page-folder modules not dispatched by RouteView: frontend/src/pages/customer/LegalContent.jsx, frontend/src/pages/customer/LegalPages.jsx, frontend/src/pages/customer/content.js; these are shared/non-route modules, not route-level pages.
- Both /admin/products/new and /admin/products/:id/edit use admin-product-form and AdminCategoriesPage has its own admin-categories route key and report.
- Wildcard * dispatches to home and is not a separate page module.
