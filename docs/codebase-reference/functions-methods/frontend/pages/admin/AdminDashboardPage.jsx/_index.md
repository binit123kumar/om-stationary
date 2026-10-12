# Declaration index: pages/admin/AdminDashboardPage.jsx

**Source:** `frontend/src/pages/admin/AdminDashboardPage.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [AdminDashboardPage.md](../../../../../pages/admin/AdminDashboardPage.md)

## Individually reported named declarations

- [`AdminDashboardPage` (line 16)](AdminDashboardPage.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 24; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 26; lexical line fragment `(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 46; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
