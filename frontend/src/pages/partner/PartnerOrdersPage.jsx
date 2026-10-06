import { Link } from 'react-router-dom';
import { PartnerOrderCard } from '../../components/partner/PartnerOrderCard.jsx';
import { usePartner } from '../../hooks/usePartner.js';

export function PartnerOrdersPage() {
  const { orders, error, changeOrderStatus } = usePartner();
  return (
    <section className="account-page">
      <div className="pagehead">
        <small>PARTNER PORTAL</small>
        <h1>Shop Orders</h1>
        <p>Accept, prepare and mark orders ready for pickup. Completion and payment stay with the store.</p>
        <Link className="outline" to="/partner">Partner dashboard</Link>
      </div>
      {error && <p role="alert" className="form-error">{error}</p>}
      <section className="panel saved-addresses">
        {orders.map((order) => (
          <PartnerOrderCard key={order.id} order={order} onStatus={changeOrderStatus} />
        ))}
      </section>
    </section>
  );
}
