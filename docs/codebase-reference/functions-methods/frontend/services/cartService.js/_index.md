# Declaration index: services/cartService.js

**Source:** `frontend/src/services/cartService.js`  
**Named declarations identified:** 3  
**Linked module report:** [cartService.md](../../../../services/cartService.md)

## Individually reported named declarations

- [`getCart` (line 5)](getCart.md)
- [`saveCart` (line 11)](saveCart.md)
- [`mergeGuestCart` (line 19)](mergeGuestCart.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 21; lexical line fragment `const serverRows = current.ok ? (await current.json()).items.map((row) => ({ productId: row.productId, quantity: row.quantity })) : [];` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 26; lexical line fragment `const items = [...quantities.entries()].map(([productId, quantity]) => ({ productId, quantity }));` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
