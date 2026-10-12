# Declaration index: pages/admin/AdminInventoryPage.jsx

**Source:** `frontend/src/pages/admin/AdminInventoryPage.jsx`  
**Named declarations identified:** 2  
**Linked module report:** [AdminInventoryPage.md](../../../../../pages/admin/AdminInventoryPage.md)

## Individually reported named declarations

- [`AdminInventoryPage` (line 8)](AdminInventoryPage.md)
- [`adjust` (line 21)](adjust.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 14; lexical line fragment `const load = useCallback(async () => {` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 20; lexical line fragment `useEffect(() => { load(); }, [load]);` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 25; lexical line fragment `try { const response = await adjustStock(product.id, amount, 'Admin inventory adjustment', headers); if (!response.ok) throw new Error((await response.json().catch(() => ` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 30; lexical line fragment `<div className="admin-filter-row"><label className="field-label">Search products<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, SKU or brand" /` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 30; lexical line fragment `<div className="admin-filter-row"><label className="field-label">Search products<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, SKU or brand" /` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 6: source line 31; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'product', label: 'Product' }, { key: 'sku', label: 'SKU' }, { key: 'category', label: ` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 7: source line 31; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'product', label: 'Product' }, { key: 'sku', label: 'SKU' }, { key: 'category', label: ` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 8: source line 31; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'product', label: 'Product' }, { key: 'sku', label: 'SKU' }, { key: 'category', label: ` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 9: source line 31; lexical line fragment `<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'product', label: 'Product' }, { key: 'sku', label: 'SKU' }, { key: 'category', label: ` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
