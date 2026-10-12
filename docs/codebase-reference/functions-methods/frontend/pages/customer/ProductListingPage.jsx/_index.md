# Declaration index: pages/customer/ProductListingPage.jsx

**Source:** `frontend/src/pages/customer/ProductListingPage.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [ProductListingPage.md](../../../../../pages/customer/ProductListingPage.md)

## Individually reported named declarations

- [`ProductListingPage` (line 11)](ProductListingPage.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 27; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 28; lexical line fragment `const timer = setTimeout(() => { setDebounced(q); setPage(1); }, 300);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 29; lexical line fragment `return () => clearTimeout(timer);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 32; lexical line fragment `const filters = useMemo(() => ({` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 59; lexical line fragment `onCategory={(value) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 66; lexical line fragment `onBrand={(value) => { setPage(1); setBrand(value); }}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 69; lexical line fragment `onPrice={({ minPrice: nextMin, maxPrice: nextMax }) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 75; lexical line fragment `onAvailable={(value) => { setPage(1); setAvailable(value); }}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 77; lexical line fragment `onSort={(value) => { setPage(1); setSort(value); }}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 83; lexical line fragment `? <div className="catalog-state error" role="alert"><strong>Products could not be loaded.</strong><p>{error}</p><button className="outline" type="button" onClick={() => w` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 90; lexical line fragment `{items.map((product) => (` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
