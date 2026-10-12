# Declaration index: components/layout/MobileNav.jsx

**Source:** `frontend/src/components/layout/MobileNav.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [MobileNav.md](../../../../../components/layout/MobileNav.md)

## Individually reported named declarations

- [`MobileNav` (line 15)](MobileNav.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 25; lexical line fragment `onClick={() => setOpen((value) => !value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 25; lexical line fragment `onClick={() => setOpen((value) => !value)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 39; lexical line fragment `{LINKS.map((link) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 40; lexical line fragment `<Link key={link.to} to={link.to} onClick={() => setOpen(false)}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 47; lexical line fragment `{categories.map((category) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 51; lexical line fragment `onClick={() => setOpen(false)}` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
