# Feature implementation matrix

`Source status` describes checked-in code only. `Runtime status` is **NOT_TESTED** for these flows in this classification pass. Detailed source traces are linked by feature.

| Feature/domain | Frontend route/page scope | Backend/API source status | Declared data layer | Detail |
|---|---|---|---|---|
| Authentication and profile | `/login`, `/register`, `/account` | Source flow present | Users, roles, customer profiles, refresh tokens | [Authentication/profile](feature-flows/authentication-profile.md) |
| Catalogue and product discovery | Home, `/search`, `/product/:id` | Source flow present | Products, product images; categories are separately sourced | [Catalogue](feature-flows/catalogue-product-discovery.md) |
| Cart, checkout and order creation | `/cart`, `/checkout`, `/order-success` | Source flow present; API result not runtime-tested | Carts, cart items, orders, payments, invoices, deliveries, products, coupons and related sets | [Cart/checkout/order](feature-flows/cart-checkout-order-creation.md) |
| Payment and refund | `/payment`, admin order operations | Partial: UPI provider verification and provider-side refund are not mapped | Payments, orders, refunds, notifications | [Payment/refund](feature-flows/payment-refund.md) |
| Order history, tracking and invoices | `/orders`, `/track/:id`, `/invoice/:id` | Source flow present | Orders, items, order history, invoices and invoice lines | [Orders/tracking/invoices](feature-flows/orders-tracking-invoices.md) |
| Account addresses and wishlist | `/account`, `/wishlist` | Source flow present; some endpoint operations have no page caller | Addresses, wishlists, wishlist items, carts/products | [Account/wishlist](feature-flows/account-wishlist.md) |
| Admin catalogue and inventory | `/admin/products`, `/admin/categories`, `/admin/inventory` | Source flow present, including category list/create/update actions | Products, product images, categories, notifications | [Admin catalogue/inventory](feature-flows/admin-catalogue-inventory.md) |
| Admin order operations | `/admin/orders*` | Source flow present | Orders/items/history, deliveries/history, payments, refunds, settlements, audit logs | [Admin orders](feature-flows/admin-orders.md) |
| Admin commercial reports | `/admin/coupons`, payments, invoices, reports | Source flow present | Coupons and report-dependent orders, users, products, payments, invoices, wishlists | [Admin commercial reports](feature-flows/admin-commercial-reports.md) |
| Admin settings and notifications | `/admin/settings`, `/admin/notifications` | Source flow present | Store settings and notifications | [Admin settings/notifications](feature-flows/admin-settings-notifications.md) |
| Admin WhatsApp operations | `/admin/whatsapp` | Source flow present; provider delivery not verified | WhatsApp notifications and audit logs | [Admin WhatsApp](feature-flows/admin-whatsapp.md) |
| Partner shop operations | `/partner*`, `/admin/partners` | Source flow present | Partner shops, shop products, users, orders/items | [Partner shop](feature-flows/partner-shop.md) |
| Delivery operations | `/delivery*`, `/admin/delivery`, checkout | Source flow present | Deliveries, delivery partners/history, orders and shop inventory | [Delivery](feature-flows/delivery.md) |
| Notifications and messaging | `/notifications` and order/admin-triggered notifications | In-app/outbound source paths exist; external delivery unverified | Notifications, WhatsApp notifications, orders, products | [Notifications/messaging](feature-flows/notifications-messaging.md) |

## Interpretation

The table reflects source-level traceability across pages, services, endpoint attributes and EF declarations. A source flow is not evidence that credentials, deployment configuration, database schema, payment gateways, email/SMS gateways or WhatsApp delivery are functional. The authoritative detailed cross-layer rows are in [FRONTEND_BACKEND_DATABASE_MAPPING.md](FRONTEND_BACKEND_DATABASE_MAPPING.md).
