# Declaration index: pages/customer/CartPage.jsx

**Source:** `frontend/src/pages/customer/CartPage.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [CartPage.md](../../../../../pages/customer/CartPage.md)

## Individually reported named declarations

- [`CartPage` (line 6)](CartPage.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 7; lexical line fragment `const itemCount = cart.reduce((sum, item) => sum + item.q, 0);` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
