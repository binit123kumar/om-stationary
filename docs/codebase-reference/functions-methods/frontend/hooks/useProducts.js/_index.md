# Declaration index: hooks/useProducts.js

**Source:** `frontend/src/hooks/useProducts.js`  
**Named declarations identified:** 2  
**Linked module report:** [useProducts.md](../../../../hooks-context/hooks/useProducts.md)

## Individually reported named declarations

- [`useProductSearch` (line 7)](useProductSearch.md)
- [`useSearchCategories` (line 35)](useSearchCategories.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 13; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 18; lexical line fragment `.then((data) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 23; lexical line fragment `.catch((e) => { if (active) setError(e.message); })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 24; lexical line fragment `.finally(() => { if (active) setLoading(false); });` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 25; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 38; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 41; lexical line fragment `.then((rows) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 45; lexical line fragment `: [...new Set((fallbackProducts || []).map((p) => p.cat))]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 47; lexical line fragment `.catch(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 48; lexical line fragment `if (active) setCategories([...new Set((fallbackProducts || []).map((p) => p.cat))]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 50; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
