import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import { adminHeaders, listAdminPayments } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { formatDateTime } from '../../utils/formatDate.js';
import { rupeesShort } from '../../utils/formatCurrency.js';

export function AdminPaymentsPage({ user, onLogout }) {
  const headers = adminHeaders(readSession()); const [status, setStatus] = useState('');
  const [data, setData] = useState({ items: [], total: 0 }); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { let active = true; setLoading(true); setError(''); listAdminPayments(headers, { status, page: '1', pageSize: '100' }).then((result) => { if (active) setData(result); }).catch((e) => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [status]);
  return <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Payments</h1><p>Payment records and provider references from the server.</p></div>{error && <p role="alert" className="form-error">{error}</p>}
    <label className="field-label">Payment status<select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option><option>Pending</option><option>Paid</option><option>Failed</option><option>ReviewRequired</option></select></label>
    <AdminDataTable loading={loading} rows={data.items} total={data.total} pageSize={100} columns={[{ key: 'order', label: 'Order' }, { key: 'customer', label: 'Customer' }, { key: 'method', label: 'Method / provider' }, { key: 'amount', label: 'Amount' }, { key: 'status', label: 'Status' }, { key: 'reference', label: 'Reference' }, { key: 'created', label: 'Created' }, { key: 'paid', label: 'Paid at' }]} empty="No payment records match this filter." renderRow={(p) => <tr key={p.id}><td>{p.orderNumber}</td><td>{p.customerName}<small>{p.customerPhone}</small></td><td>{p.PaymentMethod || p.paymentMethod} / {p.provider}</td><td>{rupeesShort(p.amount)}</td><td>{p.status} ({p.orderPaymentStatus})</td><td>{p.providerReference || '-'}</td><td>{formatDateTime(p.createdAt)}</td><td>{p.paidAt ? formatDateTime(p.paidAt) : '-'}</td></tr>} />
  </AdminLayout>;
}
