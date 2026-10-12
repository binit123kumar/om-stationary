# Declaration index: components/products/ProductGrid.jsx

**Source:** `frontend/src/components/products/ProductGrid.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [ProductGrid.md](../../../../../components/products/ProductGrid.md)

## Individually reported named declarations

- [`ProductGrid` (line 2)](ProductGrid.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 4; lexical line fragment `return <div className="grid">{children || products.map(() => null)}</div>;` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
