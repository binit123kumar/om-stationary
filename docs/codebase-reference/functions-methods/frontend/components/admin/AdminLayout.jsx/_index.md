# Declaration index: components/admin/AdminLayout.jsx

**Source:** `frontend/src/components/admin/AdminLayout.jsx`  
**Named declarations identified:** 3  
**Linked module report:** [AdminLayout.md](../../../../../components/admin/AdminLayout.md)

## Individually reported named declarations

- [`AdminLayout` (line 7)](AdminLayout.md)
- [`AdminBrandLink` (line 22)](AdminBrandLink.md)
- [`AdminHomeLink` (line 31)](AdminHomeLink.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 34; lexical line fragment `<Link to="/admin" className="outline" onClick={(event) => { event.preventDefault(); navigate('/admin'); }}>` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
