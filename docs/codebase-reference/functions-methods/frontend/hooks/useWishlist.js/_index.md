# Declaration index: hooks/useWishlist.js

**Source:** `frontend/src/hooks/useWishlist.js`  
**Named declarations identified:** 1  
**Linked module report:** [useWishlist.md](../../../../hooks-context/hooks/useWishlist.md)

## Individually reported named declarations

- [`useWishlist` (line 9)](useWishlist.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 14; lexical line fragment `const syncWishlistFromServer = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 19; lexical line fragment `const ids = (Array.isArray(rows) ? rows : []).map((x) => x.productId);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 31; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 36; lexical line fragment `const toggleWishlist = useCallback(async (id) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 40; lexical line fragment `setWishlist(saving ? [...wishlist, id] : wishlist.filter((x) => x !== id));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 41; lexical line fragment `writeWishlist(saving ? [...previous, id] : previous.filter((x) => x !== id));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 54; lexical line fragment `setWishlist(saving ? previous.filter((x) => x !== id) : [...previous, id]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 60; lexical line fragment `const clear = useCallback(() => {` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
