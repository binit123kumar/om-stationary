# Remaining Gaps and Manual Review

## Runtime and infrastructure

- API/browser integration could not be exercised because requests to `localhost:5000` failed in the supplied preview. Re-test using an intentionally configured local API and non-production data.
- Live SQL Server schema was not inspected. Compare a safe read-only catalog/schema report with the EF model and migrations before claiming deployed schema parity.
- Authenticated customer/admin/partner/delivery routes and authorization outcomes were not tested in a browser session.
- Payment gateway credentials and sandbox/production behavior, refunds, and settlement provider integrations were not exercised.
- WhatsApp, email and SMS providers were not contacted; delivery, retries, callback handling, and production credential readiness remain unknown.
- Physical iPhone/iPad/Android installability and offline behavior were not tested as part of this pass.

## Source mapping and test coverage

- Static source tracing can miss dynamically constructed URLs, reflection, implicit framework behaviors, dependency injection indirection, and runtime-only registrations. `NOT_MAPPED` items in detailed reports need source/runtime follow-up.
- Only the existing backend test project is present in inspected scope. The frontend package does not declare an automated test script/suite. Existing 14 backend tests are not comprehensive feature integration coverage.
- Verify whether route-guard assumptions in the frontend align with backend action-level attributes/policies; front-end hiding/redirecting is not an authorization boundary.
- Confirm which message/provider paths are expected to run in production and which configuration values are provisioned outside the repository; secrets are intentionally not recorded.
- Data retention and privacy expectations for account, address, order, invoice, notification, cart, and audit data require business/security confirmation beyond the code mapping.

## Database-specific

- The inventory documents `DbSet`, EF mapping, and migration source. It does not establish live table names/schema, whether all migrations have been applied, or whether out-of-band schema changes exist.
- EF conventions can determine table names where no explicit mapping exists, but table-name convention, cascade behavior, SQL type/nullability, and provider-generated constraints should be checked against a real read-only model/schema if exact deployed DDL is required.
- Two public types in `Models.cs` are static notification-constant classes, not EF entities. The remaining 30 classes align by name with the 30 declared `DbSet<T>` properties; this reflects source configuration only, not a verified live SQL Server schema. Table reports classify those declared entity mappings and do not infer production database state.

## Naming/archival caveats

- Tracked historical `*.before-*` frontend snapshots are retained and should not be treated as active pages or runtime modules without a specific recovery/compare task.
- Existing naming audit was focused; it did not claim a compiler-verified assessment of every local identifier. This classification pass likewise records unclear names instead of guessing.
