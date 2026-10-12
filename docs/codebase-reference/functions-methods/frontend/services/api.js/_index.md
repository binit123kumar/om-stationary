# Declaration index: services/api.js

**Source:** `frontend/src/services/api.js`  
**Named declarations identified:** 3  
**Linked module report:** [api.md](../../../../services/api.md)

## Individually reported named declarations

- [`apiFetch` (line 6)](apiFetch.md)
- [`send` (line 8)](send.md)
- [`readFailure` (line 21)](readFailure.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 24; lexical line fragment `const body = await response.json().catch(() => ({}));` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
