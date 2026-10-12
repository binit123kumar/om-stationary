# Declaration index: pages/customer/WishlistPage.jsx

**Source:** `frontend/src/pages/customer/WishlistPage.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [WishlistPage.md](../../../../../pages/customer/WishlistPage.md)

## Individually reported named declarations

- [`WishlistPage` (line 13)](WishlistPage.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 29; lexical line fragment `const loadRows = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 37; lexical line fragment `(Array.isArray(serverRows) ? serverRows : []).map((x) => ({` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 57; lexical line fragment `useEffect(() => { loadRows(); }, [loadRows, wishlist.length]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 74; lexical line fragment `<button className="outline" onClick={() => { reload?.(); loadRows(); }}>Retry</button>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 82; lexical line fragment `{rows.map((product) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 108; lexical line fragment `const items = products.filter((p) => wishlist.includes(p.id));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 123; lexical line fragment `{items.map((product) => (` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
