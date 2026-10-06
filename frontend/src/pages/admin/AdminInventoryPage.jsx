import { useCallback, useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import { adminHeaders, adjustStock, listAdminProducts } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { rupeesShort } from '../../utils/formatCurrency.js';

export function AdminInventoryPage({ user, onLogout }) {
  const headers = adminHeaders(readSession());
  const [rows, setRows] = useState([]); const [q, setQ] = useState('');
  const [lowOnly, setLowOnly] = useState(false); const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); const [message, setMessage] = useState('');
  const [busyId, setBusyId] = useState(null); const [delta, setDelta] = useState({});
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const result = await listAdminProducts(headers, { pageSize: '200', q, lowStockOnly: String(lowOnly) }); setRows(result.items || []); }
    catch (e) { setError(e.message || 'Could not load inventory.'); }
    finally { setLoading(false); }
  }, [q, lowOnly]);
  useEffect(() => { load(); }, [load]);
  const adjust = async (product) => {
    const amount = Number(delta[product.id]);
    if (!Number.isInteger(amount) || amount === 0) { setError('Enter a non-zero whole-number stock adjustment.'); return; }
    setBusyId(product.id); setError(''); setMessage('');
    try { const response = await adjustStock(product.id, amount, 'Admin inventory adjustment', headers); if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not adjust stock.'); setMessage(`Stock adjusted for ${product.name}.`); await load(); }
    catch (e) { setError(e.message); } finally { setBusyId(null); }
  };
  return <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Inventory</h1><p>Stock and thresholds from the product catalogue.</p></div>
    {error && <p role="alert" className="form-error">{error}</p>}{message && <p role="status">{message}</p>}
    <div className="admin-filter-row"><label className="field-label">Search products<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, SKU or brand" /></label><label className="check-field"><input type="checkbox" checked={lowOnly} onChange={(e) => setLowOnly(e.target.checked)} /> Low stock only</label></div>
    <AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'product', label: 'Product' }, { key: 'sku', label: 'SKU' }, { key: 'category', label: 'Category' }, { key: 'stock', label: 'Stock / threshold' }, { key: 'value', label: 'Stock value' }, { key: 'active', label: 'Status' }, { key: 'adjust', label: 'Adjustment' }]} empty="No inventory products match these filters." renderRow={(p) => <tr key={p.id}><td>{p.name}</td><td>{p.sku || '-'}</td><td>{p.category || '-'}</td><td>{p.stock} / {p.lowStockThreshold}{p.stock <= p.lowStockThreshold && <small className="low-stock">Low stock</small>}</td><td>{rupeesShort(Number(p.stock || 0) * Number(p.price || 0))}</td><td>{p.isActive ? 'Active' : 'Inactive'}</td><td><div className="admin-filter-row"><input aria-label={`Stock adjustment for ${p.name}`} type="number" step="1" value={delta[p.id] ?? ''} onChange={(e) => setDelta((old) => ({ ...old, [p.id]: e.target.value }))} /><button className="outline" disabled={busyId === p.id} onClick={() => adjust(p)}>{busyId === p.id ? 'Saving...' : 'Adjust'}</button></div></td></tr>} />
  </AdminLayout>;
}
