import { Link } from 'react-router-dom';
import { DeliveryCard } from '../../components/delivery/DeliveryCard.jsx';
import { useDeliveryAssignments } from '../../hooks/useDelivery.js';

export function AssignedDeliveriesPage() { const {assignments,error,changeStatus}=useDeliveryAssignments(); return <section className="account-page"><div className="pagehead"><small>DELIVERY PARTNER</small><h1>Assigned deliveries</h1><Link className="outline" to="/delivery">Dashboard</Link></div>{error&&<p role="alert" className="form-error">{error}</p>}{assignments.map(d=><article key={d.id}><DeliveryCard delivery={d} onStatus={changeStatus}/><Link to={`/delivery/${encodeURIComponent(d.id)}`}>View delivery</Link></article>)}{!assignments.length&&!error&&<p>No deliveries are currently assigned.</p>}</section>; }
