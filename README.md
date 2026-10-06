star
# OM Stationary — Storefront, Admin, Partner & Delivery

A first-party e-commerce platform for OM Stationary: React + Vite storefront and admin panel,
ASP.NET Core Web API (.NET 10), Entity Framework Core, Microsoft SQL Server (`OMStationaryDb`).

OM Stationary sells its **own** stock. `FirstPartyFulfillmentProvider` fulfils from OM Stationary
inventory first and only falls back to an approved partner shop acting on OM Stationary's behalf.
There is no marketplace and no Amazon/Flipkart/Blinkit/JioMart integration — the earlier "aggregator"
framing was removed because no official partner agreement or API authorization exists.

## Stack
- React + Vite + React Router + Lucide icons
- ASP.NET Core Web API (.NET 10), custom JWT bearer authentication handler
- Entity Framework Core with SQL Server
- Plain CSS (`frontend/src/styles.css`)
- Swagger UI (Development only — never mapped in Production)

## Project layout
```
frontend/                React storefront + admin/partner/delivery panels
  src/main.jsx           Shell, home, search, product, cart, wishlist, tracking, notifications
  src/Checkout.jsx       Checkout, order result, payment, partner & delivery dashboards
  src/Invoice.jsx        Tax invoice + secure PDF download
  src/AccountPages.jsx   Login/register, account, addresses, notifications
  src/session.js         Token storage, apiFetch with automatic refresh
  src/styles.css         Design system
backend/OMStationary.Api/
  Controllers/           One controller per resource area
  Services/              Tax, coupons, fulfillment, invoices, WhatsApp, settlements, tokens
  Data/OmDbContext.cs    EF Core model for the existing OMStationaryDb
  Migrations/            Existing migrations (see below)
```

## Running locally

### Backend
```powershell
cd backend\OMStationary.Api
dotnet restore
dotnet run
```
There is **no `Properties/launchSettings.json`**, so Kestrel binds `http://localhost:5000`.
`GET /api/health` reports API and database availability. The API stays up if SQL Server is
unavailable and returns `503` for database operations until it is reachable.

Swagger is available at `/swagger` **only in Development**.

### Frontend
```powershell
cd frontend
npm install
npm run dev
```
Set `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```
This must match the port the API actually binds.

### Development bootstrap admin
`appsettings.Development.json` creates `admin@omstationary.local` on first start if the account
does not exist. This file is **development-only**. Production must set `Admin__BootstrapEmail` /
`Admin__BootstrapPassword` / `Admin__BootstrapPhone` as environment variables, or provision the
account directly. `Admin:BootstrapOverwritePassword` is opt-in and is never enabled in production.

## Database

Reuses the existing **`OMStationaryDb`**. The database is never dropped, reset or recreated.

Migrations (all existing — do not delete):
- `20260929022303_InitialMvpSchema`
- `20260929030714_MvpFoundation`
- `20260930065632_OmStationaryDirectCommerce`
- `20261003093401_AdminStoreSettingsAndAuditValues`
- `20261003110615_WhatsAppNotifications`

`SafeMigrationBootstrap` inspects the live schema first. On an unrecognized legacy schema it stops
and refuses to migrate rather than guessing. **Back up production data before the first upgraded
startup, and rehearse against a staging copy.**

## Security model

| Concern | Implementation |
|---|---|
| JWT | HS256, issuer/audience/expiry verified, signature checked in constant time |
| Active user | Every authenticated request re-reads the user and rejects inactive accounts |
| Role integrity | A token whose `role` claim no longer matches the stored role is rejected |
| Refresh tokens | Hashed at rest with per-token salt, rotated on refresh, revocable on logout |
| Order creation | `POST /api/orders` requires an authenticated JWT — anonymous is `401` |
| Order/tracking/invoice read | Owner, Admin, or holder of the order tracking token only; failures return `404` so an order number is never confirmed to an outsider |
| Admin APIs | `[Authorize(Roles = "Admin")]`. There is no `X-Admin-Key` header path |
| Payment | Server-calculated totals, server-verified stock, COD confirmed only by an admin after delivery. Online payment is **fail-closed** until gateway credentials exist |
| Passwords | New passwords: min 8 chars with upper, lower, digit and special. Existing hashes are untouched |
| CORS | Exact-origin allowlist. Non-Development **refuses to start** without HTTPS origins |
| Errors | Global handler returns `503` with no stack trace; security headers on every response |
| Swagger | Development only |

## Routes

**Customer** `/` `/search` `/product/:id` `/cart` `/checkout` `/wishlist` `/orders`
`/track/:id` `/invoice/:id` `/account` `/notifications` `/login` `/register`
`/about` `/contact` `/help` `/privacy` `/terms` `/refund-policy`

**Admin** `/admin` (orders, products, categories, inventory, customers, payments, coupons,
delivery, partner shops, reports, invoices, notifications, WhatsApp, settings, audit log)

**Partner** `/partner` · **Delivery** `/delivery`

## API

Public:
- `GET /api/products?q=&category=&brand=&sku=&minPrice=&maxPrice=&available=&sort=&page=&pageSize=&paginated=`
- `GET /api/products/{id}` · `GET /api/products/slug/{slug}`
- `GET /api/categories`
- `GET /api/delivery/options` · `POST /api/delivery/quote`
- `GET /api/locations/om-stationary`
- `GET /api/health`

