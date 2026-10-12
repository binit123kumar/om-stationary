# Declaration index: components/products/ProductSearch.jsx

**Source:** `frontend/src/components/products/ProductSearch.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [ProductSearch.md](../../../../../components/products/ProductSearch.md)

## Individually reported named declarations

- [`ProductSearch` (line 4)](ProductSearch.md)
- [`submit` (line 5)](submit.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 18; lexical line fragment `onChange={(event) => onChange?.(event.target.value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 21; lexical line fragment `{products.map((product) => (` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
