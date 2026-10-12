# Codebase Reference Completeness Audit

This audit counts documentation files present in the source-aligned reference tree. Counts describe static source/document coverage, not runtime verification or proof that every dynamic call relationship was discovered.

## Frontend source and module reports

| Category | Identified source files / entries | Reports or indexes | Coverage notes |
| --- | ---: | ---: | --- |
| Route declarations | 52 path declarations | 52 declarations documented in route/module reports | Includes wildcard fallback; two product-form URLs share one page key |
| Unique page keys | 50 | 50 route-mapped page modules | Resolved by `RouteView` |
| Page modules | 53 | 53 module reports | 50 routed modules and 3 shared legal/content modules |
| Components in `frontend/src/components/` | 122 | 122 module reports | All source files in the identified component inventory |
| Root-level React modules | 4 | 4 module reports | `App`, `RouteView`, `ErrorBoundary`, `AdminCharts`; `AdminCharts` has no static source import found and is preserved/documented |
| Frontend services | 14 | 14 module reports | Source-aligned |
| Frontend hooks | 12 | 12 module reports | Source-aligned |
| Frontend utilities | 7 | 7 module reports | Source-aligned |
| Feature-source declaration indexes | 208 | 208 per-source indexes | 405 named function-like declarations |
| Root/runtime source indexes | 6 | 6 per-source indexes | Four root React modules, `main.jsx`, and public service worker |
| Frontend named declaration reports | 412 | 412 individual reports | 405 feature declarations plus 7 named root React declarations |
| Anonymous frontend runtime callbacks | 6 | 6 individual reports | Two `main.jsx` callbacks and four service-worker event callbacks; excluded from named-declaration count |
| Anonymous callback exclusions | Approx. 524 | Listed in feature-source indexes | Lexical count and callback association are approximate; these are not individual function reports |

The frontend declaration scanner is lexical, not a complete JavaScript/JSX AST. It can miss declarations or misclassify callbacks in complex syntax. The function indexes enumerate the scanner's identified declarations and explicitly label anonymous callbacks that were not separately reported. No frontend `*.test.*` or `*.spec.*` files were found in the inspected frontend source tree.

## Backend, database, and tests

| Category | Identified source files / entries | Reports | Coverage notes |
| --- | ---: | ---: | --- |
| Controllers | 19 source files, 21 controller classes | 21 class reports | Includes nested/multiple controller classes in source files |
| Attribute-decorated HTTP actions | 90 | 90 individual action reports | All identified controller HTTP action attributes have separate reports |
| Controller methods/helpers | 116 | 116 individual reports | Includes the 90 HTTP actions |
| Services | 17 source files | 17 source/class reports | Types in these sources are documented; callable coverage below includes interfaces and helpers |
| Service/interface/helper methods | 80 | 80 individual reports | Source-linked signatures |
| Data/bootstrap | 3 source files | 3 source reports | Six methods have individual reports |
| Program startup | 1 source file | 1 startup report | Three local functions and one minimal health endpoint also have individual reports |
| Backend callable reports | — | 202 methods/helpers + 4 Program entries | 202 distinct source-linked signatures; overloads have signature-qualified identities |
| DTOs | 3 source files | 23 type reports | Declared request/response types |
| Models | 1 source file (`Models.cs`) | 32 type reports | Declared entity/value/enum types |
| EF migration artifacts | 11 files | 5 migration reports + 5 generated-designer notes + 1 snapshot report | Five migration implementations, five generated designer companions, one model snapshot |
| Tests | 2 source files | 14 individual `[Fact]` reports | Every identified xUnit fact method has an individual report |
| Test/helper callable reports | 15 distinct callables | 16 report files | Includes `RecordingHandler.SendAsync`; one duplicate scanner entry is labeled as a parser note |
| Test class/helper reports | 5 types | 5 reports | Kept distinct from method reports |

Backend method reports are source-grounded but produced with a lightweight C# inventory rather than a full compiler syntax-tree audit. Two positional-record parser notes and one duplicate test parser note are explicitly labeled, not counted as distinct methods. Anonymous lambdas/callbacks, some multiline syntax, preprocessor branches, inherited framework behavior, and implicit methods are not individually indexed. The detailed inventory and limitations are recorded in [`_backend_scope_summary.md`](_backend_scope_summary.md).

## Documentation totals and link validation

- **1,258 Markdown files** are present under this codebase-reference tree at the time of audit.
- **2,032 local Markdown links** were checked across the reference tree; **0 broken local targets** were found.
- Frontend declaration details: **412 named declarations** and **6 separately reported anonymous runtime callbacks**; every detail report is linked by a source index.
- Backend callable details: **202 distinct controller/service/data signatures**, plus **4 Program entries**, and **15 distinct test/helper callables**. The 2, 1 parser-note entries are not counted as distinct declarations.
- Module reports cover all counted frontend page, component, root React component, service, hook, and utility sources. Backend class/type reports and migration/test coverage are itemized above and linked from section indexes.

The link audit verifies target existence only; it does not validate Markdown rendering, source line accuracy, or runtime behavior.

## Verification boundaries and preserved uncertainty

- This is documentation-only work. Frontend and backend builds/tests were not rerun for this reference pass; earlier implementation/cleanup verification is recorded separately under `docs/implementation/` and `docs/cleanup/`.
- Frontend source documentation may cite prior Chromium route/viewport checks, but those checks do not establish that backend/API requests succeeded.
- The previously observed local API was unavailable at `localhost:5000`; live API responses, SQL Server state, current production schema, provider credentials, payment processing, email/SMS/WhatsApp delivery and production authorization were **NOT runtime-verified** here.
- Migration documentation describes migration source operations and snapshot intent. It does not establish whether migrations have run or what schema currently exists in any database.
- Static import/call searches may miss JSX indirection, reflection, conventions, dynamically constructed URLs, dependency injection, external callers, or runtime registration. Lack of a discovered caller is not proof that source is safe to remove.
