# Declaration index: hooks/useOrders.js

**Source:** `frontend/src/hooks/useOrders.js`  
**Named declarations identified:** 3  
**Linked module report:** [useOrders.md](../../../../hooks-context/hooks/useOrders.md)

## Individually reported named declarations

- [`useOrders` (line 11)](useOrders.md)
- [`load` (line 18)](load.md)
- [`useOrderLookup` (line 45)](useOrderLookup.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 15; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 30; lexical line fragment `const rows = await Promise.all(ids.map((id) =>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 31; lexical line fragment `getOrderByNumber(id, readTrackingToken(id)).then((r) => (r.ok ? r.json() : null)).catch(() => null)` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 31; lexical line fragment `getOrderByNumber(id, readTrackingToken(id)).then((r) => (r.ok ? r.json() : null)).catch(() => null)` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 37; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 50; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 55; lexical line fragment `.then(async (response) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 61; lexical line fragment `.then((data) => { if (active) setOrder(data); })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 62; lexical line fragment `.catch((e) => { if (active) setError(e.message); })` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 63; lexical line fragment `.finally(() => { if (active) setLoading(false); });` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 64; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
