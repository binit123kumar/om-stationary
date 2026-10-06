// Empty cart state.
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="empty">
      <ShoppingCart size={48} />
      <h1>Your cart is empty</h1>
      <p>Browse the catalogue and add the stationery and office essentials you need.</p>
      <Link className="btn" to="/search">Continue Shopping</Link>
    </div>
  );
}
