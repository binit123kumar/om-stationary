import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import { adminHeaders, listAdminCustomers } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { formatDateTime } from '../../utils/formatDate.js';
import { rupeesShort } from '../../utils/formatCurrency.js';

export function AdminCustomersPage({ user, onLogout }) {
  const headers = adminHeaders(readSession()); const [q, setQ] = useState('');
  const [data, setData] = useState({ items: [], total: 0 }); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { let active = true; setLoading(true); setError(''); listAdminCustomers(headers, { q, page: '1', pageSize: '100' }).then((result) => { if (active) setData(result); }).catch((e) => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [q]);
  return <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Customers</h1><p>{data.total} registered customers</p></div>{error && <p role="alert" className="form-error">{error}</p>}
    <label className="field-label">Search customers<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, email or phone" /></label>
    <AdminDataTable loading={loading} rows={data.items} total={data.total} pageSize={100} columns={[{ key: 'name', label: 'Customer' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' }, { key: 'status', label: 'Status' }, { key: 'created', label: 'Registered' }, { key: 'orders', label: 'Orders' }, { key: 'value', label: 'Order value' }]} empty="No customers match this search." renderRow={(c) => <tr key={c.id}><td>{c.fullName || '-'}</td><td>{c.email}</td><td>{c.phone}</td><td>{c.isActive ? 'Active' : 'Inactive'}</td><td>{formatDateTime(c.createdAt)}</td><td>{c.orderCount}</td><td>{rupeesShort(c.orderValue)}</td></tr>} />
  </AdminLayout>;
}
