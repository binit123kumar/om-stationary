# Declaration index: hooks/usePartner.js

**Source:** `frontend/src/hooks/usePartner.js`  
**Named declarations identified:** 1  
**Linked module report:** [usePartner.md](../../../../hooks-context/hooks/usePartner.md)

## Individually reported named declarations

- [`usePartner` (line 11)](usePartner.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 17; lexical line fragment `const load = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 22; lexical line fragment `if (![s, i, o].every((x) => x.ok)) {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 29; lexical line fragment `useEffect(() => { load(); }, [load]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 31; lexical line fragment `const saveInventory = useCallback(async (entry) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 34; lexical line fragment `const body = await response.json().catch(() => ({}));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 41; lexical line fragment `const changeOrderStatus = useCallback(async (id, status) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 44; lexical line fragment `const body = await response.json().catch(() => ({}));` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
