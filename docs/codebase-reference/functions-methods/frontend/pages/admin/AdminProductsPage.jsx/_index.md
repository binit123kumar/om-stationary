# Declaration index: pages/admin/AdminProductsPage.jsx

**Source:** `frontend/src/pages/admin/AdminProductsPage.jsx`  
**Named declarations identified:** 4  
**Linked module report:** [AdminProductsPage.md](../../../../../pages/admin/AdminProductsPage.md)

## Individually reported named declarations

- [`AdminProductsPage` (line 21)](AdminProductsPage.md)
- [`runAdjust` (line 56)](runAdjust.md)
- [`runToggle` (line 72)](runToggle.md)
- [`runDeactivate` (line 95)](runDeactivate.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 33; lexical line fragment `const load = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 54; lexical line fragment `useEffect(() => { load(); }, [load]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 84; lexical line fragment `const body = await response.json().catch(() => ({}));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 133; lexical line fragment `<input value={q} placeholder="Name, SKU or brand" onChange={(event) => { setQ(event.target.value); setPage(1); }} />` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 137; lexical line fragment `<input value={category} placeholder="Category" onChange={(event) => { setCategory(event.target.value); setPage(1); }} />` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 143; lexical line fragment `onChange={(event) => { setLowStockOnly(event.target.checked); setPage(1); }}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 165; lexical line fragment `renderRow={(product) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 180; lexical line fragment `onClick={() => runAdjust(product, 10)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 187; lexical line fragment `onClick={() => runAdjust(product, -1)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 196; lexical line fragment `onClick={() => runToggle(product)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 203; lexical line fragment `onClick={() => runDeactivate(product)}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
