# Feature-flow reports

These reports trace active UI routes through React page handlers/state/hooks, frontend services, declared HTTP contracts, backend actions/services, and EF entities/DbSets. The reports are source maps, not evidence that a deployed API, database, or external provider is currently reachable.

## Scope

Included active business domains: customer authentication/profile and addresses; catalogue, search, categories, and product detail; cart and order placement; payment/refund; invoice/history/tracking; wishlist; admin catalogue, categories, inventory, orders, coupons, payments, invoices, reports, settings, notifications, and WhatsApp; partner shops; delivery partner operations; and in-app/email/SMS/WhatsApp notifications.

Public informational pages and shared presentation-only components are out of scope unless they take part in one of those flows. The outer route tree is documented in [route-inventory.md](../evidence/route-inventory.md). Cross-domain endpoint/entity indexing is in [FRONTEND_BACKEND_DATABASE_MAPPING.md](../FRONTEND_BACKEND_DATABASE_MAPPING.md).

## Source and runtime status convention

- **Source confirmed** means the checked-in route/page/service/controller/model source supports the listed call chain and contract.
- **NOT_MAPPED / source gap** means an endpoint, handler, entity/table mapping, or test could not be verified and is not inferred from naming.
- **Runtime unverified** means this report did not execute the page/API flow or query the deployed database/provider. A passing unit/build test is not evidence of live integration.

## Reports

| Domain | Report |
|---|---|
| Sign-in, registration, session refresh, customer profile | [Authentication and profile](authentication-profile.md) |
| Browse, categories, search, product detail | [Catalogue and product discovery](catalogue-product-discovery.md) |
| Cart, checkout, coupon validation, order placement | [Cart, checkout, and order creation](cart-checkout-order-creation.md) |
| UPI/COD payment state and refunds | [Payment and refund](payment-refund.md) |
| Customer order list, tracking, invoice view/PDF | [Order history, tracking, and invoices](orders-tracking-invoices.md) |
| Account addresses and wishlist | [Account and wishlist](account-wishlist.md) |
| Admin products, categories, and inventory | [Admin catalogue and inventory](admin-catalogue-inventory.md) |
| Admin order queue, detail, transitions, assignments | [Admin order operations](admin-orders.md) |
| Admin coupons, payments, invoices, business reports | [Admin commercial reports](admin-commercial-reports.md) |
| Admin store configuration and in-app notification review | [Admin settings and notifications](admin-settings-notifications.md) |
| Admin WhatsApp log/settings/test/retry | [Admin WhatsApp operations](admin-whatsapp.md) |
| Partner-shop registration, profile, inventory, orders, approval | [Partner shop](partner-shop.md) |
| Delivery quote, assignment, partner workflow/history | [Delivery](delivery.md) |
| In-app feed and outbound email/SMS/WhatsApp delivery | [Notifications and messaging](notifications-messaging.md) |
