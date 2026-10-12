# Frontend scope summary

## Source-derived counts

- Concrete route declarations (wildcard excluded): **51**
- Distinct concrete route keys: **50**
- Active route-level page modules mapped through App.jsx and RouteView.jsx: **50**
- Page-folder modules not dispatched by RouteView: **3**
- Project-owned components under frontend/src/components: **122**, with one report per source file
- Root React modules documented separately: **4**
- Service modules: **14**, one source report each
- Hook modules: **12**, one source report each
- Active frontend fetch/apiFetch expressions: **103** (static call-site inventory; excludes historical snapshots)
- Shared utility modules: **7**
- Files with form markup or validator calls: **18**
- Files with state/context hook call patterns: **60**

## Classification reports

- [Route inventory](../evidence/route-inventory.md)
- [Source inventory](../evidence/source-inventory.md)
- [Active page reports](../pages/)
- [Component reports](../components/)
- [Service index](SERVICES.md) and [individual source reports](../services/)
- [Hooks index](HOOKS.md) and [individual source reports](../hooks/)
- [HTTP call-site inventory](HTTP_CALL_INVENTORY.md)
- [Storage/PWA](STORAGE_PWA.md)
- [Forms/validation](FORM_VALIDATION.md)
- [State](STATE.md)

## Missing, unmapped and ambiguous inventory

- Concrete route declarations without a matching RouteView page import: **0** (none detected).
- RouteView keys without a concrete App route declaration: **0** (none).
- Page-folder non-route/shared modules: **3** (frontend/src/pages/customer/LegalContent.jsx, frontend/src/pages/customer/LegalPages.jsx, frontend/src/pages/customer/content.js).
- Backend endpoint mappings: **not cross-walked in this scope**. Service reports record frontend call expressions only; this avoids unverified mappings.
- Component caller completeness: not exhaustively cross-referenced in every individual report; do not infer reachability or dead code.
- Runtime HTTP behavior, responses, guards, browser rendering, PWA behavior, and database effects: **NOT VERIFIED**.
- Historical snapshots/backups are excluded from active source counts; see [source inventory](../evidence/source-inventory.md).

## Method and evidence boundary

Counts derive from current source text in App.jsx, RouteView.jsx, and discovered frontend/src files. Imports, exports, and call patterns use lexical parsing, which does not model every alias, dynamic import, re-export, or conditional path. Reports document source facts, not runtime behavior.
