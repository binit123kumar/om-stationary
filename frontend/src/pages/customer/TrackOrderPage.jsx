// Track order page: real-time status, items, totals and
// server-authoritative payment verification.
import { Link, useParams } from 'react-router-dom';
import { PackageCheck } from 'lucide-react';
import { OrderActions } from '../../components/orders/OrderActions.jsx';
import { TrackingTimeline } from '../../components/orders/TrackingTimeline.jsx';
import { PickupStation } from '../../components/layout/PickupStation.jsx';
import { useOrderLookup } from '../../hooks/useOrders.js';
import { usePickupLocation } from '../../hooks/usePickupLocation.js';
import { readTrackingToken } from '../../utils/storage.js';
import { getOrderByNumber } from '../../services/orderService.js';
import { useEffect } from 'react';

export function TrackOrderPage() {
  const { id } = useParams();
  const location = usePickupLocation();
  const { order, loading, error, setOrder } = useOrderLookup(id);

  // Keep the tracking token next to the lookup so a customer who
  // lands from an old link still resolves the order.
  useEffect(() => {
    readTrackingToken(id);
  }, [id]);

  const refresh = async () => {
    const response = await getOrderByNumber(id, readTrackingToken(id));
    if (response.ok) setOrder(await response.json());
  };

  if (loading) return <div className="catalog-state">Loading order…</div>;

  if (error) {
    return (
      <div className="empty">
        <PackageCheck size={44} />
        <h1>Order lookup</h1>
        <p>{error}</p>
        <Link className="btn" to="/orders">Try another order</Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="empty">
        <PackageCheck size={44} />
        <h1>Order not found</h1>
        <Link className="btn" to="/orders">Go to orders</Link>
      </div>
    );
  }

  const pickup = order.fulfillmentMethod === 'Pickup';

  return (
    <>
      <div className="pagehead">
        <small>ORDER TRACKING</small>
        <h1>Order {order.orderNumber}</h1>
        <p>
          Placed {new Date(order.createdAt).toLocaleString()}
          {order.requestedDeliveryDate &&
            ` · ${pickup ? 'Pickup' : 'Delivery'} requested for ${new Date(order.requestedDeliveryDate).toLocaleString()}`}
        </p>
        <OrderActions orderNumber={order.orderNumber} />
      </div>
      <div className="tracking-layout">
        <TrackingTimeline order={order} onOrderRefresh={refresh} />
        {pickup && <PickupStation location={location} compact />}
      </div>
    </>
  );
}
