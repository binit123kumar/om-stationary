# Backend implementation reference

## Scope and evidence

- [Backend scope, counts, exclusions, and ambiguities](scope-summary.md)
- [Controller and service class/type catalog](class-type-catalog.md)
- [HTTP endpoints: routes, verbs, source auth, request signatures, and action-report links](../evidence/endpoint-inventory.md)
- [Individual controller action reports](actions/_index.md)
- [Minimal health endpoint report](actions/Program.Health.md)
- [Service, helper, and support-type reports](services/_index.md)
- [DTO request/response type reports](types/dtos/_index.md)
- [EF context, design-time factory, and migration bootstrap](data-access.md)
- [Model status/type constants](types/models/)
- [Backend test inventory (source only; not run)](tests.md)
- [Existing per-action and per-method implementation reports](../../codebase-reference/backend/_index.md#backend-methods-and-actions)
- [Existing service class and type reports](../../codebase-reference/backend/_index.md#services)
- [Database entities, declared columns, migrations, and connection configuration](../database/_index.md)

## Interpretation

Reports are static source descriptions. Routes, authentication, services, EF mappings, and migrations are not claimed to be active at runtime. No tests were run for this documentation task; all test status is **NOT TESTED**.
