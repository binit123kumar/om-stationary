# Declaration index: pages/admin/AdminOrderDetailPage.jsx

**Source:** `frontend/src/pages/admin/AdminOrderDetailPage.jsx`  
**Named declarations identified:** 4  
**Linked module report:** [AdminOrderDetailPage.md](../../../../../pages/admin/AdminOrderDetailPage.md)

## Individually reported named declarations

- [`AdminOrderDetailPage` (line 22)](AdminOrderDetailPage.md)
- [`runStatus` (line 51)](runStatus.md)
- [`submitAssign` (line 68)](submitAssign.md)
- [`runMarkPaid` (line 88)](runMarkPaid.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 34; lexical line fragment `const load = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 49; lexical line fragment `useEffect(() => { load(); }, [load]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 164; lexical line fragment `{(order.items || []).map((line) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 198; lexical line fragment `{nextStatuses.map((status) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 203; lexical line fragment `onClick={() => runStatus(status)}` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 215; lexical line fragment `<button className="outline" onClick={() => setAssignOpen(true)}>Assign delivery</button>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 220; lexical line fragment `<button className="outline" onClick={() => runStatus('Cancelled')}>Cancel order</button>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 240; lexical line fragment `{order.payments.map((payment) => (` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 270; lexical line fragment `<div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Assign delivery" onClick={() => !assignBusy && setAssignOpen(false)}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 271; lexical line fragment `<form className="modal-card" onSubmit={submitAssign} onClick={(event) => event.stopPropagation()}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 274; lexical line fragment `<button type="button" className="modal-close" aria-label="Close" onClick={() => setAssignOpen(false)}>&times;</button>` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
