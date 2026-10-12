# OM Stationary Codebase Reference

This directory documents the current project-owned source in plain language. It is a documentation layer only: application sources, database files and existing implementation/cleanup reports are not changed by this reference effort.

## Actual project areas

| Area | Source root | Documentation |
| --- | --- | --- |
| React route registration and app composition | `frontend/src/App.jsx`, `RouteView.jsx`, `components/layout/` | [Frontend pages](pages/), [components](components/) |
| Route-level customer/admin/partner/delivery UI | `frontend/src/pages/` | [Page reports](pages/) |
| Shared and feature UI | `frontend/src/components/` | [Component reports](components/) |
| API clients | `frontend/src/services/` | [Service reports](services/) |
| React stateful hooks | `frontend/src/hooks/` | [Hook/context reports](hooks-context/) |
| JS utilities/configuration | `frontend/src/utils/` | [Hook/context and utility reports](hooks-context/) |
| ASP.NET Core startup, controllers and services | `backend/OMStationary.Api/` | [Backend reports](backend/_index.md) |
| Request/response contracts and entities | `backend/OMStationary.Api/Dtos/`, `Models/` | [Model and DTO reports](models-dtos/_index.md) |
| EF Core context, migrations and snapshot | `backend/OMStationary.Api/Data/`, `Migrations/` | [Database reports](database/_index.md) |
| Automated backend tests | `backend/OMStationary.Api.Tests/` | [Test method reports](functions-methods/tests/_index.md) |
| Runtime, styling, PWA and hosting configuration | `frontend/`, `Dockerfile`, `docker-compose.yml`, `nginx.conf` | [Runtime overview](app-runtime.md), [configuration reports](configuration/) |

Generated and third-party code (`node_modules`, `.git`, `bin`, `obj`, `dist` and tool caches) is excluded. Dependencies and their project-level use are mentioned only where relevant.

## Route and page index

Routes are registered in [`frontend/src/App.jsx`](../../frontend/src/App.jsx) and resolved by [`frontend/src/RouteView.jsx`](../../frontend/src/RouteView.jsx). All actual page files and route mapping are indexed in the [page reports](pages/). Pages with multiple route paths share one source/report where the router points them to the same component.

## Component index

Every project-owned React component under `frontend/src/components/` is documented in its source-aligned subdirectory in [components/](components/). The component report distinguishes shared widgets from feature-specific components and links to the source.

## Function and method index

Detailed function/method documents are grouped by language and source path:

- [Frontend functions and methods](functions-methods/frontend/)
- [Backend functions and methods](functions-methods/backend/_index.md)
- [Test functions and methods](functions-methods/tests/_index.md)

Each report documents source identity, behavior, parameters, return/state effects, calls, errors and tests when verifiable. Named frontend declarations and backend callable signatures have individual reports. A small set of anonymous frontend runtime callbacks has individual reports; other inline callbacks are explicitly counted/listed as exclusions in source indexes. Backend anonymous lambdas are not individually indexed; limitations are recorded in the [completeness audit](COMPLETENESS_AUDIT.md).

## Service, hook and utility index

- [Frontend services](services/)
- [Hooks, context and utilities](hooks-context/)
- [Backend services and host configuration](backend/_index.md)
- [Models and DTOs](models-dtos/_index.md)
- [EF Core context and migrations](database/_index.md)
- [Project configuration and deployment](configuration/)
- [Stylesheets](styles/)

## Verified call relationships

- [Function call map](FUNCTION_CALL_MAP.md) records major page-to-API-to-controller flows and explicitly marks runtime/unverified edges.
- [Frontend runtime map](app-runtime.md) documents route composition, active stylesheets, PWA resources and build/deployment inputs.

## Coverage and limitations

- [Completeness audit](COMPLETENESS_AUDIT.md) records actual identified/documented totals and discovery limitations.
- Runtime SQL Server schema is `NOT VERIFIED` unless a runtime connection/query is separately recorded.
- The prior browser preview could not reach the API at `localhost:5000`; service responses, live DB state and external provider calls must not be inferred from static code.
- Frontend automated test coverage is not declared in the frontend package scripts; backend tests are indexed separately.

## Maintenance guide

1. For route changes, update `frontend/src/App.jsx`, `frontend/src/RouteView.jsx` as required, then the corresponding route-level page and page report.
2. For reusable UI, locate the owning source under `frontend/src/components/` and check all callers in its component report.
3. For API contract changes, trace the frontend service and backend controller action, then DTO/model and persistence mapping reports.
4. For backend rules, update the service or controller that owns the behavior; use the method report and call map to identify dependants.
5. For schema changes, inspect `OmDbContext` and add a new EF migration through the established migration workflow. Do not edit generated migration history casually; verify a database backup/runtime state independently.
