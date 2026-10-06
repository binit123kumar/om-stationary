// Order list container.
import { OrderCard } from './OrderCard.jsx';

export function OrderList({ orders }) {
  return (
    <div className="recent-orders">
      {(orders || []).map((order) => (
        <OrderCard key={order.orderNumber || order.id} order={order} />
      ))}
    </div>
  );
}
