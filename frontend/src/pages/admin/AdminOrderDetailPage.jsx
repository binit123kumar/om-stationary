// Admin order detail: status transitions, delivery
// assignment and COD receipt confirmation. Every action
// is the real API transition; next statuses come from
// the server so the UI can never offer an invalid one.
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { OrderStatusBadge } from '../../components/orders/OrderStatusBadge.jsx';
import { OrderStatusTimeline } from '../../components/orders/OrderStatusTimeline.jsx';
import {
  adminHeaders,
  assignDelivery,
  confirmOrderPayment,
  getAdminOrder,
  updateOrderStatus
} from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { formatDateTime } from '../../utils/formatDate.js';
import { actionLabelFor } from '../../utils/formatOrderStatus.js';
import { rupees } from '../../utils/formatCurrency.js';

export function AdminOrderDetailPage({ user, key, onLogout }) {
  const { id } = useParams();
  const headers = adminHeaders(readSession(), key);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [pendingStatus, setPendingStatus] = useState(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignBusy, setAssignBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAdminOrder(id, headers);
      if (data === null) throw new Error('That order was not found.');
      setOrder(data);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, key, user?.id]);

  useEffect(() => { load(); }, [load]);

  const runStatus = async (status) => {
    setMessage('');
    setError('');
    setPendingStatus(order.id);
    try {
      const response = await updateOrderStatus(order.id, status, headers);
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.detail || `This order cannot move to ${status}.`);
      setMessage(`Order moved to ${status}.`);
      await load();
    } catch (e) {
      setError(e.message || 'Status update failed.');
    } finally {
      setPendingStatus(null);
    }
  };

  const submitAssign = async (event) => {
    event.preventDefault();
    setAssignBusy(true);
    const values = new FormData(event.currentTarget);
    try {
      const response = await assignDelivery(
        order.id, values.get('partner'), values.get('tracking'), headers
      );
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || 'Delivery assignment failed.');
      setMessage('Delivery assignment saved.');
      setAssignOpen(false);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setAssignBusy(false);
    }
  };

  const runMarkPaid = async () => {
    setMessage('');
    setError('');
    try {
      const response = await confirmOrderPayment(order.id, headers);
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || 'Could not confirm COD receipt.');
      setMessage('Cash receipt recorded.');
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <AdminLayout user={user} onLogout={onLogout}><p className="catalog-state">Loading order...</p></AdminLayout>;

  if (error || !order) {
    return (
      <AdminLayout user={user} onLogout={onLogout}>
        <div className="empty">
          <h1>Order unavailable</h1>
          <p>{error || 'This order could not be loaded.'}</p>
          <Link className="btn" to="/admin/orders">Back to orders</Link>
        </div>
      </AdminLayout>
    );
  }

  const nextStatuses = Array.isArray(order.nextStatuses) ? order.nextStatuses : [];
  const pickup = order.fulfillmentMethod === 'Pickup';
  const paid = String(order.paymentStatus || '').toLowerCase() === 'paid';

  return (
    <AdminLayout user={user} onLogout={onLogout}>
      <div className="pagehead">
        <small>ADMIN PANEL</small>
        <h1>Order {order.orderNumber}</h1>
        <p>Placed {formatDateTime(order.createdAt)}</p>
        <Link className="outline" to="/admin/orders">All orders</Link>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <div className="admin-order-detail">
        <section className="panel">
          <div className="admin-order-head">
            <div>
              <b>{order.customerName}</b>
              <span>{order.customerPhone} · {order.customerEmail}</span>
            </div>
            <div>
              <b>{rupees(order.totalAmount)}</b>
              <OrderStatusBadge status={order.status} />
            </div>
          </div>

          <dl className="flow-facts">
            <div><dt>Status</dt><dd>{order.status}</dd></div>
            <div><dt>Fulfilment</dt><dd>{order.fulfillmentMethod}</dd></div>
            <div><dt>Payment</dt><dd>{order.paymentMethod} · {order.paymentStatus}</dd></div>
            <div><dt>Coupon</dt><dd>{order.couponCode || '—'}</dd></div>
          </dl>

          <p>
            {pickup ? 'Pickup' : 'Delivery'}: {order.deliveryAddress}
            {order.city ? `, ${order.city} ${order.pincode}` : ''}
          </p>
          {order.billingAddress && <p>Billing: {order.billingAddress}</p>}

          <h3>Items</h3>
          <table className="admin-table">
            <thead>
              <tr><th>Product</th><th>SKU</th><th>Qty</th><th>Unit price</th><th>Line total</th></tr>
            </thead>
            <tbody>
              {(order.items || []).map((line) => (
                <tr key={line.id}>
                  <td>{line.productName}</td>
                  <td>{line.sku || '—'}</td>
                  <td>{line.quantity}</td>
                  <td>{rupees(line.unitPrice)}</td>
                  <td>{rupees(line.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Totals</h3>
          <div className="tracking-totals">
            <div className="tracking-item"><span>Subtotal</span><b>{rupees(order.subtotal)}</b></div>
            {Number(order.discountAmount) > 0 && (
              <div className="tracking-item">
                <span>Discount</span><b>&minus; {rupees(order.discountAmount)}</b>
              </div>
            )}
            <div className="tracking-item"><span>GST</span><b>{rupees(order.taxAmount)}</b></div>
            <div className="tracking-item"><span>Delivery</span><b>{rupees(order.deliveryCharge)}</b></div>
            <div className="tracking-item tracking-total">
              <span>Total</span><b>{rupees(order.totalAmount)}</b>
            </div>
          </div>
        </section>

        <section className="panel">
          <h2>Actions</h2>
          <div className="admin-status-actions">
            <span className="admin-current-status">
              Status: <b>{order.status}</b>
            </span>
            {nextStatuses.map((status) => (
              <button
                key={status}
                className="outline"
                disabled={pendingStatus === order.id}
                onClick={() => runStatus(status)}
              >
                {pendingStatus === order.id ? 'Saving...' : (actionLabelFor(status) || status)}
              </button>
            ))}
            {nextStatuses.length === 0 && (
              <span className="admin-terminal">No further action available.</span>
            )}
            {pendingStatus === order.id && <small role="status">Saving...</small>}
          </div>

          <div className="admin-actions-grid">
            <button className="outline" onClick={() => setAssignOpen(true)}>Assign delivery</button>
            {order.paymentStatus !== 'Paid' && ['Delivered', 'Picked Up'].includes(order.status) && (
              <button className="outline" onClick={runMarkPaid}>Confirm cash received</button>
            )}
            {order.canCancel && (
              <button className="outline" onClick={() => runStatus('Cancelled')}>Cancel order</button>
            )}
          </div>

          {order.delivery && (
            <div className="delivery-summary">
              <h3>Delivery</h3>
              <p>Partner: {order.delivery.partnerName || '—'}</p>
              <p>Tracking: {order.delivery.trackingCode || '—'}</p>
              <p>Status: {order.delivery.status}</p>
              {order.delivery.charge > 0 && <p>Charge: {rupees(order.delivery.charge)}</p>}
            </div>
          )}

          {order.payments?.length > 0 && (
            <div className="payments-summary">
              <h3>Payment records</h3>
              <table className="admin-table">
                <thead><tr><th>Provider</th><th>Status</th><th>Amount</th><th>Reference</th><th>Date</th></tr></thead>
                <tbody>
                  {order.payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.provider}</td>
                      <td>{payment.status}</td>
                      <td>{rupees(payment.amount)}</td>
                      <td>{payment.providerReference || '—'}</td>
                      <td>{formatDateTime(payment.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {order.invoice && (
            <div className="invoice-summary">
              <h3>Invoice</h3>
              <p>
                {order.invoice.invoiceNumber} · {formatDateTime(order.invoice.invoiceDate)} · {order.invoice.paymentStatus}
              </p>
              <Link className="outline" to={`/invoice/${encodeURIComponent(order.orderNumber)}`}>View invoice</Link>
            </div>
          )}

          <h3>Status history</h3>
          <OrderStatusTimeline history={order.history} />
        </section>
      </div>

      {assignOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Assign delivery" onClick={() => !assignBusy && setAssignOpen(false)}>
          <form className="modal-card" onSubmit={submitAssign} onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <h2>Assign delivery</h2>
              <button type="button" className="modal-close" aria-label="Close" onClick={() => setAssignOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <label className="field-label">
                Delivery partner
                <input name="partner" required placeholder="Partner name" />
              </label>
              <label className="field-label">
                Tracking code
                <input name="tracking" placeholder="Optional" />
              </label>
              <button className="btn" type="submit" disabled={assignBusy}>
                {assignBusy ? 'Assigning...' : 'Assign delivery'}
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
