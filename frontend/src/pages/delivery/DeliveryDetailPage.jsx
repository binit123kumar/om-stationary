import { Link, useParams } from 'react-router-dom';
import { DeliveryCard } from '../../components/delivery/DeliveryCard.jsx';
import { useDeliveryAssignments } from '../../hooks/useDelivery.js';

export function DeliveryDetailPage() { const {id}=useParams(); const {assignments,error,changeStatus}=useDeliveryAssignments(); const d=assignments.find(x=>String(x.id)===String(id)); return <section className="account-page"><div className="pagehead"><small>DELIVERY PARTNER</small><h1>Delivery details</h1><Link className="outline" to="/delivery/assigned">Assigned deliveries</Link></div>{error&&<p role="alert" className="form-error">{error}</p>}{d?<DeliveryCard delivery={d} onStatus={changeStatus}/>:!error&&<p>Loading delivery or this assignment is unavailable.</p>}</section>; }
