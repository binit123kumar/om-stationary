// My Orders page.
//
// Signed-in customers see their server-side order list; guests see the
// orders this device placed, resolved through their real tracking tokens.
import { Bell } from 'lucide-react';
import { OrderFilters } from '../../components/orders/OrderFilters.jsx';
import { OrderList } from '../../components/orders/OrderList.jsx';
import { useOrders } from '../../hooks/useOrders.js';

export function OrdersPage({ user }) {
  const { recent, loading } = useOrders(user);

  return (
    <>
      <div className="pagehead">
        <small>MY ORDERS</small>
        <h1>Track your orders</h1>
        <p>
          Orders placed on this device appear here. You can also look up
          an order number from your confirmation.
        </p>
      </div>

      <OrderFilters />

      <div className="rowhead"><h2>Recent orders</h2></div>
      {loading
        ? <div className="catalog-state">Loading orders...</div>
        : recent.length
          ? <OrderList orders={recent} />
          : <div className="catalog-state">No recent orders on this device yet.</div>}

      <p className="muted">
        <Bell size={14} /> Order status changes are sent to your
        notifications when you are signed in.
      </p>
    </>
  );
}
