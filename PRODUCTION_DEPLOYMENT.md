# Production deployment and release gates

**Release status: NO-GO as of 2026-10-06.** The local application and database work, but external
payment verification, provider credentials, an Admin acceptance run, browser verification, and Docker
validation are still outstanding. This document reflects the current source and observed local
environment; it does not claim a production deployment.

## What was verified locally

- Frontend `npm install` and `npm run build` succeed. The build has four upstream `use client`
  directive warnings from React Router and Lucide. Admin charts are lazy-loaded; neither emitted JS
  chunk exceeds 500 KB.
- API Debug and Release builds succeed with zero compiler warnings.
- Backend unit tests: 14 passed, 0 failed, 0 skipped (order state transitions, notification
  normalization, SMTP/Twilio behavior).
- SQL Server `BINIT` connected to `OMStationaryDb`; `/api/health` returned API/database healthy.
- All five repository migrations are present in `__EFMigrationsHistory`; no migration was pending.
- API customer smoke checks covered registration/login, refresh rotation/revocation/logout, role
  separation, cart, wishlist, UPI initiation, invoice ownership, and order history. Disposable test
  data was removed and stock restored. The payment status response was fixed and retested.
- Docker CLI/engine and a browser session are unavailable here. Container build, Compose validation,
  browser console, mobile layout, CORS in a real browser, and full Admin/Partner/Delivery acceptance
  are not verified.

## Production configuration

Store secrets in the deployment platform's secret manager. Do not commit `.env` files, signing keys,
database credentials, provider tokens, or bootstrap passwords. Compose needs:

```text
MSSQL_SA_PASSWORD=<unique SQL Server SA password>
OM_JWT_SIGNING_KEY=<random secret, at least 32 UTF-8 bytes>
OM_STORE_ORIGIN=https://<exact-storefront-origin-without-path>
TLS_CERT_DIR=<host directory containing fullchain.pem and privkey.pem>
```

`docker.env.example` lists optional integration values. Copy it to an ignored `.env` for local Compose
use and fill all required values. For production, inject secrets through a secret manager rather than
relying on a developer `.env` file. The application checks signing-key length and requires an exact
HTTPS CORS origin outside Development; the owner must supply a high-entropy key.

An Admin can be bootstrapped once with `OM_ADMIN_EMAIL`, `OM_ADMIN_PASSWORD`, and `OM_ADMIN_PHONE`.
`Admin__BootstrapOverwritePassword` is false. After the account is created, remove the bootstrap
password from the deployment environment. Admin notification destinations are separate optional
values: `OM_ADMIN_NOTIFICATION_EMAIL` and `OM_ADMIN_NOTIFICATION_PHONE`.

Compose keeps SQL Server and the API private to its network. Nginx redirects HTTP to HTTPS, serves
the SPA, and proxies `/api` to the API. Provide a valid TLS certificate directory before starting
the frontend. The Compose SQL connection currently trusts the SQL Server container certificate;
configure and validate a trusted SQL certificate and disable `TrustServerCertificate` before using
an external production SQL Server.

The Compose defaults explicitly disable UPI, delivery, WhatsApp, email, and SMS. Confirm the business
address, tax/billing identifiers, catalogue, inventory, delivery areas, charges, and provider settings
before enabling those features. Development sample products are not seeded in Production. The
checked-in local `appsettings.json` includes store/payment
configuration values; Compose overrides UPI to disabled/blank and pickup address to blank until the
operator supplies deployment values.

## Payments

The local API reports UPI initiation configured. It creates an exact-amount `upi://pay` intent and
keeps the order pending. The application does **not** verify payment through a signed webhook,
provider status API, or callback. The customer UI cannot confirm payment. Automated online refunds
are also not implemented.

Required release work:

1. Select a payment provider and configure its real production credentials in secret storage.
2. Implement and test provider signature verification and idempotent callback/status handling.
3. Match provider transaction reference, currency, amount, and order before marking Paid.
4. Implement the provider refund path and failure/reconciliation handling, or keep online payment
   disabled and use COD only.
5. Run provider sandbox and real low-value acceptance tests without using production customer data.

Until those gates pass, report **PAYMENT INITIATION = PASS**, **PAYMENT VERIFICATION = NOT
IMPLEMENTED**, **PAYMENT E2E = BLOCKED** for the current local UPI configuration. For a deployment
without UPI configuration, initiation is also blocked.

## WhatsApp, email, and SMS

- **WhatsApp:** Current provider value is the placeholder `Your API`; it is disabled and credentials
  are blank. The UI/settings/log/retry API exists, but actual sending is not verified. Configure a
  WhatsApp Business Cloud API app, phone-number ID, access token, recipient, and approved templates;
  then send a controlled test message and verify the provider result.
- **Email:** SMTP delivery code is connected to order creation/status/payment events for customers
  and new-order alerts for a configured admin recipient. SMTP host, credentials, and sender are blank
  and disabled in the checked-in config. Configure a real SMTP service, test accepted and rejected
  sends, then verify inbox delivery and bounce handling.
