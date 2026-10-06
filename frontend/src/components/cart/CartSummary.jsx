// Order summary sidebar for the cart page.
import { Link } from 'react-router-dom';
import { CartTotals } from './CartTotals.jsx';

export function CartSummary({ cart }) {
  return (
    <aside className="summary">
      <h3>Order Summary</h3>
      <CartTotals cart={cart} />
      <small>Delivery charges for doorstep delivery are quoted by the store at checkout.</small>
      <Link className="btn wide" to="/checkout">Proceed to Checkout</Link>
      <Link className="outline wide" to="/search">Continue Shopping</Link>
    </aside>
  );
}
