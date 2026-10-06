// Order/payment status presentation. Labels and badges only — the backend owns
// the real state machine (see OrderStateMachine on the API), so transitions are
// never decided here.
export const paymentLabel = (method) => {
  const labels = { 'Paytm UPI': 'Online Payment (UPI)', COD: 'Pay on Shop (COD)', UPI: 'Online Payment (UPI)' };
  return labels[method] || method || 'Not recorded';
};

export const fulfillmentLabel = (method) => (method === 'Pickup' ? 'Store Pickup' : 'Home Delivery');

export const isPaid = (order) =>
  String(order?.paymentStatus || '').toLowerCase() === 'paid';

// Server-sent nextStatuses win; the fallback map only covers statuses the older
// API payloads may not annotate.
export const nextStatusesFor = (order, fallback) => {
  if (Array.isArray(order?.nextStatuses)) return order.nextStatuses;
  return (fallback && fallback[order?.status]) || [];
};

export const actionLabelFor = (status) => {
  const labels = {
    Confirmed: 'Confirm order',
    Accepted: 'Accept order',
    Preparing: 'Start preparing',
    'Ready for Pickup': 'Mark ready for pickup',
    'Picked Up': 'Mark picked up',
    'Out for Delivery': 'Send out for delivery',
    Delivered: 'Mark delivered',
    'Delivery Failed': 'Report delivery failed',
    'Confirmed (retry)': 'Retry confirmation',
    RefundPending: 'Request refund',
    Refunded: 'Mark refunded'
  };
  return labels[status] || status;
};

export const stockStateLabel = (product) => {
  const stock = Number(product?.stock ?? 0);
  const threshold = Number(product?.lowStockThreshold ?? 0);
  if (stock <= 0) return 'Out of stock';
  if (stock <= threshold) return 'Low stock';
  return 'In stock';
};
