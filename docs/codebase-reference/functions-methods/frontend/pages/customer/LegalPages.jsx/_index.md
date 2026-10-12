# Declaration index: pages/customer/LegalPages.jsx

**Source:** `frontend/src/pages/customer/LegalPages.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [LegalPages.md](../../../../../pages/customer/LegalPages.md)

## Individually reported named declarations

- [`LegalPage` (line 5)](LegalPage.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 9; lexical line fragment `<section className="content-prose">{doc.sections.map(([h,p])=><div key={h}><h2>{h}</h2><p>{p}</p></div>)}<p className="muted">Last updated 1 September 2026. OM Stationary` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
