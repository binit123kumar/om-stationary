# Declaration index: pages/admin/AdminCategoriesPage.jsx

**Source:** `frontend/src/pages/admin/AdminCategoriesPage.jsx`  
**Named declarations identified:** 3  
**Linked module report:** [AdminCategoriesPage.md](../../../../../pages/admin/AdminCategoriesPage.md)

## Individually reported named declarations

- [`AdminCategoriesPage` (line 8)](AdminCategoriesPage.md)
- [`open` (line 26)](open.md)
- [`save` (line 27)](save.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 18; lexical line fragment `const load = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 24; lexical line fragment `useEffect(() => { load(); }, [load]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 33; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not save category.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 41; lexical line fragment `<div className="pagehead"><small>ADMIN PANEL</small><h1>Categories</h1><p>Manage the real catalogue categories.</p><button className="btn" onClick={() => open()}>Add cate` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 43; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'name', label: 'Category' }, { key: 'products', label: 'Products' }, { key: 'active', l` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 43; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'name', label: 'Category' }, { key: 'products', label: 'Products' }, { key: 'active', l` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 43; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'name', label: 'Category' }, { key: 'products', label: 'Products' }, { key: 'active', l` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 43; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'name', label: 'Category' }, { key: 'products', label: 'Products' }, { key: 'active', l` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 44; lexical line fragment `<Modal open={editing !== null} title={editing ? 'Edit category' : 'Add category'} onClose={() => !busy && setEditing(null)}>` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 10: source line 45; lexical line fragment `<form className="admin-form" onSubmit={save}><label>Category name<input required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} /></label><label c` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 11: source line 45; lexical line fragment `<form className="admin-form" onSubmit={save}><label>Category name<input required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} /></label><label c` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