- **SMS:** Twilio REST send code is connected to the same customer order events and configured admin
  new-order alerts. Credentials and sender are blank and the service is disabled. Twilio acceptance
  is not proof of handset delivery; delivery callbacks/status reconciliation remain to be added.

Do not enable an integration until its recipient, sender, event toggles, credentials, provider-side
template/consent requirements, failure alerts, and retention policy are reviewed.

## Authentication and security

- JWT HS256 checks signature, issuer, audience, expiry, active user, and current role. Refresh tokens
  are hashed at rest and rotate on refresh; logout revokes them.
- Admin APIs enforce the Admin role. A Customer token was verified to receive 403 on Admin,
  Partner, and DeliveryPartner role-protected surfaces.
- Order/invoice reads require owner, Admin, or a tracking token. An anonymous order read was denied.
- CORS has exact-origin configuration; Production refuses loopback/non-HTTPS origins.
- Rate limits cover auth/order writes and tracking reads.
- Do not expose Swagger outside Development. Use HTTPS at the reverse proxy and keep SQL/API
  services private. Configure backups, restore tests, monitoring, log retention, and secret rotation.

**Not implemented:** Google login/token verification, forgot-password/reset-password endpoints and
reset-token storage, provider-verified online payments, and automated gateway refunds. The current
database has no `PasswordResetTokens` table.

## Database migration and recovery

The local `OMStationaryDb` has these five migrations applied:

1. `20260929022303_InitialMvpSchema`
2. `20260929030714_MvpFoundation`
3. `20260930065632_OmStationaryDirectCommerce`
4. `20261003093401_AdminStoreSettingsAndAuditValues`
5. `20261003110615_WhatsAppNotifications`

The API uses a safe migration bootstrap for recognized schemas. Before production:

1. Provision a separate production database and least-privilege application identity.
2. Take an encrypted backup and verify a restore to a separate database.
3. Run `dotnet ef migrations list` against staging, review the generated SQL, and apply there first.
4. Run health, catalogue, customer, Admin, Partner, Delivery, invoice, and notification checks on
   staging before production traffic.
5. Keep a tested restore/rollback plan. Never drop or reset an existing production-like database to
   make a migration pass.

## Docker commands

Docker was not installed in the current environment, so these commands remain unverified here:

```powershell
docker compose config
docker compose build
docker compose up -d
docker compose ps
```

Before running them, fill required values in the deployment environment and provide TLS certificates.
The Dockerfile uses an explicit API source path, publishes the API, builds the SPA with an empty
same-origin API base, and excludes local secrets, build output, backups, and smoke-test artifacts
through `.dockerignore`.

## Go-live checklist

| Gate | Status | Evidence / remaining work |
|---|---|---|
| Frontend production build | PASS | Vite build succeeds; four upstream directive warnings remain |
| API Debug/Release builds | PASS | Both succeed with zero warnings |
| Backend unit tests | PASS | Current suite passes; includes state machine and notification tests |
| SQL Server and migrations | PASS | Local `OMStationaryDb` healthy; all five migrations applied |
| Customer auth/cart/order smoke checks | PASS | Local API flows passed; test data was cleaned up |
| Admin acceptance with a real Admin account | BLOCKED | No Admin credentials/account available for an end-to-end sign-in run |
| Partner and delivery acceptance | BLOCKED | Requires role-specific accounts and assigned delivery data |
| Online payment initiation | PASS (local) | Exact-amount UPI deep link generated |
| Online payment verification/refunds | FAIL / NOT IMPLEMENTED | No verified callback/webhook or provider refund path |
| Google login | FAIL / NOT IMPLEMENTED | No route, client ID, or backend token validation |
| Password reset | FAIL / NOT IMPLEMENTED | No endpoints or reset-token table |
| WhatsApp actual send | BLOCKED | Placeholder provider and no credentials |
| SMTP/SMS actual delivery | BLOCKED | Providers disabled and credentials absent |
| Desktop/mobile browser console | BLOCKED | No browser session available in the environment |
| Docker build and Compose validation | BLOCKED | Docker CLI/engine unavailable |
| Domain, TLS, monitoring, backups, owner business data | BLOCKED | Must be supplied and verified by the operator |

## Final release decision

**GO-LIVE: NO.** The required top blockers are:

- **P0 — Payment:** UPI initiation is not payment verification; signed callbacks/status verification
  and online refunds are not implemented. Keep UPI disabled for production until completed.
- **P0 — Deployment/security configuration:** Supply production SQL credentials, a high-entropy JWT
  key, exact HTTPS origin, verified TLS certificates, owner-approved business settings, backups,
  and monitoring. The Compose stack has not been built or run here.
- **P1 — External services:** Configure and verify WhatsApp, SMTP, and Twilio accounts, then prove
  accepted and delivered/failed outcomes with controlled test recipients.
- **P1 — Acceptance testing:** Run desktop/mobile browser checks and complete Admin, Partner, and
  DeliveryPartner workflows using least-privilege staging accounts.
- **P2 — Account recovery/social auth:** Implement and test secure password reset and Google login
  if they are required for launch.
