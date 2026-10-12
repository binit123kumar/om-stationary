# Declaration index: components/auth/LoginForm.jsx

**Source:** `frontend/src/components/auth/LoginForm.jsx`  
**Named declarations identified:** 6  
**Linked module report:** [LoginForm.md](../../../../../components/auth/LoginForm.md)

## Individually reported named declarations

- [`LoginForm` (line 23)](LoginForm.md)
- [`updateAuthField` (line 42)](updateAuthField.md)
- [`completeAuthentication` (line 55)](completeAuthentication.md)
- [`submitAuthForm` (line 82)](submitAuthForm.md)
- [`goShopping` (line 123)](goShopping.md)
- [`renderAuthField` (line 129)](renderAuthField.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 26; lexical line fragment `const returnTo = useMemo(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 40; lexical line fragment `useEffect(() => { setErrors({}); setError(''); }, [registerMode]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 62; lexical line fragment `const guestRows = guest.map((item) => ({` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 100; lexical line fragment `const data = await response.json().catch(() => ({}));` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
