import { DeliveryCard } from '../../components/delivery/DeliveryCard.jsx';
import { useDeliveryAssignments } from '../../hooks/useDelivery.js';
import { Link } from 'react-router-dom';

export function DeliveryDashboardPage() {
  const { assignments, error } = useDeliveryAssignments();

  return (
    <section className="account-page">
      <div className="pagehead">
        <small>DELIVERY PARTNER</small>
        <h1>Delivery dashboard</h1>
        <p>{assignments.length} assignments are available on your delivery account.</p>
        <Link className="outline" to="/delivery/assigned">View assigned deliveries</Link>{' '}<Link className="outline" to="/delivery/history">History</Link>{' '}<Link className="outline" to="/delivery/profile">Profile</Link>
      </div>
      {error && <p role="alert" className="form-error">{error}</p>}
      {error ? null : <p>Open the assigned deliveries list to review and update delivery status.</p>}
    </section>
  );
}
