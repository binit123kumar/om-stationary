import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import { adminHeaders, listAdminInvoices } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { formatDateTime } from '../../utils/formatDate.js';
import { rupeesShort } from '../../utils/formatCurrency.js';

export function AdminInvoicesPage({ user, onLogout }) {
  const headers = adminHeaders(readSession()); const [q, setQ] = useState(''); const [data, setData] = useState({ items: [], total: 0 }); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { let active = true; setLoading(true); setError(''); listAdminInvoices(headers, { q, page: '1', pageSize: '100' }).then((result) => { if (active) setData(result); }).catch((e) => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [q]);
  return <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Invoices</h1><p>{data.total} invoices</p></div>{error && <p role="alert" className="form-error">{error}</p>}<label className="field-label">Search<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Invoice, order, customer" /></label>
    <AdminDataTable loading={loading} rows={data.items} total={data.total} pageSize={100} columns={[{ key: 'invoice', label: 'Invoice' }, { key: 'order', label: 'Order' }, { key: 'customer', label: 'Customer' }, { key: 'date', label: 'Date' }, { key: 'subtotal', label: 'Subtotal' }, { key: 'tax', label: 'Tax' }, { key: 'delivery', label: 'Delivery' }, { key: 'total', label: 'Grand total' }, { key: 'payment', label: 'Payment' }]} empty="No invoices match this search." renderRow={(i) => <tr key={i.id}><td>{i.invoiceNumber}</td><td><Link to={`/invoice/${encodeURIComponent(i.orderNumber)}`}>{i.orderNumber}</Link></td><td>{i.customerName}<small>{i.customerEmail || i.customerPhone}</small></td><td>{formatDateTime(i.invoiceDate)}</td><td>{rupeesShort(i.subtotal)}</td><td>{rupeesShort(i.taxAmount)}</td><td>{rupeesShort(i.deliveryCharge)}</td><td>{rupeesShort(i.grandTotal)}</td><td>{i.paymentMethod} / {i.paymentStatus}</td></tr>} />
  </AdminLayout>;
}
