// Order summary card used in order lists.
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge.jsx';
import { rupeesShort } from '../../utils/formatCurrency.js';
import { formatDate } from '../../utils/formatDate.js';

export function OrderCard({ order }) {
  return (
    <Link className="recent-order" to={'/track/' + encodeURIComponent(order.orderNumber)}>
      <div>
        <b>{order.orderNumber}</b>
        <span>
          <OrderStatusBadge status={order.status} />
          {' · '}{formatDate(order.createdAt)}
        </span>
      </div>
      <b>{rupeesShort(order.totalAmount)}</b>
      <ChevronRight size={18} />
    </Link>
  );
}
