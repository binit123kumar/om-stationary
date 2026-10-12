# Declaration index: pages/admin/AdminOrdersPage.jsx

**Source:** `frontend/src/pages/admin/AdminOrdersPage.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [AdminOrdersPage.md](../../../../../pages/admin/AdminOrdersPage.md)

## Individually reported named declarations

- [`AdminOrdersPage` (line 13)](AdminOrdersPage.md)
- [`selectOptions` (line 62)](selectOptions.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 28; lexical line fragment `const filters = useMemo(() => ({` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 32; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 34; lexical line fragment `getFilterOptions(headers).then((data) => { if (active) setOptions(data); }).catch(() => {});` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 34; lexical line fragment `getFilterOptions(headers).then((data) => { if (active) setOptions(data); }).catch(() => {});` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 35; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 39; lexical line fragment `useEffect(() => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 44; lexical line fragment `Object.entries(filters).forEach(([filterKey, value]) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 48; lexical line fragment `.then(async (response) => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 57; lexical line fragment `.catch((e) => { if (active) { setError(e.message); setLoading(false); } });` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 58; lexical line fragment `return () => { active = false; };` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 84; lexical line fragment `<input value={q} placeholder="Order, customer, phone" onChange={(event) => { setQ(event.target.value); setPage(1); }} />` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 12: source line 88; lexical line fragment `<select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 13: source line 94; lexical line fragment `<select value={paymentStatus} onChange={(event) => { setPaymentStatus(event.target.value); setPage(1); }}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 14: source line 100; lexical line fragment `<select value={paymentMethod} onChange={(event) => { setPaymentMethod(event.target.value); setPage(1); }}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 15: source line 106; lexical line fragment `<select value={fulfillment} onChange={(event) => { setFulfillment(event.target.value); setPage(1); }}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 16: source line 129; lexical line fragment `renderRow={(order) => (` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
