# Declaration index: pages/admin/AdminCouponsPage.jsx

**Source:** `frontend/src/pages/admin/AdminCouponsPage.jsx`  
**Named declarations identified:** 6  
**Linked module report:** [AdminCouponsPage.md](../../../../../pages/admin/AdminCouponsPage.md)

## Individually reported named declarations

- [`blank` (line 10)](blank.md)
- [`localInput` (line 11)](localInput.md)
- [`AdminCouponsPage` (line 13)](AdminCouponsPage.md)
- [`open` (line 17)](open.md)
- [`set` (line 18)](set.md)
- [`save` (line 19)](save.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 15; lexical line fragment `const load = useCallback(async () => { setLoading(true); setError(''); try { setRows(await listAdminCoupons(headers)); } catch (e) { setError(e.message); } finally { setL` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 16; lexical line fragment `useEffect(() => { load(); }, [load]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 20; lexical line fragment `try { const response = editing ? await updateCoupon(editing.id, payload, headers) : await createCoupon(payload, headers); if (!response.ok) throw new Error((await respons` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 21; lexical line fragment `return <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Coupons</h1><p>Manage real coupon rules and usage limits.</p><` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 22; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'code', label: 'Code' }, { key: 'discount', label: 'Discount' }, { key: 'minimum', labe` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 22; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'code', label: 'Code' }, { key: 'discount', label: 'Discount' }, { key: 'minimum', labe` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 23; lexical line fragment `<Modal open={editing !== null} onClose={() => !busy && setEditing(null)} title={editing ? 'Edit ${editing.code}' : 'Create coupon'} wide><form className="admin-form" onSu` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
