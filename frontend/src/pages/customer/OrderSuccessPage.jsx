// Order success / confirmation page.
//
// Reached after placing an order. COD orders see the real
// "pay at the shop" confirmation; online orders that were already
// verified see the confirmed state. The order is always loaded
// from the API with the tracking token — nothing is fabricated.
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PackageCheck } from 'lucide-react';
import { getOrderByNumber } from '../../services/orderService.js';
import { CodConfirmation } from '../../components/checkout/CodConfirmation.jsx';
import { OrderSummary } from '../../components/checkout/OrderSummary.jsx';
import { readTrackingToken } from '../../utils/storage.js';
import { isPaid } from '../../utils/formatOrderStatus.js';
import { paymentLabel } from '../../utils/formatOrderStatus.js';

export function OrderSuccessPage() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const orderNumber = params.get('order') || '';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrder = async () => {
    if (!orderNumber) {
      setLoading(false);
      setError('No order was placed.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await getOrderByNumber(orderNumber, readTrackingToken(orderNumber));
      if (response.status === 404) throw new Error('We could not find that order number.');
      if (!response.ok) throw new Error('Could not load this order. Please try again.');
      setOrder(await response.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrder(); }, [orderNumber]);

  if (loading) return <div className="catalog-state">Loading order confirmation…</div>;

  if (error || !order) {
    return (
      <div className="empty">
        <PackageCheck size={44} />
        <h1>Order confirmation</h1>
        <p>{error || 'This order could not be loaded.'}</p>
        <Link className="btn" to="/orders">Go to orders</Link>
        <Link className="outline" to="/search">Continue shopping</Link>
      </div>
    );
  }

  const online = order.paymentMethod === 'Paytm UPI' || order.paymentMethod === 'UPI';

  return (
    <section className="checkout-flow-3d">
      <div className="payment-3d-page-wrap">
        {online
          ? (
            <div className="payment-glass payment-state-box">
              <div className="success-check"><PackageCheck size={44} /></div>
              <h2>Order placed &middot; {order.orderNumber}</h2>
              <p>
                Payment status: <b>{order.paymentStatus}</b>.
                {isPaid(order)
                  ? ' The OM Stationary service has verified your payment.'
                  : ' Complete the UPI payment and verify it from the payment page.'}
              </p>
              <Link className="btn wide" to={`/payment?order=${encodeURIComponent(order.orderNumber)}`}>
                {isPaid(order) ? 'View invoice' : 'Go to payment'}
              </Link>
              <Link className="outline wide" to={`/track/${encodeURIComponent(order.orderNumber)}`}>Track order</Link>
            </div>
          )
          : <CodConfirmation order={order} onContinue={() => navigate('/search')} />}
      </div>
      <aside className="flow-summary-card">
        <h3>Order placed</h3>
        <dl className="flow-facts">
          <div><dt>Order number</dt><dd>{order.orderNumber}</dd></div>
          <div><dt>Fulfillment</dt><dd>{order.fulfillmentMethod}</dd></div>
          <div><dt>Payment method</dt><dd>{paymentLabel(order.paymentMethod)}</dd></div>
          <div><dt>Payment status</dt><dd>{order.paymentStatus}</dd></div>
          <div><dt>Invoice</dt><dd>{order.invoiceNumber || 'Generated'}</dd></div>
        </dl>
        <OrderSummary
          items={(order.items || []).map((line) => ({
            id: line.productId,
            name: line.productName,
            q: line.quantity,
            price: line.unitPrice
          }))}
          subtotal={order.subtotal}
          discount={order.discountAmount}
          deliveryCharge={order.deliveryCharge}
          taxRatePercent={order.taxRatePercent}
          taxAmount={order.taxAmount}
          grandTotal={order.totalAmount}
          payableLabel="Amount payable"
        />
        <small>
          The store verifies stock, pricing and delivery charges on the
          server. The invoice is generated from this confirmed order.
        </small>
      </aside>
    </section>
  );
}
