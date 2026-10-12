# Declaration index: hooks/useAdmin.js

**Source:** `frontend/src/hooks/useAdmin.js`  
**Named declarations identified:** 2  
**Linked module report:** [useAdmin.md](../../../../hooks-context/hooks/useAdmin.md)

## Individually reported named declarations

- [`useAdminKey` (line 21)](useAdminKey.md)
- [`useAdmin` (line 32)](useAdmin.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 22; lexical line fragment `const [key, setKey] = useState(() => sessionStorage.getItem('omadminkey') || '');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 23; lexical line fragment `const [entry, setEntry] = useState(() => sessionStorage.getItem('omadminkey') || '');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 24; lexical line fragment `const saveKey = useCallback((event) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 45; lexical line fragment `const load = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 68; lexical line fragment `useEffect(() => { load(); }, [load]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 70; lexical line fragment `const setStatus = useCallback(async (id, status) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 76; lexical line fragment `const body = await response.json().catch(() => ({}));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 88; lexical line fragment `const assign = useCallback(async (id, form) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 102; lexical line fragment `const markPaid = useCallback(async (id) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 115; lexical line fragment `const adjustStockBy = useCallback(async (id, delta) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 128; lexical line fragment `const toggleProduct = useCallback(async (product) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 12: source line 137; lexical line fragment `const body = await response.json().catch(() => ({}));` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 13: source line 147; lexical line fragment `const deactivate = useCallback(async (id) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 14: source line 153; lexical line fragment `const saveSettings = useCallback(async (settings) => {` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
