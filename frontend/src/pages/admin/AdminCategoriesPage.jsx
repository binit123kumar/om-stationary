import { useCallback, useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import { Modal } from '../../components/common/Modal.jsx';
import { adminHeaders, createCategory, listAdminCategories, updateCategory } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';

export function AdminCategoriesPage({ user, onLogout }) {
  const headers = adminHeaders(readSession());
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [active, setActive] = useState(true);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setRows(await listAdminCategories(headers)); }
    catch (e) { setError(e.message || 'Could not load categories.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const open = (row = null) => { setEditing(row); setName(row?.name || ''); setActive(row?.isActive ?? true); };
  const save = async (event) => {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const response = editing
        ? await updateCategory(editing.id, name.trim(), active, headers)
        : await createCategory(name.trim(), active, headers);
      if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not save category.');
      setEditing(null); await load();
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  return (
    <AdminLayout user={user} onLogout={onLogout}>
      <div className="pagehead"><small>ADMIN PANEL</small><h1>Categories</h1><p>Manage the real catalogue categories.</p><button className="btn" onClick={() => open()}>Add category</button></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'name', label: 'Category' }, { key: 'products', label: 'Products' }, { key: 'active', label: 'Status' }, { key: 'actions', label: 'Actions' }]} empty="No categories have been created." renderRow={(row) => <tr key={row.id}><td>{row.name}</td><td>{row.productCount} ({row.activeProductCount} active)</td><td>{row.isActive ? 'Active' : 'Inactive'}</td><td><button className="outline" onClick={() => open(row)}>Edit</button><button className="outline" onClick={async () => { setBusy(true); try { const r = await updateCategory(row.id, row.name, !row.isActive, headers); if (!r.ok) throw new Error((await r.json().catch(() => ({}))).detail || 'Could not update category.'); await load(); } catch (e) { setError(e.message); } finally { setBusy(false); } }} disabled={busy}>{row.isActive ? 'Deactivate' : 'Activate'}</button></td></tr>} />
      <Modal open={editing !== null} title={editing ? 'Edit category' : 'Add category'} onClose={() => !busy && setEditing(null)}>
        <form className="admin-form" onSubmit={save}><label>Category name<input required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} /></label><label className="check-field"><input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Active</label><button className="btn" disabled={busy}>{busy ? 'Saving...' : 'Save category'}</button></form>
      </Modal>
    </AdminLayout>
  );
}