Auth:
- `POST /api/auth/register` · `POST /api/auth/login` (email **or** mobile) · `POST /api/auth/refresh`
- `POST /api/auth/logout` · `GET /api/auth/me`

Customer (`Bearer`, role `Customer`):
- `GET|PUT /api/cart` · `POST /api/cart/items` · `PUT|DELETE /api/cart/items/{itemId}` · `POST /api/cart/merge`
- `GET|POST|DELETE /api/wishlist` · `POST /api/wishlist/{productId}/move-to-cart`
- `GET|PUT /api/customers/me` · `GET|POST /api/customers/addresses` · `PUT|DELETE /api/customers/addresses/{id}`
- `GET /api/customers/orders`
- `GET /api/notifications` · `POST /api/notifications/{id}/read` · `POST /api/notifications/read-all`
- `POST /api/coupons/validate`
- `POST /api/orders` (requires authentication)

Order read (owner / admin / tracking token):
- `GET /api/orders/{orderNumber}`
- `GET /api/orders/{orderNumber}/invoice`
- `GET /api/orders/{orderNumber}/invoice/pdf`

Order workflow:
- `GET /api/orders` (admin) · `GET /api/orders/status-workflow`
- `PATCH /api/orders/{id}/status` (admin, state-machine validated)
- `PATCH /api/orders/{id}/payment` (admin, **COD cash receipt only**)
- `POST /api/orders/{id}/delivery` (admin)

Admin (`Bearer`, role `Admin`), all under `/api/admin`:
- `dashboard`, `analytics`, `filter-options`, `customers`, `payments`, `invoices`, `wishlist`,
  `notifications`, `audit-log`, `reports`, `reports/export`
- `products`, `POST products`, `PUT products/{id}`, `DELETE products/{id}`, `POST products/{id}/stock`
- `categories`, `PUT categories/{id}`, `coupons`, `PUT coupons/{id}`
- `/api/admin/settings` store settings
- `/api/admin/whatsapp` settings, `test`, `{id}/retry`

Delivery:
- `GET /api/delivery/management/partners` (admin), `POST` (admin), `GET management/assignments` (admin)
- `GET /api/delivery/assignments` (DeliveryPartner), `PATCH /api/delivery/assignments/{id}/status`

Partner (`Bearer`, role `PartnerShop`), all under `/api/partner`:
- `POST /api/partner/register` — self-registration, creates an **unapproved** shop
- `GET|PUT /api/partner/shop` · `GET|PUT /api/partner/inventory`
- `GET /api/partner/orders` · `PATCH /api/partner/orders/{id}/status`
- `GET /api/partner/shops` (admin) · `PUT /api/partner/shops/{id}/approval` (admin)

A partner may only set an order to **Accepted, Preparing or Ready for Pickup**. Completion and
payment stay with the store.

## Order state machine

```
Placed/Pending -> Confirmed -> Preparing -> Ready for Pickup -> Out for Delivery -> Delivered
                                                   (pickup)         -> Picked Up -> Delivered
```
Invalid transitions are rejected by `OrderStateMachine`. Every accepted change writes an
`OrderStatusHistory` row. Partner settlement is created on **every** path that reaches `Delivered`,
not only the delivery-partner path.

## Payments

COD is fully functional. Online payment is **fail-closed**: with no gateway credentials configured,
`IPaymentGateway` resolves to `UnconfiguredPaymentGateway`, the UI shows "Online payment is currently
unavailable", and `PaymentStatus` is never marked `Paid` from a browser redirect, client callback or
unauthenticated poll. To enable Paytm QR, set `Payments__Enabled=true`, `Payments__Provider=Paytm`
and the `Payments__Paytm__*` values.

## WhatsApp / Email / SMS

`WhatsAppNotificationService` is event-driven (new order, confirmed, preparing, ready for pickup,
out for delivery, delivered, payment received, low stock, new customer). Settings persist to the
database via `/api/admin/whatsapp`; the **access token is never stored or returned** and must come
from configuration. With no credentials, WhatsApp stays disabled and production-safe.
Email and SMS are architectural placeholders — with no provider configured they report disabled
rather than pretending to send.

## Production configuration

Values must come from environment variables. Nothing sensitive is committed: `appsettings.json`
ships every secret blank.

```powershell
$env:ConnectionStrings__DefaultConnection = "Server=...;Database=OMStationaryDb;..."
$env:Jwt__SigningKey                      = "<random, >= 32 UTF-8 bytes>"
$env:Cors__AllowedOrigins__0             = "https://yourdomain.com"
$env:Admin__BootstrapEmail               = "admin@yourdomain.com"
$env:Admin__BootstrapPassword            = "<strong one-off password>"
```

The API **refuses to start** outside Development without a signing key and HTTPS CORS origins.

## Deliberate boundaries
- Online payment fails closed until gateway credentials and webhook verification are configured.
- Reviews are not implemented — there is no review backend, so the product page shows an honest
  empty state rather than fabricated reviews.
- Mobile OTP login and social login are not implemented; the UI does not advertise them.
- There is no automated test project. `dotnet test` has nothing to run.

## Builds
```powershell
cd frontend                  ; npm run build
cd backend\OMStationary.Api  ; dotnet build
```

See `PRODUCTION_DEPLOYMENT.md` for publish and deployment steps.