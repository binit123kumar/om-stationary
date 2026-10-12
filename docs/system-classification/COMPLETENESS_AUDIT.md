# Completeness audit

## Scope and evidence basis

Audit scope is the active React/Vite source under `frontend/src/`, the ASP.NET Core API and test source under `backend/`, and EF Core model/migration declarations. Counts below are source inventory counts; they do not imply build, runtime, or database validation. Detail reports are linked from the [route inventory](evidence/route-inventory.md), [frontend inventory](evidence/source-inventory.md), [backend scope](backend/scope-summary.md), and [database index](database/_index.md).

## Inventory coverage

| Area | Source inventory | Report coverage | Completeness note |
|---|---:|---:|---|
| Concrete route declarations | 51 | All mapped in the route inventory | 50 distinct page keys/modules; product create/edit routes share one page. |
| Wildcard route | 1 | Included in route inventory | Reuses HomePage; not counted as a separate page. |
| Active route-level page modules | 50 | 50 individual reports | Three other page-folder modules are shared/non-route files, not dispatched by `RouteView`. |
| Project-owned component modules | 122 | 122 individual reports | Caller reachability is not exhaustively modeled. |
| Root React modules | 4 | 4 individual reports | Separate from component-folder count. |
| Frontend services | 14 | 14 individual reports | Frontend request calls have a separate inventory. |
| Frontend hooks | 12 | 12 individual reports | Source patterns, not runtime hook execution. |
| Frontend utilities | 7 | Group-level classification | Not every helper has an individual report. |
| Frontend `fetch`/`apiFetch` call expressions | 103 | Call-site inventory | Static count; not necessarily 103 distinct URLs/actions. |
| Backend controller files/classes | 19 / 21 | Individual class/action inventory | Multiple controller classes occur in a source file. |
| Controller action attributes / minimal endpoints | 90 / 1 | All controller actions and health endpoint indexed | Source declarations, not effective runtime routing. |
| Backend services, DTOs | 17 source files / 23 types | Service and DTO reports | 80 callable and 44 support-type reports; see backend scope notes. |
| EF DbSets/entity reports | 30 | 30 entity table reports | 273 scalar CLR properties across the reported entities. |
| Hand-authored migrations | 5 | 5 migration reports | Generated designers and snapshot counted separately. |
| Backend test declarations | 2 source files / 14 `[Fact]` methods | Test inventory | **NOT TESTED** in this classification pass. |

## Cross-layer coverage

- The [feature matrix](FEATURE_IMPLEMENTATION_MATRIX.md) summarizes 14 business domains; individual flow reports trace UI/service/API/entity paths.
- The [mapping matrix](FRONTEND_BACKEND_DATABASE_MAPPING.md) records the source-supported cross-layer connections and key distinctions.
- The [API matrix](MASTER_API_MATRIX.md) links the complete row-level endpoint inventory and controller/action reports.
- The [database matrix](MASTER_DATABASE_MATRIX.md) links all declared EF entities to individual property and relationship reports.
- `AdminCategoriesPage` is present as an active Admin route and its service/controller/entity flow is explicitly traced.
- Route declarations without matching `RouteView` imports/branches: 0 detected. `RouteView` keys without route declarations: 0 detected.
- Service, dynamic import, reflection, component reachability and indirect data access are not exhaustively proven by lexical inventory. Uncertain usage is not classified as dead code.

## Known source gaps and unverified edges

1. UPI provider verification is not mapped; source reports payment status with `verified=false`.
2. A `Refund` entity and order-state transitions exist, but provider-side refund execution is not mapped to a dedicated controller/service operation.
3. The admin WhatsApp settings path changes runtime configuration and writes an audit entry; durable `StoreSettings` persistence for that path was not mapped.
4. Public product-derived categories and admin `Category` CRUD are distinct source paths.
5. EF and migration declarations do not confirm the deployed database schema or applied migrations.
6. API, database and external provider availability were not established. Prior browser preview observed API calls blocked/unavailable; see [runtime status](RUNTIME_TEST_STATUS.md).

## Source and runtime status

Source inventory coverage: **PASS** for the listed active route/page/component/service/hook/backend action/entity sets as documented. “PASS” here means reports exist for the declared scope; it is not a runtime pass.

Frontend/backend builds and prior backend tests documented in [runtime test status](RUNTIME_TEST_STATUS.md) are historical evidence from the earlier implementation work, not re-run for this documentation-only classification. Live API/database/payment/notification integration and physical devices remain **NOT TESTED** or **BLOCKED** as specified there.
