// Checkout order summary: line items and every total,
// rendered from the API-quoted values where present.
import { rupees } from '../../utils/formatCurrency.js';

export function OrderSummary({
  items,
  subtotal,
  discount = 0,
  deliveryCharge = 0,
  taxRatePercent = 0,
  taxAmount = 0,
  grandTotal,
  payableLabel = 'Grand Total',
  showDelivery = true
}) {
  return (
    <div className="flow-totals">
      {(items || []).map((item) => (
        <p className="flow-item" key={item.id}>
          <span>{item.name} &times; {item.q}</span>
          <b>{rupees(item.price * item.q)}</b>
        </p>
      ))}
      <hr />
      <p className="flow-total"><span>Items subtotal</span><b>{rupees(subtotal)}</b></p>
      {Number(discount) > 0 && (
        <p className="flow-total discount">
          <span>Discount</span>
          <b>&minus; {rupees(discount)}</b>
        </p>
      )}
      <p className="flow-total">
        <span>Taxable value</span>
        <b>{rupees(subtotal - (Number(discount) || 0))}</b>
      </p>
      <p className="flow-total">
        <span>GST ({Number(taxRatePercent || 0).toLocaleString('en-IN')}%)</span>
        <b>{rupees(taxAmount)}</b>
      </p>
      {showDelivery && (
        <p className="flow-total">
          <span>Delivery</span>
          <b>{Number(deliveryCharge) > 0 ? rupees(deliveryCharge) : 'Free'}</b>
        </p>
      )}
      <p className="flow-grand">
        <span>{payableLabel}</span>
        <b>{rupees(grandTotal)}</b>
      </p>
    </div>
  );
}
