// Admin orders list with the real server-side filters.
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import { OrderStatusBadge } from '../../components/orders/OrderStatusBadge.jsx';
import { adminHeaders, getFilterOptions, listAdminOrders } from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { formatDateTime } from '../../utils/formatDate.js';
import { rupeesShort } from '../../utils/formatCurrency.js';
import { PAGE_SIZE } from '../../utils/constants.js';

export function AdminOrdersPage({ user, key, onLogout }) {
  const headers = adminHeaders(readSession(), key);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [options, setOptions] = useState(null);

  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [fulfillment, setFulfillment] = useState('');
  const [page, setPage] = useState(1);

  const filters = useMemo(() => ({
    q, status, paymentStatus, paymentMethod, fulfillment
  }), [q, status, paymentStatus, paymentMethod, fulfillment]);

  useEffect(() => {
    let active = true;
    getFilterOptions(headers).then((data) => { if (active) setOptions(data); }).catch(() => {});
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, user?.id]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
    Object.entries(filters).forEach(([filterKey, value]) => {
      if (value) params.set(filterKey, value);
    });
    listAdminOrders(headers, Object.fromEntries(params))
      .then(async (response) => {
        if (!active) return;
        if (response.status === 401) throw new Error('Admin sign-in is required.');
        if (!response.ok) throw new Error('Could not load orders.');
        const data = await response.json();
        setRows(Array.isArray(data) ? data : (data.items || []));
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch((e) => { if (active) { setError(e.message); setLoading(false); } });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page, key, user?.id]);

  const selectOptions = (values) => (
    <>
      <option value="">All</option>
      {(values || []).map((value) => (
        <option key={value} value={value}>{value}</option>
      ))}
    </>
  );

  return (
    <AdminLayout user={user} onLogout={onLogout}>
      <div className="pagehead">
        <small>ADMIN PANEL</small>
        <h1>Orders</h1>
        <p>{total} total</p>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="admin-filter-row">
        <label className="field-label">
          Search
          <input value={q} placeholder="Order, customer, phone" onChange={(event) => { setQ(event.target.value); setPage(1); }} />
        </label>
        <label className="field-label">
          Status
          <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}>
            {selectOptions(options?.orderStatuses)}
          </select>
        </label>
        <label className="field-label">
          Payment status
          <select value={paymentStatus} onChange={(event) => { setPaymentStatus(event.target.value); setPage(1); }}>
            {selectOptions(options?.paymentStatuses)}
          </select>
        </label>
        <label className="field-label">
          Payment method
          <select value={paymentMethod} onChange={(event) => { setPaymentMethod(event.target.value); setPage(1); }}>
            {selectOptions(options?.paymentMethods)}
          </select>
        </label>
        <label className="field-label">
          Fulfilment
          <select value={fulfillment} onChange={(event) => { setFulfillment(event.target.value); setPage(1); }}>
            <option value="">All</option>
            <option value="Pickup">Pickup</option>
            <option value="Delivery">Delivery</option>
          </select>
        </label>
      </div>

      <AdminDataTable
        loading={loading}
        columns={[
          { key: 'order', label: 'Order' },
          { key: 'customer', label: 'Customer' },
          { key: 'placed', label: 'Placed' },
          { key: 'status', label: 'Status' },
          { key: 'payment', label: 'Payment' },
          { key: 'total', label: 'Total' }
        ]}
        rows={rows}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        onPage={setPage}
        renderRow={(order) => (
          <tr key={order.id || order.orderNumber}>
            <td>
              <Link to={`/admin/orders/${order.id}`}>{order.orderNumber}</Link>
              {order.invoiceNumber && <small>Invoice {order.invoiceNumber}</small>}
            </td>
            <td>
              <b>{order.customerName}</b>
              <small>{order.customerPhone}{order.customerEmail ? ` · ${order.customerEmail}` : ''}</small>
            </td>
            <td>{formatDateTime(order.createdAt)}</td>
            <td><OrderStatusBadge status={order.status} /></td>
            <td>{order.paymentMethod} · {order.paymentStatus}</td>
            <td>{rupeesShort(order.totalAmount)}</td>
          </tr>
        )}
      />
    </AdminLayout>
  );
}
