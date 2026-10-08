import { Link, useParams } from 'react-router-dom';
import { usePartner } from '../../hooks/usePartner.js';
import { PartnerOrderCard } from '../../components/partner/PartnerOrderCard.jsx';

export function PartnerOrderDetailPage() { const {id}=useParams(); const {orders,error,changeOrderStatus}=usePartner(); const order=orders.find(o=>String(o.id)===String(id)); return <section className="account-page"><div className="pagehead"><small>PARTNER PORTAL</small><h1>Order details</h1><Link className="outline" to="/partner/orders">Back to shop orders</Link></div>{error&&<p role="alert" className="form-error">{error}</p>}{order?<PartnerOrderCard order={order} onStatus={changeOrderStatus}/>:!error&&<p>Loading order or this order is not assigned to your shop.</p>}</section>; }
