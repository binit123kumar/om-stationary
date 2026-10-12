# Declaration index: components/products/CategoryFilter.jsx

**Source:** `frontend/src/components/products/CategoryFilter.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [CategoryFilter.md](../../../../../components/products/CategoryFilter.md)

## Individually reported named declarations

- [`CategoryFilter` (line 4)](CategoryFilter.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 10; lexical line fragment `onClick={onChange ? (event) => { event.preventDefault(); onChange(''); } : undefined}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 14; lexical line fragment `{categories.map((category) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 19; lexical line fragment `onClick={onChange ? (event) => { event.preventDefault(); onChange(category); } : undefined}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
