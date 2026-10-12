# Backend scope summary

## Counts from source inspection

Counts cover `backend/OMStationary.Api/` and `backend/OMStationary.Api.Tests/`; generated `bin` and `obj` files are excluded.

| Area | Source count | Evidence / notes |
|---|---:|---|
| Controller source files | 19 | `backend/OMStationary.Api/Controllers/*.cs` |
| Controller declarations | 21 | Some files contain multiple controller classes. |
| HTTP action attributes | 90 | Count of source `[Http...]` attributes across controller files. |
| Minimal mapped health endpoint | 1 | `GET /api/health` in `Program.cs`, outside controller attributes; see [endpoint inventory](../evidence/endpoint-inventory.md). |
| Service source files | 17 | `backend/OMStationary.Api/Services/*.cs`; local class/type/method reports are indexed in [services](services/_index.md). |
| Data/bootstrap source files | 3 | `OmDbContext`, design-time factory, and safe migration bootstrap. |
| DTO source files | 3 | `AuthRequests.cs`, `CatalogRequests.cs`, `OrderRequests.cs`; 23 local DTO/request/response type reports. |
| Model source files | 1 | `Models.cs`; 30 entity classes, 2 static status/type constant classes. |
| DbSet entity/table declarations | 30 | One generated report per DbSet-backed entity; 273 scalar CLR properties across those entities. |
| Individual controller class/action reports | 21 / 90 | Twenty-one class reports; 90 controller-action inventory rows linking 90 distinct route action reports. One minimal endpoint has a separate report. Two unlinked parser-generated controller summaries are retained but excluded from the callable count. |
| Individual service/support callable/type reports | 80 / 44 | Source-linked reports copied into the local service index from prior method/type summaries; source files remain authoritative. |
| Individual request/response DTO reports | 23 | Reports for the three DTO declaration files. |
| Hand-authored migrations | 5 | Designer companions are metadata for the same five migrations, not additional migrations. |
| Generated migration designer companions / model snapshot | 5 / 1 | Generated EF model metadata, not separate hand-authored schema changes. |
| Test source files / `[Fact]` methods | 2 / 14 | Source inventory only. **NOT TESTED** for this task. |

## Report navigation

- The endpoint inventory lists each source verb, combined route template, controller-level or action-level `[Authorize]` declaration (and manual order-access checks where applicable), request signature, source-return status helper codes, and links to the method-specific report. Those reports describe calls and data access.
- The existing backend reference contains separate callable reports for controller actions/helpers, service/interface/helper methods, data/bootstrap methods, startup callables, and test callables. See [backend reference index](../../codebase-reference/backend/_index.md).
- The [class/type catalog](class-type-catalog.md) points to local class/type reports and primary source declarations.
- The [database index](../database/_index.md) links all 30 entity table/column reports and migration summaries.

## Exclusions and ambiguities

- No source, configuration, tests, or existing documents were changed; this deliverable adds documentation only within `docs/system-classification/backend/`, `docs/system-classification/database/`, and `docs/system-classification/evidence/endpoint-inventory.md`.
- Route/action and method inventory is attribute/declaration based. It does not prove effective runtime route registration, inherited framework behavior, or that the API can start.
- Generated source summaries are secondary navigation aids. For complex branches, authorization inheritance, expression-bodied methods, callbacks, or framework behavior, inspect the linked C# source.
- Two action overload groups (`ProductsController.Get` and `OrdersController.Get`) share method names; reports and routes include signature/route qualifiers to avoid conflating them.
- The model has both the legacy string `Product.Category` field and nullable `Product.CategoryId` relationship to `Category`; do not silently equate or merge them.
- `Invoice.CustomerId`, several audit/history actor IDs, and entity properties without configured foreign keys are recorded as declared fields only; no relationship is inferred where the context does not declare one.
- Migration files and the model snapshot describe intended source schema. The live SQL Server schema, migration application state, and runtime database connectivity are **NOT VERIFIED**.
- No tests were run. The 14 `[Fact]` methods are test declarations, not passing results.
