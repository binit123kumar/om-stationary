// Order status pill. Tones follow the real state machine:
// pending/active states, delivered/picked-up success,
// failed/cancelled attention.
export function OrderStatusBadge({ status }) {
  const value = String(status || '');
  const tone =
    value === 'Delivered' || value === 'Picked Up' || value === 'Refunded' ? 'ok'
      : value === 'Cancelled' || value === 'Delivery Failed' || value === 'Failed' ? 'bad'
        : value === 'Pending' || value === 'Placed' ? 'pending'
          : 'active';
  return <span className={`pill ${tone}`}>{value || '—'}</span>;
}
