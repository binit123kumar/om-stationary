# Declaration index: pages/customer/ProductDetailPage.jsx

**Source:** `frontend/src/pages/customer/ProductDetailPage.jsx`  
**Named declarations identified:** 3  
**Linked module report:** [ProductDetailPage.md](../../../../../pages/customer/ProductDetailPage.md)

## Individually reported named declarations

- [`ProductDetailPage` (line 12)](ProductDetailPage.md)
- [`buyNow` (line 53)](buyNow.md)
- [`addQuantity` (line 54)](addQuantity.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 15; lexical line fragment `const existing = catalog.products.find((x) => x.id === Number(id));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 19; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 23; lexical line fragment `if (catalog.loading) return () => { alive = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 24; lexical line fragment `if (existing) { setRemote(existing); return () => { alive = false; }; }` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 26; lexical line fragment `.then((product) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 30; lexical line fragment `.catch(() => { if (alive) setMissing(true); });` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 31; lexical line fragment `return () => { alive = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 36; lexical line fragment `useEffect(() => {` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
