# Declaration index: pages/customer/HelpPage.jsx

**Source:** `frontend/src/pages/customer/HelpPage.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [HelpPage.md](../../../../../pages/customer/HelpPage.md)

## Individually reported named declarations

- [`HelpPage` (line 20)](HelpPage.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 31; lexical line fragment `{FAQS.map(([question, answer], index) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 36; lexical line fragment `onToggle={(event) => setOpen(event.target.open ? index : -1)}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
