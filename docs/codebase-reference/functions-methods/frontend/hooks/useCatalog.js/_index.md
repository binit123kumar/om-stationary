# Declaration index: hooks/useCatalog.js

**Source:** `frontend/src/hooks/useCatalog.js`  
**Named declarations identified:** 1  
**Linked module report:** [useCatalog.md](../../../../hooks-context/hooks/useCatalog.md)

## Individually reported named declarations

- [`useCatalog` (line 5)](useCatalog.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 10; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 13; lexical line fragment `.then((rows) => { if (active) setProducts(rows); })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 14; lexical line fragment `.catch(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 17; lexical line fragment `.finally(() => { if (active) setLoading(false); });` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 18; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
