import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PackageCheck, CheckCircle2 } from 'lucide-react';
import { api } from '../../utils/config.js';
import { apiFetch } from '../../session.js';
import { usePickupLocation } from '../../hooks/usePickupLocation.js';
import { PickupStation } from '../../components/layout/PickupStation.jsx';
export function TrackOrderPage(){
  const {id}=useParams(),location=usePickupLocation();
  const [order,setOrder]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
  const [payState,setPayState]=useState(''),[verifying,setVerifying]=useState(false);
  const token=()=>localStorage.getItem(`omtrack:${id}`)||'';
  useEffect(()=>{let active=true;setLoading(true);setError('');setPayState('');
    apiFetch(`${api}/api/orders/${encodeURIComponent(id)}`,{headers:{'X-Tracking-Token':token()}})
      .then(async r=>{if(r.status===404)throw new Error('We could not find that order number. Check the number, or sign in to the account that placed it.');if(r.status===429)throw new Error('Too many lookups. Please wait a moment and try again.');if(!r.ok)throw new Error('Could not load this order. Please try again.');return r.json()})
      .then(d=>{if(active)setOrder(d)})
      .catch(e=>{if(active)setError(e.message)})
      .finally(()=>{if(active)setLoading(false)});
return()=>{active=false};
  },[id]);

  // The store's payment service is the only authority on whether an online payment succeeded.
  const verifyPayment=async()=>{if(verifying)return;setVerifying(true);setPayState('');
    try{const r=await apiFetch(`/api/payments/orders/${encodeURIComponent(id)}/status`,{method:'POST',headers:{'X-Tracking-Token':token()}});
      if(!r.ok){const b=await r.json().catch(()=>({}));setPayState(b?.detail||'Payment verification is not available for this order.');return}
      const d=await r.json();
      if(d?.status==='Paid'||d?.paymentStatus==='Paid'){setPayState('Payment verified by OM Stationary.');const fresh=await apiFetch(`${api}/api/orders/${encodeURIComponent(id)}`,{headers:{'X-Tracking-Token':token()}});if(fresh.ok)setOrder(await fresh.json());return}
      if(d?.status==='ReviewRequired'){setPayState(d.detail||'The amount reported by the gateway does not match this order. Our team will review it.');return}
      if(d?.status==='Failed'){setPayState('The payment attempt was not completed. You can try paying again from the order page.');return}
      if(d?.verified===false&&d?.status==='NotConfigured'){setPayState('Payment verification not configured. The order stays Pending until the store confirms it.');return}
      setPayState(d?.detail||'Payment not confirmed yet. Complete the UPI payment and verify again.');
    }catch{setPayState('Could not reach the payment service. Please try again.')}finally{setVerifying(false)}};

  if(loading)return <div className="catalog-state">Loading order…</div>;
  if(error)return <div className="empty"><PackageCheck size={44}/><h1>Order lookup</h1><p>{error}</p><Link className="btn" to="/orders">Try another order</Link></div>;
  if(!order)return <div className="empty"><PackageCheck size={44}/><h1>Order not found</h1><Link className="btn" to="/orders">Go to orders</Link></div>;

  const pickup=order.fulfillmentMethod==='Pickup',online=/upi/i.test(String(order.paymentMethod||''));
  const paid=String(order.paymentStatus||'').toLowerCase()==='paid';
  const subtotal=Number(order.subtotal||0),discount=Number(order.discountAmount||0),tax=Number(order.taxAmount||0),
    delivery=Number(order.deliveryCharge||0),total=Number(order.totalAmount||0);

  return <><div className="pagehead"><small>ORDER TRACKING</small><h1>Order {order.orderNumber}</h1>
    <p>Placed {new Date(order.createdAt).toLocaleString()}{order.requestedDeliveryDate&&` · ${pickup?'Pickup':'Delivery'} requested for ${new Date(order.requestedDeliveryDate).toLocaleString()}`}</p>
    <div className="track-actions"><Link className="btn" to={`/invoice/${encodeURIComponent(order.orderNumber)}`}>View invoice</Link><Link className="outline" to="/orders">All my orders</Link><Link className="outline" to="/search">Continue shopping</Link></div></div>
  <div className="tracking-layout"><section className="track">
    <div className="tracking-current"><span className={paid?'pill ok':'pill pending'}>{order.status}</span>
      <p>{pickup?'Your order will be collected from OM Stationary.':'Your order is with the verified local delivery flow.'}</p></div>
    <dl className="flow-facts"><div><dt>Customer</dt><dd>{order.customerName||'—'}</dd></div>
      <div><dt>Mobile</dt><dd>{order.customerPhone||'—'}</dd></div>
      <div><dt>Email</dt><dd>{order.customerEmail||'—'}</dd></div>
      <div><dt>Fulfillment</dt><dd>{order.fulfillmentMethod}</dd></div></dl>

    <h3>Items</h3>
    {order.items?.map((i,n)=><div className="tracking-item" key={n}><span>{i.productName} &times; {i.quantity}</span><b>&#8377;{Number(i.unitPrice*i.quantity).toLocaleString('en-IN')}</b></div>)}
    <hr/>
    <div className="tracking-item"><span>Items subtotal</span><b>&#8377;{subtotal.toLocaleString('en-IN')}</b></div>
    {discount>0&&<div className="tracking-item"><span>Discount{order.couponCode?` (${order.couponCode})`:''}</span><b>&minus; &#8377;{discount.toLocaleString('en-IN')}</b></div>}
    <div className="tracking-item"><span>GST</span><b>&#8377;{tax.toLocaleString('en-IN')}</b></div>
    <div className="tracking-item"><span>Delivery</span><b>{delivery>0?`\u20b9${delivery}`:'Free'}</b></div>
    <div className="tracking-item tracking-total"><span>Total</span><b>&#8377;{total.toLocaleString('en-IN')}</b></div>

    <h3>Payment</h3>
    <p className="tracking-payment">Method: <b>{online?'Online Payment (UPI)':'Pay on Shop (COD)'}</b> &middot; Status: <b className={paid?'status-paid':'status-pending'}>{order.paymentStatus}</b></p>
    {online&&!paid&&<><button className="outline" onClick={verifyPayment} disabled={verifying}>{verifying?'Verifying with OM Stationary…':'Verify payment status'}</button>{payState&&<p className="quote-bad" role="status">{payState}</p>}</>}
    {online&&paid&&<p className="quote-ok"><CheckCircle2 size={16}/> Payment verified by OM Stationary</p>}

    {order.history?.length>0&&<><h3>Status history</h3><ol className="tracking-history">{order.history.map((h,n)=><li key={n}><b>{h.status}</b><span>{h.note||''}</span><small>{new Date(h.createdAt).toLocaleString()}</small></li>)}</ol></>}
  </section>{pickup&&<PickupStation location={location} compact/>}</div></>
}
