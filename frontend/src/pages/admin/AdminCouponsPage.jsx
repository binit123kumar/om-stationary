import { useCallback, useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import { Modal } from '../../components/common/Modal.jsx';
import { adminHeaders, createCoupon, listAdminCoupons, updateCoupon } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { formatDateTime } from '../../utils/formatDate.js';
import { rupeesShort } from '../../utils/formatCurrency.js';

const blank = () => ({ code: '', discountType: 'Percentage', discountValue: '', minimumOrderValue: '0', maximumDiscount: '', usageLimit: '100', startsAt: '', expiresAt: '', isActive: true });
const localInput = (value) => value ? new Date(value).toISOString().slice(0, 16) : '';

export function AdminCouponsPage({ user, onLogout }) {
  const headers = adminHeaders(readSession()); const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [busy, setBusy] = useState(false); const [editing, setEditing] = useState(null); const [form, setForm] = useState(blank());
  const load = useCallback(async () => { setLoading(true); setError(''); try { setRows(await listAdminCoupons(headers)); } catch (e) { setError(e.message); } finally { setLoading(false); } }, []);
  useEffect(() => { load(); }, [load]);
  const open = (row = null) => { setEditing(row); setForm(row ? { code: row.code, discountType: row.discountType, discountValue: String(row.discountValue), minimumOrderValue: String(row.minimumOrderValue), maximumDiscount: row.maximumDiscount == null ? '' : String(row.maximumDiscount), usageLimit: String(row.usageLimit), startsAt: localInput(row.startsAt), expiresAt: localInput(row.expiresAt), isActive: row.isActive } : blank()); };
  const set = (key) => (event) => setForm((v) => ({ ...v, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));
  const save = async (event) => { event.preventDefault(); setBusy(true); setError(''); const payload = { discountType: form.discountType, discountValue: Number(form.discountValue), minimumOrderValue: Number(form.minimumOrderValue), maximumDiscount: form.maximumDiscount === '' ? null : Number(form.maximumDiscount), usageLimit: Number(form.usageLimit), startsAt: new Date(form.startsAt).toISOString(), expiresAt: new Date(form.expiresAt).toISOString(), isActive: form.isActive, ...(editing ? {} : { code: form.code.trim().toUpperCase() }) };
    try { const response = editing ? await updateCoupon(editing.id, payload, headers) : await createCoupon(payload, headers); if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not save coupon.'); setEditing(null); await load(); } catch (e) { setError(e.message); } finally { setBusy(false); } };
  return <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Coupons</h1><p>Manage real coupon rules and usage limits.</p><button className="btn" onClick={() => open()}>Create coupon</button></div>{error && <p role="alert" className="form-error">{error}</p>}
    <AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{ key: 'code', label: 'Code' }, { key: 'discount', label: 'Discount' }, { key: 'minimum', label: 'Minimum order' }, { key: 'maximum', label: 'Maximum discount' }, { key: 'uses', label: 'Uses' }, { key: 'window', label: 'Validity' }, { key: 'status', label: 'Status' }, { key: 'action', label: 'Action' }]} empty="No coupons are configured." renderRow={(c) => <tr key={c.id}><td>{c.code}</td><td>{c.discountType === 'Percentage' ? `${c.discountValue}%` : rupeesShort(c.discountValue)}</td><td>{rupeesShort(c.minimumOrderValue)}</td><td>{c.maximumDiscount == null ? '-' : rupeesShort(c.maximumDiscount)}</td><td>{c.usageCount}/{c.usageLimit} ({c.remainingUses} left)</td><td>{formatDateTime(c.startsAt)} - {formatDateTime(c.expiresAt)}</td><td>{c.status}</td><td><button className="outline" onClick={() => open(c)}>Edit</button></td></tr>} />
    <Modal open={editing !== null} onClose={() => !busy && setEditing(null)} title={editing ? `Edit ${editing.code}` : 'Create coupon'} wide><form className="admin-form" onSubmit={save}>
      {!editing && <label>Code<input value={form.code} onChange={set('code')} required maxLength={40} /></label>}
      <label>Discount type<select value={form.discountType} onChange={set('discountType')}><option>Percentage</option><option>Fixed</option></select></label>
      <label>Discount value<input type="number" min="0.01" step="0.01" value={form.discountValue} onChange={set('discountValue')} required /></label>
      <label>Minimum order<input type="number" min="0" step="0.01" value={form.minimumOrderValue} onChange={set('minimumOrderValue')} required /></label>
      <label>Maximum discount<input type="number" min="0" step="0.01" value={form.maximumDiscount} onChange={set('maximumDiscount')} /></label>
      <label>Usage limit<input type="number" min={editing?.usageCount || 1} step="1" value={form.usageLimit} onChange={set('usageLimit')} required /></label>
      <label>Starts at<input type="datetime-local" value={form.startsAt} onChange={set('startsAt')} required /></label>
      <label>Expires at<input type="datetime-local" value={form.expiresAt} onChange={set('expiresAt')} required /></label>
      <label className="check-field"><input type="checkbox" checked={form.isActive} onChange={set('isActive')} /> Active</label>
      <button className="btn" disabled={busy}>{busy ? 'Saving...' : 'Save coupon'}</button>
    </form></Modal>
  </AdminLayout>;
}
