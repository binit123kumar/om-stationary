// COD confirmation: the order is placed and stays Pending until
// the store confirms the cash receipt. Never claims payment happened.
import { Link } from 'react-router-dom';
import { Banknote } from 'lucide-react';
import { rupees } from '../../utils/formatCurrency.js';

export function CodConfirmation({ order, onContinue }) {
  return (
    <div className="payment-glass payment-state-box">
      <div className="success-check cod"><Banknote size={44} /></div>
      <h2>Order placed &middot; {order.orderNumber}</h2>
      <p>Pay <b>{rupees(order.totalAmount)}</b> at the shop when you collect your order.</p>
      <p className="payment-upi">
        Payment status: <b>Pending &middot; Pay on Shop (COD)</b>.
        It only becomes Paid after the store confirms the cash receipt.
      </p>
      <Link className="btn wide" to={`/invoice/${encodeURIComponent(order.orderNumber)}`}>View invoice</Link>
      <Link className="outline wide" to={`/track/${encodeURIComponent(order.orderNumber)}`}>Track order</Link>
      <button className="outline wide" onClick={onContinue}>Continue shopping</button>
    </div>
  );
}
