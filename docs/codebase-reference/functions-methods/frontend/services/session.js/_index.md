# Declaration index: services/session.js

**Source:** `frontend/src/services/session.js`  
**Named declarations identified:** 5  
**Linked module report:** [session.md](../../../../services/session.md)

## Individually reported named declarations

- [`readSession` (line 10)](readSession.md)
- [`saveSession` (line 15)](saveSession.md)
- [`clearSession` (line 20)](clearSession.md)
- [`refreshSession` (line 22)](refreshSession.md)
- [`mapServerCart` (line 41)](mapServerCart.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 29; lexical line fragment `}).then(async (response) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 32; lexical line fragment `}).catch(() => { clearSession(); return null; })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 33; lexical line fragment `.finally(() => { refreshInFlight = null; });` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 42; lexical line fragment `return rows.map((row) => ({` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
