import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import { adminHeaders, listPartnerShops, setPartnerShopApproval } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';

export function AdminPartnerShopsPage({ user, onLogout }) {
  const [rows, setRows] = useState([]); const [error, setError] = useState(''); const [loading, setLoading] = useState(true); const [busy, setBusy] = useState(null);
  const load = async () => { setLoading(true); try { setRows(await listPartnerShops(adminHeaders(readSession()))); setError(''); } catch (e) { setError(e.message); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const approval = async (shop) => { setBusy(shop.id); setError(''); try { const r = await setPartnerShopApproval(shop.id, !shop.isApproved, adminHeaders(readSession())); if (!r.ok) throw new Error((await r.json().catch(() => ({}))).detail || 'Could not update shop approval.'); await load(); } catch (e) { setError(e.message); } finally { setBusy(null); } };
  return <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Partner shops</h1><p>Review shop details and approval status.</p></div>{error && <p role="alert" className="form-error">{error}</p>}<AdminDataTable loading={loading} rows={rows} total={rows.length} columns={[{key:'shop',label:'Shop / owner'},{key:'contact',label:'Contact'},{key:'location',label:'Location'},{key:'activity',label:'Products / orders'},{key:'approval',label:'Approval'},{key:'action',label:'Action'}]} empty="No partner shops are registered." renderRow={(s)=><tr key={s.id}><td>{s.name}<small>{s.ownerName || s.owner}</small></td><td>{s.phone}</td><td>{s.address}<small>{s.pincode}</small></td><td>{s.productCount} / {s.orderCount}</td><td>{s.isApproved?'Approved':'Pending'} · {s.isActive?'Active':'Inactive'}</td><td><button className="outline" disabled={busy===s.id} onClick={()=>approval(s)}>{busy===s.id?'Saving…':s.isApproved?'Revoke approval':'Approve shop'}</button></td></tr>} /></AdminLayout>;
}
