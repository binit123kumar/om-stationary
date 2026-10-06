// Online payment step (UPI).
//
// Reached after placing an order with payment method UPI. The order is
// loaded from the API with the tracking token issued at placement, so
// every amount on screen is the confirmed order total — never a
// client-side calculation.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banknote, PackageCheck } from 'lucide-react';
import { getOrderByNumber } from '../../services/orderService.js';
import { getPaymentOptions } from '../../services/paymentService.js';
import { UpiPaymentPanel } from '../../components/checkout/UpiPaymentPanel.jsx';
import { OrderSummary } from '../../components/checkout/OrderSummary.jsx';
import { readTrackingToken } from '../../utils/storage.js';
import { isPaid } from '../../utils/formatOrderStatus.js';
import { rupees } from '../../utils/formatCurrency.js';

export function PaymentPage() {
  const params = new URLSearchParams(window.location.search);
  const orderNumber = params.get('order') || '';

  const [order, setOrder] = useState(null);
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrder = async () => {
    if (!orderNumber) {
      setLoading(false);
      setError('No order was given to pay for.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await getOrderByNumber(orderNumber, readTrackingToken(orderNumber));
      if (response.status === 404) throw new Error('We could not find that order number.');
      if (!response.ok) throw new Error('Could not load this order. Please try again.');
      setOrder(await response.json());
      const paymentOptions = await getPaymentOptions();
      setOptions(paymentOptions);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrder(); }, [orderNumber]);

  if (loading) return <div className="catalog-state">Loading payment…</div>;

  if (error || !order) {
    return (
      <div className="empty">
        <PackageCheck size={44} />
        <h1>Payment</h1>
        <p>{error || 'This order could not be loaded.'}</p>
        <Link className="btn" to="/orders">Go to orders</Link>
        <Link className="outline" to="/search">Continue shopping</Link>
      </div>
    );
  }

  // Already verified (e.g. the customer returned to the link):
  // show the confirmed state instead of a new QR.
  if (isPaid(order)) {
    return (
      <div className="payment-glass payment-state-box">
        <div className="success-check"><Banknote size={44} /></div>
        <h2>Payment verified</h2>
        <p>The OM Stationary service confirmed this payment. Your invoice is ready.</p>
        <Link className="btn wide" to={`/invoice/${encodeURIComponent(order.orderNumber)}`}>View invoice</Link>
        <Link className="outline wide" to={`/track/${encodeURIComponent(order.orderNumber)}`}>Track order</Link>
      </div>
    );
  }

  return (
    <section className="checkout-flow-3d">
      <div className="payment-3d-page-wrap">
        <UpiPaymentPanel order={order} options={options} onVerified={loadOrder} />
      </div>
      <aside className="flow-summary-card">
        <h3>Order {order.orderNumber}</h3>
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
          Pay exactly {rupees(order.totalAmount)}. The order is only
          marked paid after the OM Stationary payment service verifies it.
        </small>
      </aside>
    </section>
  );
}
