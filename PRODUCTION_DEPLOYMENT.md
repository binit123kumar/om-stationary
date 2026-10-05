# OM Stationary production deployment checklist

This project has no hosting platform or production domain configured. This checklist records the verified build state and the values the owner must supply before a real deployment.

## What is already in the project

- React/Vite storefront and ASP.NET Core 10 API, backed by EF Core and SQL Server.
- Five EF migrations: `20260929022303_InitialMvpSchema`, `20260929030714_MvpFoundation`, `20260930065632_OmStationaryDirectCommerce`, `20261003093401_AdminStoreSettingsAndAuditValues`, and `20261003110615_WhatsAppNotifications`.
- JWT access tokens (15 minutes) and hashed, revocable refresh tokens (30 days); password hashes use ASP.NET Identity's `PasswordHasher`.
- Admin bootstrap creates an account only when both `Admin:BootstrapEmail` and `Admin:BootstrapPassword` are set and that email does not already exist. Password is hashed.
- Order checkout reads product/partner stock and prices from SQL. Stock decrements use conditional SQL updates inside the order transaction, so competing orders cannot reduce stock below zero.
- API checks the configured delivery city and PIN, requires customer coordinates, and selects stock from eligible shops within `Delivery:MaxRadiusKm`.
- COD is implemented. Paytm QR/status integration is present but disabled in the checked-in configuration.

## Build and migration verification (2026-10-04)

- Frontend `npm run build`: **PASS**. Vite emitted dependency warnings about module-level `use client` directives.
- Backend `dotnet clean` and `dotnet build --configuration Release`: **PASS**, 0 errors and 4 nullable warnings in `Controllers/WishlistController.cs`.
- `dotnet ef migrations list --configuration Release`: found five migrations (including store settings/audit and WhatsApp notifications). SQL Server at `localhost\SQLEXPRESS` was unreachable, so applied/pending status is **unknown**. EF tool 8.0.30 is older than runtime 10.0.0.
- Git branch is `feature/customer-flow`. There were pre-existing local edits and backup files when this inspection began; they have been preserved.
- No order/auth/delivery/admin E2E flow or live database migration was run. Do not treat those flows as verified.
- Secret scan found a committed, fixed development bootstrap admin credential. It has been removed from `appsettings.Development.json`; configure local bootstrap credentials through environment variables if needed.

## Required production configuration

Set these as deployment secrets or environment variables, never in frontend source or committed settings:

```text
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=<production SQL Server connection string>
Jwt__SigningKey=<random secret, at least 32 UTF-8 bytes>
Jwt__Issuer=<chosen stable issuer>
Jwt__Audience=<chosen stable audience>
Cors__AllowedOrigins__0=https://<actual-storefront-hostname>
Admin__BootstrapEmail=<owner-controlled admin email>
Admin__BootstrapPassword=<unique strong one-time bootstrap password>
Admin__BootstrapPhone=<verified admin phone>
Shop__RegistrationKey=<random key, only if the partner registration flow uses it>
VITE_API_URL=https://<actual-api-hostname>
```

The actual domain names and SQL host are intentionally not invented. For more than one storefront origin, provide the indexed `Cors__AllowedOrigins__1`, etc. Production API startup now rejects missing, non-HTTPS, or loopback CORS origins. Development localhost origins remain in `appsettings.Development.json`.

The repository's current base SQL setting is `localhost\\SQLEXPRESS;Database=OMStationaryDb` with Windows integrated authentication. This is a local development setting, not a production connection string. On the inspected workstation, the `MSSQLSERVER` Windows service was running, but the configured `SQLEXPRESS` connection failed. Supply and verify the intended SQL instance and database before deployment.

The bootstrap admin is created only once. Store the bootstrap password securely, sign in after first startup, then remove `Admin__BootstrapPassword` from the deployment environment. If the admin already exists, changing bootstrap settings will not reset its password. No bootstrap credentials are committed in development settings.

## Store and delivery values to confirm

The settings currently contain an OM Stationary address and coordinates in Sohgi/Sampatchak, Patna, hours of 9 AM–9 PM, delivery radius 20 km, configured Patna PIN codes, and a ₹40 delivery charge. These are existing project values and have **not** been confirmed by the owner for production. `Billing:Phone`, `Billing:Email`, `OmStationary:Phone`, and `OmStationary:Email` are blank. Verify/replace these values and verify the serviceable PIN list and charge before enabling delivery.

Other current values: tax rate is 0%; settlement commission is unset. Confirm applicable billing/tax settings and whether there is a minimum order value (none was found in configuration). Catalog data is seeded with sample products only when the database is empty; replace/verify catalog, prices, photos, and inventory before opening the shop.

## Database, migrations, and recovery

1. Provision a production SQL Server database and a dedicated application login. Because the application currently applies migrations on startup, that login needs schema migration rights as well as normal application CRUD rights. Prefer a deployment-only migration identity with DDL rights and adjust startup migration behavior before using a narrower runtime identity.
2. Back up the database before the first migration and before catalog/order data imports. The project does not configure or verify backups. Configure automated encrypted backups and retention in the SQL hosting platform; a reasonable initial owner-reviewed policy is daily backups with point-in-time recovery if available.
3. Restore to a separate database periodically and document the recovery point. Migrations are forward-applied; rollback requires restoring a backup or a reviewed compensating migration. Do not delete migration history or guess at a production schema baseline.
4. Deploy to a staging database first. Run `dotnet ef migrations list` with the staging connection and apply/inspect migrations there. The API's startup migration behavior will apply them when it can connect.
5. After deployment, verify `GET /api/health` returns API and database healthy, then verify catalog reads and authorized admin access against staging before customer traffic.

## Remaining release gates

- Choose hosting provider, frontend/API hostnames, SQL Server host/database, HTTPS certificates, and secret storage.
- Verify store contact/address, product catalog/stock/prices, delivery PIN codes/radius/charge, tax settings, and admin account.
- Set the required environment above. Keep `Payments__Enabled=false` until real Paytm credentials and a sandbox end-to-end payment verification are available. COD remains the configured payment path.
- Run staging checks for migrations, registration/login/refresh/logout, unauthorized/admin authorization, pickup COD, delivery quote and order, stock concurrency, invoice ownership, notifications, and admin status transitions.
- Configure database backup/restore and platform monitoring. No DNS or backup is configured by this repository.
- Rebuild the frontend with the actual `VITE_API_URL`; validate HTTPS API calls and CORS preflight from the deployed storefront origin.

## Exact build and publish commands

Run from the repository root after setting the production API URL for the frontend build:

```powershell
$env:VITE_API_URL = 'https://<actual-api-hostname>'
Push-Location .\frontend
npm ci
npm run build
Pop-Location

Push-Location .\backend\OMStationary.Api
dotnet clean
dotnet build --configuration Release
dotnet publish --configuration Release --output ..\..\publish\api
Pop-Location
```

Publish `frontend/dist` to the selected static web host and `backend/publish/api` to the selected ASP.NET host. Configure SPA fallback to `index.html` and serve both hosts only over HTTPS. These commands build/publish artifacts; they do not deploy them.

## Current release decision

**Status: CODE READY — PRODUCTION CONFIGURATION REQUIRED. NO-GO for production today.** Frontend and backend release builds pass. Production host/domain, production SQL Server, secrets, HTTPS/CORS origins, backup/restore, live database migration state, and customer/admin E2E remain unverified. COD is implemented in code; online payment is disabled unless Paytm credentials and verification are configured. WhatsApp is explicitly disabled until Business Cloud API credentials are supplied. Do not claim a successful production deployment until staging and release gates above pass.
