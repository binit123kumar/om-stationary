# Declaration index: components/admin/RecentOrdersTable.jsx

**Source:** `frontend/src/components/admin/RecentOrdersTable.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [RecentOrdersTable.md](../../../../../components/admin/RecentOrdersTable.md)

## Individually reported named declarations

- [`RecentOrdersTable` (line 7)](RecentOrdersTable.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 9; lexical line fragment `const inr = money || ((value) => rupeesShort(value));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 19; lexical line fragment `{orders.slice(0, 10).map((order) => (` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
