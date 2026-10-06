// Money breakdown for a tracked order. Values come from the
// confirmed order record — nothing is recalculated client-side.
import { rupees } from '../../utils/formatCurrency.js';

export function OrderSummary({ order }) {
  const subtotal = Number(order?.subtotal || 0);
  const discount = Number(order?.discountAmount || 0);
  const tax = Number(order?.taxAmount || 0);
  const delivery = Number(order?.deliveryCharge || 0);
  const total = Number(order?.totalAmount || 0);

  return (
    <div className="tracking-totals">
      <div className="tracking-item">
        <span>Items subtotal</span>
        <b>{rupees(subtotal)}</b>
      </div>
      {discount > 0 && (
        <div className="tracking-item">
          <span>Discount{order.couponCode ? ` (${order.couponCode})` : ''}</span>
          <b>&minus; {rupees(discount)}</b>
        </div>
      )}
      <div className="tracking-item">
        <span>GST</span>
        <b>{rupees(tax)}</b>
      </div>
      <div className="tracking-item">
        <span>Delivery</span>
        <b>{delivery > 0 ? rupees(delivery) : 'Free'}</b>
      </div>
      <div className="tracking-item tracking-total">
        <span>Total</span>
        <b>{rupees(total)}</b>
      </div>
    </div>
  );
}
