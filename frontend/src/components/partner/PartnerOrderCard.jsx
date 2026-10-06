// Partner order card with the real order status actions
// the partner state machine allows.
import { useState } from 'react';
import { OrderStatusBadge } from '../orders/OrderStatusBadge.jsx';
import { rupees } from '../../utils/formatCurrency.js';

const ALLOWED_ACTIONS = ['Accepted', 'Preparing', 'Ready for Pickup'];

export function PartnerOrderCard({ order, onStatus }) {
  const [busy, setBusy] = useState(null);

  const run = async (status) => {
    setBusy(order.id);
    try {
      await onStatus(order.id, status);
    } finally {
      setBusy(null);
    }
  };

  return (
    <article className="partner-order">
      <div className="admin-order-head">
        <div>
          <b>{order.orderNumber}</b>
          <span>{order.customerName} · {order.customerPhone}</span>
        </div>
        <div>
          <b>{rupees(order.totalAmount)}</b>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>
      <p>{order.deliveryAddress}</p>
      <div className="tracking-items">
        {(order.items || []).map((item, index) => (
          <small key={index}>{item.productName} × {item.quantity}</small>
        ))}
      </div>
      <div className="partner-actions">
        {ALLOWED_ACTIONS.map((status) => (
          <button
            key={status}
            className="outline"
            onClick={() => run(status)}
            disabled={busy === order.id}
          >
            {busy === order.id ? 'Saving…' : status}
          </button>
        ))}
      </div>
    </article>
  );
}
