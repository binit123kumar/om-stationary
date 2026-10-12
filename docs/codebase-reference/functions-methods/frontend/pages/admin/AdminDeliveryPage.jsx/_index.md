# Declaration index: pages/admin/AdminDeliveryPage.jsx

**Source:** `frontend/src/pages/admin/AdminDeliveryPage.jsx`  
**Named declarations identified:** 3  
**Linked module report:** [AdminDeliveryPage.md](../../../../../pages/admin/AdminDeliveryPage.md)

## Individually reported named declarations

- [`AdminDeliveryPage` (line 9)](AdminDeliveryPage.md)
- [`create` (line 13)](create.md)
- [`assign` (line 14)](assign.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 11; lexical line fragment `const load = useCallback(async () => { setLoading(true); setError(''); try { const [p, a] = await Promise.all([listDeliveryPartners(headers), listAllAssignments(headers)]` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 12; lexical line fragment `useEffect(() => { load(); }, [load]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 14; lexical line fragment `const assign = async (row) => { const value = selection[row.id]; if (!available.some((p) => String(p.id) === String(value))) { setError('Choose an available delivery part` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 15; lexical line fragment `const available = partners.filter((p) => p.status === 'Active' && p.isAvailable);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 16; lexical line fragment `return <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Delivery management</h1><p>Manage delivery partners and server` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 17; lexical line fragment `<h2>Delivery partners</h2><AdminDataTable loading={loading} rows={partners} total={partners.length} columns={[{ key: 'name', label: 'Name' }, { key: 'contact', label: 'Co` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 18; lexical line fragment `<h2>Assignments</h2><AdminDataTable loading={loading} rows={assignments} total={assignments.length} columns={[{ key: 'order', label: 'Order' }, { key: 'partner', label: '` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 18; lexical line fragment `<h2>Assignments</h2><AdminDataTable loading={loading} rows={assignments} total={assignments.length} columns={[{ key: 'order', label: 'Order' }, { key: 'partner', label: '` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 18; lexical line fragment `<h2>Assignments</h2><AdminDataTable loading={loading} rows={assignments} total={assignments.length} columns={[{ key: 'order', label: 'Order' }, { key: 'partner', label: '` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 18; lexical line fragment `<h2>Assignments</h2><AdminDataTable loading={loading} rows={assignments} total={assignments.length} columns={[{ key: 'order', label: 'Order' }, { key: 'partner', label: '` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 18; lexical line fragment `<h2>Assignments</h2><AdminDataTable loading={loading} rows={assignments} total={assignments.length} columns={[{ key: 'order', label: 'Order' }, { key: 'partner', label: '` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 12: source line 18; lexical line fragment `<h2>Assignments</h2><AdminDataTable loading={loading} rows={assignments} total={assignments.length} columns={[{ key: 'order', label: 'Order' }, { key: 'partner', label: '` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 13: source line 18; lexical line fragment `<h2>Assignments</h2><AdminDataTable loading={loading} rows={assignments} total={assignments.length} columns={[{ key: 'order', label: 'Order' }, { key: 'partner', label: '` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 14: source line 19; lexical line fragment `<Modal open={createOpen} onClose={() => !busy && setCreateOpen(false)} title="Create delivery partner"><form className="admin-form" onSubmit={create}>{[['name','Name'],['` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 15: source line 19; lexical line fragment `<Modal open={createOpen} onClose={() => !busy && setCreateOpen(false)} title="Create delivery partner"><form className="admin-form" onSubmit={create}>{[['name','Name'],['` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 16: source line 19; lexical line fragment `<Modal open={createOpen} onClose={() => !busy && setCreateOpen(false)} title="Create delivery partner"><form className="admin-form" onSubmit={create}>{[['name','Name'],['` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 17: source line 19; lexical line fragment `<Modal open={createOpen} onClose={() => !busy && setCreateOpen(false)} title="Create delivery partner"><form className="admin-form" onSubmit={create}>{[['name','Name'],['` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
