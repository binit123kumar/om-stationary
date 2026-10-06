// Order-level actions: view invoice, track, continue shopping.
import { Link } from 'react-router-dom';

export function OrderActions({ orderNumber }) {
  return (
    <div className="track-actions">
      <Link className="btn" to={`/invoice/${encodeURIComponent(orderNumber)}`}>View invoice</Link>
      <Link className="outline" to="/orders">All my orders</Link>
      <Link className="outline" to="/search">Continue shopping</Link>
    </div>
  );
}
