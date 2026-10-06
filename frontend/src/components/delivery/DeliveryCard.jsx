// Delivery assignment card with the real delivery
// status transitions the partner is allowed to make.
import { useState } from 'react';
import { OrderStatusBadge } from '../orders/OrderStatusBadge.jsx';
import { rupees } from '../../utils/formatCurrency.js';

// Mirrors the backend DeliveryOperationsController transitions.
const NEXT_ACTIONS = {
  Assigned: ['Accepted', 'Cancelled'],
  Accepted: ['ArrivedAtPickup', 'Cancelled'],
  ArrivedAtPickup: ['PickedUp', 'Failed', 'Cancelled'],
  PickedUp: ['OutForDelivery', 'Failed'],
  OutForDelivery: ['Delivered', 'Failed']
};

const ACTION_LABELS = {
  Accepted: 'Accept',
  ArrivedAtPickup: 'Arrived at pickup',
  PickedUp: 'Picked up',
  OutForDelivery: 'Out for delivery',
  Delivered: 'Mark delivered',
  Failed: 'Report failed',
  Cancelled: 'Cancel'
};

export function DeliveryCard({ delivery, onStatus }) {
  const [busy, setBusy] = useState(false);
  const actions = NEXT_ACTIONS[delivery.status] || [];

  const run = async (status) => {
    setBusy(true);
    try {
      await onStatus(delivery.id, status);
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="panel delivery-card">
      <h2>{delivery.orderNumber} · {delivery.status}</h2>
      <p>Pickup: {delivery.pickupAddress}</p>
      <p>Drop: {delivery.dropAddress}</p>
      <p>Customer: {delivery.customerName} · {delivery.customerPhone}</p>
      <p>
        COD amount: {rupees(delivery.codAmount)} · Payment: {delivery.paymentStatus}
      </p>
      {(delivery.items || []).map((item, index) => (
        <p key={index}>{item.productName} × {item.quantity}</p>
      ))}
      <div className="partner-actions">
        {actions.map((status) => (
          <button
            key={status}
            className="outline"
            onClick={() => run(status)}
            disabled={busy}
          >
            {busy ? 'Saving…' : ACTION_LABELS[status] || status}
          </button>
        ))}
        {delivery.status === 'Delivered' && <OrderStatusBadge status="Delivered" />}
      </div>
    </article>
  );
}
