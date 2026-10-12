# Declaration index: components/cart/CartTotals.jsx

**Source:** `frontend/src/components/cart/CartTotals.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [CartTotals.md](../../../../../components/cart/CartTotals.md)

## Individually reported named declarations

- [`CartTotals` (line 3)](CartTotals.md)
- [`inr` (line 6)](inr.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 4; lexical line fragment `const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.q, 0);` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
