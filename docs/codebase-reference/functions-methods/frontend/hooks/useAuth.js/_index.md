# Declaration index: hooks/useAuth.js

**Source:** `frontend/src/hooks/useAuth.js`  
**Named declarations identified:** 1  
**Linked module report:** [useAuth.md](../../../../hooks-context/hooks/useAuth.md)

## Individually reported named declarations

- [`useAuth` (line 6)](useAuth.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 7; lexical line fragment `const [user, setUser] = useState(() => readSession()?.user || null);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 11; lexical line fragment `const onAuth = useCallback((nextUser) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 15; lexical line fragment `const onLogout = useCallback(async () => {` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
