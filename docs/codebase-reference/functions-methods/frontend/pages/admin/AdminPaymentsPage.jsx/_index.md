# Declaration index: pages/admin/AdminPaymentsPage.jsx

**Source:** `frontend/src/pages/admin/AdminPaymentsPage.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [AdminPaymentsPage.md](../../../../../pages/admin/AdminPaymentsPage.md)

## Individually reported named declarations

- [`AdminPaymentsPage` (line 9)](AdminPaymentsPage.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 12; lexical line fragment `useEffect(() => { let active = true; setLoading(true); setError(''); listAdminPayments(headers, { status, page: '1', pageSize: '100' }).then((result) => { if (active) set` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 12; lexical line fragment `useEffect(() => { let active = true; setLoading(true); setError(''); listAdminPayments(headers, { status, page: '1', pageSize: '100' }).then((result) => { if (active) set` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 12; lexical line fragment `useEffect(() => { let active = true; setLoading(true); setError(''); listAdminPayments(headers, { status, page: '1', pageSize: '100' }).then((result) => { if (active) set` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 12; lexical line fragment `useEffect(() => { let active = true; setLoading(true); setError(''); listAdminPayments(headers, { status, page: '1', pageSize: '100' }).then((result) => { if (active) set` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 12; lexical line fragment `useEffect(() => { let active = true; setLoading(true); setError(''); listAdminPayments(headers, { status, page: '1', pageSize: '100' }).then((result) => { if (active) set` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 14; lexical line fragment `<label className="field-label">Payment status<select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option><option>Pending</opt` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 15; lexical line fragment `<AdminDataTable loading={loading} rows={data.items} total={data.total} pageSize={100} columns={[{ key: 'order', label: 'Order' }, { key: 'customer', label: 'Customer' }, ` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
