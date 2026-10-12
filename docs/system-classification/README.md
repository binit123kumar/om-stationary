# OM Stationary System Classification

This directory documents the actual React/Vite storefront, ASP.NET Core API, EF Core declared schema, and their source-supported relationships. It is a **static source classification**, not a claim that production services or database records were exercised.

## Start here

- [Project architecture](PROJECT_ARCHITECTURE.md)
- [Page/component matrix](MASTER_PAGE_COMPONENT_MATRIX.md) and [CSV](MASTER_PAGE_COMPONENT_MATRIX.csv)
- [API matrix](MASTER_API_MATRIX.md)
- [Database matrix](MASTER_DATABASE_MATRIX.md)
- [Feature implementation matrix](FEATURE_IMPLEMENTATION_MATRIX.md)
- [Frontend-to-backend-to-database mapping](FRONTEND_BACKEND_DATABASE_MAPPING.md)
- [Completeness audit](COMPLETENESS_AUDIT.md)
- [Unconnected features](UNCONNECTED_FEATURES.md)
- [Missing implementations](MISSING_IMPLEMENTATIONS.md)
- [Runtime test status](RUNTIME_TEST_STATUS.md)
- [Remaining gaps](REMAINING_GAPS.md)

## Detailed inventories

- [Pages](pages/)
- [Components](components/)
- [Frontend modules](frontend/)
- [Backend controllers, endpoints, services, contracts and configuration](backend/)
- [Database tables, columns, relations, constraints and migrations](database/)
- [Feature-by-feature flows](feature-flows/)
- [Evidence and source inventories](evidence/)

## Classification rules

Source status and runtime status are separate:

| Source classification | Meaning |
|---|---|
| `IMPLEMENTED_IN_SOURCE` | Relevant logic is present in inspected source |
| `PARTIALLY_IMPLEMENTED` | Some but not all relevant flow/requirements are present |
| `MISSING_IN_SOURCE` | Search of documented scope found no implementation |
| `NOT_MAPPED` | Source exists but a downstream connection is not verified |
| `NOT_APPLICABLE` | The layer does not reasonably apply |
| `NEEDS_REVIEW` | Source evidence is ambiguous |

| Runtime classification | Meaning |
|---|---|
| `RUNTIME_PASS` | The specified runtime check actually passed |
| `RUNTIME_FAIL` | An executed check failed |
| `BLOCKED` | An identified blocker prevented the check |
| `NOT_TESTED` | No runtime test was performed |

Every status should include an evidence note. A build pass proves compilation/bundling only; it does not prove end-to-end behavior. Source migrations describe a declared schema, not a live database snapshot. Connection strings and provider secrets must never be copied into classification reports.

## Scope and limitations

The active source roots are `frontend/src/` and `backend/OMStationary.Api/`, with backend tests under `backend/OMStationary.Api.Tests/`. Generated dependencies/build output and tracked historical snapshots are not active pages or reusable components. The complete counts, route exceptions, exclusions and unverified connections are in the [completeness audit](COMPLETENESS_AUDIT.md).

The browser preview previously reached the storefront but calls to `localhost:5000` were unavailable. SQL Server, production database schema, authenticated admin/partner/delivery flows, payment provider, email/SMS/WhatsApp delivery are not established by static inspection. See [runtime test status](RUNTIME_TEST_STATUS.md).
