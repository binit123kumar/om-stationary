# Unconnected and partially connected features

This report lists source connections that are absent or incomplete in the inspected code. “Unconnected” means no complete source-supported connection was identified in the documented scope; it does not establish intent or deployment behavior.

| Feature or boundary | Source evidence | Classification | What remains unverified or absent |
|---|---|---|---|
| UPI provider verification | Payment status path returns `verified=false`; no provider verification integration was mapped. | `PARTIALLY_IMPLEMENTED` / `NOT_MAPPED` | Actual payment provider verification, signature validation, webhook/callback processing and reconciliation. |
| Provider-side refunds | Orders use refund status transitions and a `Refund` entity, but no dedicated refund API/controller/provider operation was identified. | `PARTIALLY_IMPLEMENTED` / `NOT_MAPPED` | External refund execution, provider confirmation and reconciliation. |
| Outbound notification delivery | Customer notification endpoints expose feed/read operations; outbound dispatch is service/event-driven in source, with no client send endpoint mapped. | Source dispatch exists; external delivery is `NOT_TESTED` | Acceptance and delivery through configured email, SMS and WhatsApp providers. |
| Admin WhatsApp settings persistence | Settings action changes live configuration and records an audit entry; no `StoreSettings` persistence write was mapped for this action. | `NOT_MAPPED` to durable setting storage | Restart/deployment persistence and provider acceptance. |
| Public and admin categories | Public categories project category text from products; admin category endpoints operate on the `Category` entity. | Distinct source paths; not a missing link | Whether this is intended catalog behavior and how existing products are reconciled with the category table. |
| Tracking access behavior | Tracking route and API source exist, including order-number/token-sensitive lookup paths. | Source present; runtime unverified | End-to-end access behavior and authorization/token handling against a running API. |
| Frontend route tests | Route registrations and page mappings are present in source. | `NOT_MAPPED` to route-level integration tests | Browser/API integration coverage for customer, admin, partner and delivery routes. |
| Live SQL Server schema | EF DbSets and five migrations exist in source. | `NOT_TESTED` | Production database connectivity, applied migration level, physical schema and data. |

For detailed flow evidence see [feature-flow reports](feature-flows/_index.md), the [cross-layer map](FRONTEND_BACKEND_DATABASE_MAPPING.md), and [missing implementations](MISSING_IMPLEMENTATIONS.md). No claim is made about requirements not represented in the inspected source.
