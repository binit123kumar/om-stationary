# Backend Reference Index

The backend is the ASP.NET Core API in `backend/OMStationary.Api/`. Reports are static source documentation; they do not assert that SQL Server, API endpoints, authentication providers, or external notification/payment services are available at runtime.

- [Controllers](Controllers/) — controller classes, route attributes, authorization attributes, and action behavior.
- [Services](Services/) — service, provider, interface, helper, and related type reports.
- [Data access](Data/) — EF Core context, design-time factory, and safe migration bootstrap.
- [Program startup](Program.cs.md) — host configuration, dependency injection, middleware, and endpoint composition.
- [Backend methods and actions](../functions-methods/backend/) — individual controller action, service/helper, data/bootstrap, and Program callable reports.
- [Models and DTOs](../models-dtos/) — entity/value and request/response type reports.
- [Database and migrations](../database/) — migration operations and model snapshot notes.
- [Tests](../functions-methods/tests/) — individual test/helper callable and test-class reports.
- [Backend scope summary](../_backend_scope_summary.md) — exact inventory counts and static-parser limitations.

Source-root counts: 19 controller files, 17 service files, 3 data/bootstrap files, 3 DTO files, and one model source file. See the [completeness audit](../COMPLETENESS_AUDIT.md) for report totals and explicit exclusions.
