// Header cart count badge.
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export function CartBadge({ count = 0 }) {
  return (
    <Link to="/cart" className="headlink" aria-label={`Cart, ${count} items`}>
      <ShoppingCart /> <b>{count}</b>
    </Link>
  );
}
