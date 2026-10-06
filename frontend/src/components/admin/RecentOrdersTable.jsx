// Recent orders table for the admin dashboard.
import { Link } from 'react-router-dom';
import { rupeesShort } from '../../utils/formatCurrency.js';
import { formatDateTime } from '../../utils/formatDate.js';
import { OrderStatusBadge } from '../orders/OrderStatusBadge.jsx';

export function RecentOrdersTable({ orders = [], money }) {
  if (!orders.length) return <p className="catalog-state">No orders yet.</p>;
  const inr = money || ((value) => rupeesShort(value));

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Order</th><th>Customer</th><th>Placed</th><th>Status</th><th>Payment</th><th>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.slice(0, 10).map((order) => (
          <tr key={order.id || order.orderNumber}>
            <td>
              <Link to={`/admin/orders/${order.id ?? ''}`}>{order.orderNumber}</Link>
            </td>
            <td>
              <b>{order.customerName}</b>
              <small>{order.customerPhone}</small>
            </td>
            <td>{formatDateTime(order.createdAt)}</td>
            <td><OrderStatusBadge status={order.status} /></td>
            <td>{order.paymentMethod} · {order.paymentStatus}</td>
            <td>{inr(order.totalAmount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
