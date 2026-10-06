// Recent orders preview for the account page.
import { Link } from 'react-router-dom';
import { OrderList } from '../orders/OrderList.jsx';

export function RecentOrders({ orders = [], loading = false }) {
  return (
    <section className="panel">
      <div className="rowhead">
        <h2>Recent orders</h2>
        <Link to="/orders">View all</Link>
      </div>
      {loading
        ? <p className="catalog-state">Loading orders...</p>
        : orders.length
          ? <OrderList orders={orders.slice(0, 3)} />
          : <p className="catalog-state">No recent orders on this device yet.</p>}
    </section>
  );
}
