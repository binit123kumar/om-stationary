# Backend reference scope summary

Generated source inventory rooted at `backend/OMStationary.Api` plus tests `backend/OMStationary.Api.Tests`. Source counts exclude `obj`/`bin`.

## Documented inventory
- Controllers: 19 source files containing 21 controller classes and 90 attribute-decorated HTTP action methods; class/action reports are present.
- Services: 17 source files; 17 service source files documented by class reports.
- Data access/support: 3 files; 3 source files documented.
- DTO files: 3; DTO type reports: 23.
- Model files: 1 (`Models.cs`); model types: 32.
- Controller/service/data callable method coverage: **202 individually documented source-linked callable signatures in 202 separate Markdown files** — 116 controller methods/helpers (including all 90 attribute-decorated HTTP actions), 80 service/interface/helper methods, and 6 data/bootstrap methods. There are no aggregate source-file method reports.
- Program startup adds 3 individually reported named local functions and 1 individually reported minimal health endpoint; startup composition is separately described in `backend/Program.cs.md`.
- Test source files: 2; 14 xUnit `[Fact]` methods each have individual reports; the `RecordingHandler.SendAsync` helper is also individually documented. There are 15 distinct source callables with 16 callable-report files because one scanner-produced duplicate is explicitly labeled as a parser note. Five test/helper classes have separate class reports.
- Migrations: 5 migration source files; 5 generated designer companions with a note on each migration; one model snapshot report. Migration reports: 5.
- Class/type reference files emitted: 137 for backend/data/DTO/model declaration types, plus 5 test class/helper reports; excludes migration generated classes and Program top-level statements.
- Function/method report files: 224 total — 202 distinct source-linked backend callable reports, 4 Program local-function/endpoint reports, 2 explicitly labeled backend positional-record parser notes, and 16 test callable report files (15 distinct source callables plus 1 explicitly labeled duplicate note). All named overloads use distinct filenames and signature-qualified IDs.
- Total new documentation files generated: 373 excluding this summary.

## Source inspection boundaries / limitations
- Reports are generated from actual C# source declarations, attribute lines, method bodies, DbContext mappings, project manifests, migration operations, and tests. Summaries list parsed calls and up to eight observed return expressions; long/nested branch predicates are deliberately described at a high level rather than presented as complete control flow. They do not replace review of the linked source.
- C# is not fully parsed by this lightweight inventory process: anonymous callbacks/lambdas, nested expressions, inherited/implicit framework behavior, preprocessor paths, and some multiline attributes/signatures can be undercounted or represented as parser gaps. All 90 controller HTTP attributes have separate action reports and all 14 source `[Fact]` methods have separate test reports; the 202 method/helper coverage is the source-linked entries counted in the table above. Semicolon-terminated positional records immediately preceding braced types can confuse block association; two CouponCalculation entries and one test entry are explicitly labeled parser notes and are not counted as distinct callable source methods. Inline anonymous callbacks are not separately indexed.
- Endpoint report security labels quote source attributes only; global middleware, policy configuration, authentication handler semantics, and endpoint framework behavior must also be considered.
- Tests are listed as source evidence; test execution was not performed. Reports explicitly say NOT TESTED where no test result is cited.
- Migrations and snapshot document intended source model/operations only. No claim is made about current database schema, whether migrations ran, runtime service availability, external provider configuration, or production status.
- No application code or existing docs were intentionally modified; no existing report was overwritten. All generated reports are additive.
