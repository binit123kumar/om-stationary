// Tracking timeline: current status, fulfilment facts, items
// and the payment block with server-side verification.
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { verifyPayment } from '../../services/paymentService.js';
import { readTrackingToken } from '../../utils/storage.js';
import { OrderStatusBadge } from './OrderStatusBadge.jsx';
import { OrderStatusTimeline } from './OrderStatusTimeline.jsx';
import { OrderSummary } from './OrderSummary.jsx';
import { formatDateTime } from '../../utils/formatDate.js';
import { paymentLabel } from '../../utils/formatOrderStatus.js';
import { rupees } from '../../utils/formatCurrency.js';

export function TrackingTimeline({ order, onOrderRefresh }) {
  const [payState, setPayState] = useState('');
  const [verifying, setVerifying] = useState(false);

  const pickup = order.fulfillmentMethod === 'Pickup';
  const online = order.paymentMethod === 'Paytm UPI' || order.paymentMethod === 'UPI';
  const paid = String(order.paymentStatus || '').toLowerCase() === 'paid';

  // The store's payment service is the only authority on whether an
  // online payment succeeded.
  const verify = async () => {
    if (verifying) return;
    setVerifying(true);
    setPayState('');
    try {
      const response = await verifyPayment(order.orderNumber, readTrackingToken(order.orderNumber));
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setPayState(body?.detail || 'Payment verification is not available for this order.');
        return;
      }
      const data = await response.json();
      if (data?.status === 'Paid' || data?.paymentStatus === 'Paid') {
        setPayState('Payment verified by OM Stationary.');
        if (onOrderRefresh) onOrderRefresh();
        return;
      }
      if (data?.status === 'ReviewRequired') {
        setPayState(data.detail || 'The amount reported by the gateway does not match this order. Our team will review it.');
        return;
      }
      if (data?.status === 'Failed') {
        setPayState('The payment attempt was not completed. You can try paying again from the order page.');
        return;
      }
      if (data?.verified === false && data?.status === 'NotConfigured') {
        setPayState('Payment verification not configured. The order stays Pending until the store confirms it.');
        return;
      }
      setPayState(data?.detail || 'Payment not confirmed yet. Complete the UPI payment and verify again.');
    } catch {
      setPayState('Could not reach the payment service. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <section className="track">
      <div className="tracking-current">
        <OrderStatusBadge status={order.status} />
        <p>{pickup
          ? 'Your order will be collected from OM Stationary.'
          : 'Your order is with the verified local delivery flow.'}</p>
      </div>
      <dl className="flow-facts">
        <div><dt>Customer</dt><dd>{order.customerName || '—'}</dd></div>
        <div><dt>Mobile</dt><dd>{order.customerPhone || '—'}</dd></div>
        <div><dt>Email</dt><dd>{order.customerEmail || '—'}</dd></div>
        <div><dt>Fulfillment</dt><dd>{order.fulfillmentMethod}</dd></div>
      </dl>

      <h3>Items</h3>
      {(order.items || []).map((item, index) => (
        <div className="tracking-item" key={index}>
          <span>{item.productName} &times; {item.quantity}</span>
          <b>{rupees(Number(item.unitPrice) * item.quantity)}</b>
        </div>
      ))}
      <hr />
      <OrderSummary order={order} />

      <h3>Payment</h3>
      <p className="tracking-payment">
        Method: <b>{online ? 'Online Payment (UPI)' : paymentLabel(order.paymentMethod)}</b>
        {' &middot; Status: '}
        <b className={paid ? 'status-paid' : 'status-pending'}>{order.paymentStatus}</b>
      </p>
      {online && !paid && (
        <>
          <button className="outline" onClick={verify} disabled={verifying}>
            {verifying ? 'Verifying with OM Stationary…' : 'Verify payment status'}
          </button>
          {payState && <p className="quote-bad" role="status">{payState}</p>}
        </>
      )}
      {online && paid && (
        <p className="quote-ok"><CheckCircle2 size={16} /> Payment verified by OM Stationary</p>
      )}

      <OrderStatusTimeline history={order.history} />
    </section>
  );
}
