import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { apiFetch, clearSession, readSession } from '../../session.js';
const AdminCharts=React.lazy(()=>import('../../AdminCharts.jsx'));
const FALLBACK_NEXT_STATUSES={
 'Pending':['Confirmed'],'Placed':['Confirmed'],'Confirmed':['Preparing'],'Accepted':['Preparing'],
 'Preparing':['Ready for Pickup','Out for Delivery'],'Ready for Pickup':['Picked Up','Out for Delivery'],
 'Picked Up':['Delivered'],'Out for Delivery':['Delivered'],'Delivery Failed':['Confirmed'],
 'Delivered':[],'Cancelled':[],'RefundPending':['Refunded'],'Refunded':[]};
const ACTION_LABELS={'Confirmed':'Confirm order','Accepted':'Accept order','Preparing':'Start preparing',
 'Ready for Pickup':'Mark ready for pickup','Picked Up':'Mark picked up','Out for Delivery':'Send out for delivery',
 'Delivered':'Mark delivered','Delivery Failed':'Report delivery failed','Confirmed (retry)':'Retry confirmation',
 'RefundPending':'Request refund','Refunded':'Mark refunded'};
function AdminSectionData({title,data}){
 if(data?.error)return <section className="panel admin-orders"><h2>{title}</h2><p className="form-error" role="alert">{data.error}</p></section>;
 const rows=Array.isArray(data)?data:Array.isArray(data?.items)?data.items:data?[data]:[];
 const columns=rows.length&&rows[0]&&typeof rows[0]==='object'?Object.keys(rows[0]):[];
 return <section className="panel admin-orders"><div className="rowhead"><h2>{title}</h2><span>{data?.total??rows.length} records</span></div>
  {!rows.length?<p>No records are available.</p>:<div className="admin-data-scroll"><table className="admin-table"><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={row.id??row.orderNumber??index}>{columns.map(c=>{const value=row[c];return <td key={c}>{value==null?'—':typeof value==='object'?JSON.stringify(value):String(value)}</td>})}</tr>)}</tbody></table></div>}
 </section>;
}
const ADMIN_SECTIONS=[
 ['dashboard','Dashboard',null],['orders','Orders','/api/orders'],['order-details','Order Details','/api/admin/orders?pageSize=100'],
 ['products','Products','/api/admin/products?pageSize=50'],['categories','Categories','/api/admin/categories'],
 ['inventory','Inventory','/api/admin/products?pageSize=50'],['customers','Customers','/api/admin/customers'],
 ['payments','Payments','/api/admin/payments'],['delivery','Delivery','/api/delivery/management/assignments'],['coupons','Coupons','/api/admin/coupons'],
 ['notifications','Notifications','/api/admin/notifications'],['invoices','Invoices','/api/admin/invoices'],
 ['reports','Reports','/api/admin/reports'],['audit-log','Audit log','/api/admin/audit-log'],
 ['whatsapp','WhatsApp','/api/admin/whatsapp'],['settings','Settings','/api/admin/settings']
];
export function AdminDashboardPage({user,onLogout}){
 const [key,setKey]=useState(()=>sessionStorage.getItem('omadminkey')||''),[entry,setEntry]=useState(()=>sessionStorage.getItem('omadminkey')||''),
 [orders,setOrders]=useState([]),[dashboard,setDashboard]=useState(null),[products,setProducts]=useState([]),[sectionData,setSectionData]=useState(null),[error,setError]=useState(''),[loading,setLoading]=useState(false),[message,setMessage]=useState(''),[tab,setTab]=useState('dashboard'),[pendingStatus,setPendingStatus]=useState(null),[wa,setWa]=useState(null),[waBusy,setWaBusy]=useState(false),[waMessage,setWaMessage]=useState(''),[analytics,setAnalytics]=useState(null);
 const nextStatusesFor=o=>Array.isArray(o.nextStatuses)?o.nextStatuses:(FALLBACK_NEXT_STATUSES[o.status]??[]);
 const session=readSession(),hasAdminSession=user?.role==='Admin'&&!!session?.accessToken,headers={...(hasAdminSession?{Authorization:`Bearer ${session.accessToken}`}:{'X-Admin-Key':key}),'Content-Type':'application/json'};
 const load=async()=>{if(!key&&!hasAdminSession)return;setLoading(true);setError('');try{
   const [o,d,p,a]=await Promise.all([
     apiFetch(api+'/api/orders',{headers}),
     apiFetch(api+'/api/admin/dashboard',{headers}),
     apiFetch(api+'/api/admin/products?pageSize=50',{headers}),
     apiFetch(api+'/api/admin/analytics',{headers})]);
   if(o.status===401)throw new Error('Admin sign-in is required.');
   if(!o.ok)throw new Error('Could not load orders.');
   setOrders(await o.json());
   setDashboard(d.ok?await d.json():null);
   setProducts(p.ok?(await p.json()).items||[]:[]);
   setAnalytics(a.ok?await a.json():null);
   const endpoint=ADMIN_SECTIONS.find(([id])=>id===tab)?.[2];
   if(endpoint&&tab!=='dashboard'&&tab!=='orders'&&tab!=='products'&&tab!=='whatsapp'){
     const response=await apiFetch(api+endpoint,{headers});
     const payload=await response.json().catch(()=>({detail:'No response data.'}));
     setSectionData(response.ok?payload:{error:payload.detail||payload.title||`Could not load ${tab}.`});
   }else setSectionData(null);
 }catch(e){setError(e.message)}finally{setLoading(false)}};
 useEffect(()=>{load()},[key,user?.id,tab]);
 const saveKey=e=>{e.preventDefault();sessionStorage.setItem('omadminkey',entry);setKey(entry)};
  const setStatus=async(id,status)=>{setMessage('');setError('');setPendingStatus(id);try{const r=await apiFetch(`${api}/api/orders/${id}/status`,{method:'PATCH',headers,body:JSON.stringify({status})});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||`This order cannot move to ${status}.`);setMessage(`Order moved to ${status}.`);await load()}catch(e){setError(e.message||'Status update failed.')}finally{setPendingStatus(null)}};
 const assign=async(id,form)=>{const values=new FormData(form.currentTarget);try{const r=await apiFetch(`${api}/api/orders/${id}/delivery`,{method:'POST',headers,body:JSON.stringify({partnerName:values.get('partner'),trackingCode:values.get('tracking')})});const d=await r.json();if(!r.ok)throw new Error(d.detail||'Delivery assignment failed.');setMessage('Delivery assignment saved.');await load()}catch(e){setError(e.message)}};
 const markPaid=async id=>{try{const r=await apiFetch(`${api}/api/orders/${id}/payment`,{method:'PATCH',headers,body:JSON.stringify({status:'Paid'})});const d=await r.json();if(!r.ok)throw new Error(d.detail||'Could not confirm COD receipt.');setMessage('Cash receipt recorded.');await load()}catch(e){setError(e.message)}};
 const adjustStock=async(id,delta)=>{try{const r=await apiFetch(`${api}/api/admin/products/${id}/stock`,{method:'POST',headers,body:JSON.stringify({delta})});const d=await r.json();if(!r.ok)throw new Error(d.detail||'Could not update stock.');setMessage('Stock updated.');await load()}catch(e){setError(e.message)}};
 const toggleProduct=async p=>{try{const r=await apiFetch(`${api}/api/admin/products/${p.id}`,{method:'PUT',headers,body:JSON.stringify({name:p.name,sku:p.sku,brand:p.brand,unit:p.unit,category:p.category,description:p.description,shortDescription:p.description,price:p.price,mrp:p.mrp,stock:p.stock,lowStockThreshold:p.lowStockThreshold,imageUrl:p.imageUrl,isActive:!p.isActive})});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Could not update product.');setMessage('Product updated.');await load()}catch(e){setError(e.message)}};
 // ---- WhatsApp Business Cloud API panel -------------------------------------------------
 // This screen only ever shows whether the integration is configured. The access token lives in
 // server configuration and is never sent to the browser, so there is nothing here to leak.
 const loadWa=async()=>{setWaBusy(true);setWaMessage('');try{const r=await apiFetch(api+'/api/admin/whatsapp?take=50',{headers});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Could not load WhatsApp settings.');setWa(d)}catch(e){setWaMessage(e.message||'Could not load WhatsApp settings.')}finally{setWaBusy(false)}};
 useEffect(()=>{if(tab==='whatsapp')loadWa()},[tab]);
 const saveWa=async patch=>{setWaBusy(true);setWaMessage('');try{const r=await apiFetch(api+'/api/admin/whatsapp/settings',{method:'PUT',headers,body:JSON.stringify(patch)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Could not save WhatsApp settings.');setWa(d);setWaMessage('WhatsApp settings saved.')}catch(e){setWaMessage(e.message||'Could not save WhatsApp settings.')}finally{setWaBusy(false)}};
 const sendTest=async()=>{setWaBusy(true);setWaMessage('');try{const r=await apiFetch(api+'/api/admin/whatsapp/test',{method:'POST',headers});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'The test message could not be sent.');setWaMessage(d.message||(d.success?'Test message accepted by the provider.':'The provider did not accept the test message.')+(d.error?` (${d.error})`:''));await loadWa()}catch(e){setWaMessage(e.message||'The test message could not be sent.')}finally{setWaBusy(false)}};
 const retryWa=async id=>{setWaBusy(true);setWaMessage('');try{const r=await apiFetch(`${api}/api/admin/whatsapp/${id}/retry`,{method:'POST',headers});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||'Retry failed.');setWaMessage(d.success?'Notification re-sent.':'Retry attempted: '+d.status);await loadWa()}catch(e){setWaMessage(e.message||'Retry failed.')}finally{setWaBusy(false)}};
 if(!key&&!hasAdminSession)return <div className="account panel"><h1>Admin sign in</h1><p>Sign in with an Admin account to manage orders, catalogue and stock.</p><Link className="btn wide" to="/login">Sign in</Link><form onSubmit={saveKey}><label className="field-label">Legacy admin access key<input type="password" value={entry} onChange={e=>setEntry(e.target.value)}/></label><button className="outline wide">Use legacy key</button></form></div>;
 const money=v=>'&#8377;'+Number(v||0).toLocaleString('en-IN');
 return <><div className="pagehead"><small>ADMIN PANEL</small><h1>OM Stationary control centre</h1><p>Manage orders, catalogue, stock and delivery for the OM Stationary store.</p><button className="outline" onClick={onLogout}>Sign out</button></div>
 {error&&<p className="form-error" role="alert">{error}</p>}{message&&<p role="status">{message}</p>}
 {tab==='dashboard'&&dashboard&&<><div className="adminstats"><div><b>{dashboard.totalOrders}</b><span>Total orders</span></div><div><b>{dashboard.todayOrders}</b><span>Today's orders</span></div><div><b>{dashboard.pendingOrders}</b><span>Needs action</span></div><div><b>{dashboard.deliveredOrders}</b><span>Delivered</span></div><div><b>{money(dashboard.revenue)}</b><span>Revenue</span></div><div><b>{money(dashboard.codAmount)}</b><span>COD outstanding</span></div><div><b>{dashboard.customers}</b><span>Customers</span></div><div><b>{dashboard.lowStockProducts}</b><span>Low stock</span></div></div>
 {dashboard.lowStockProducts>0&&<div className="low-stock-alert" role="alert"><AlertTriangle size={20}/><div><b>Low Stock Alert</b><p>{dashboard.lowStockProducts} products need restocking. Check the Products tab to view details.</p></div><Link className="btn" to="#" onClick={()=>setTab('products')}>View Products</Link></div>}
 {analytics?.daily?.length>0&&<React.Suspense fallback={<div className="catalog-state">Loading sales charts...</div>}><AdminCharts analytics={analytics}/></React.Suspense>}
 {analytics?.topProducts&&analytics.topProducts.length>0&&<div className="admin-chart-section"><div className="rowhead"><small>TOP SELLING</small><h2>Most Popular Products</h2></div><div className="admin-products-grid">{analytics.topProducts.slice(0,5).map((p,i)=><div className="admin-product-card" key={i}><b>{i+1}. {p.productName}</b><span>{p.quantity} sold</span><b>{money(p.revenue)}</b></div>)}</div></div>}</>}
 <div className="listing-tools"><nav className="admin-section-nav" aria-label="Admin sections">{ADMIN_SECTIONS.map(([id,label])=><button type="button" key={id} className={tab===id?'selected':''} aria-current={tab===id?'page':undefined} onClick={()=>setTab(id)}>{label}</button>)}</nav><button className="outline" onClick={load} disabled={loading}>{loading?'Refreshing...':'Refresh'}</button></div>
 {sectionData&&<AdminSectionData title={ADMIN_SECTIONS.find(([id])=>id===tab)?.[1]||tab} data={sectionData}/>}
 {tab==='orders'&&<section className="panel admin-orders"><div className="rowhead"><h2>Orders</h2><span>{orders.length} total</span></div>
  {orders.map(o=><article className="admin-order" key={o.id}><div className="admin-order-head"><div><b>{o.orderNumber}</b><span>{o.customerName} &middot; {o.customerPhone}</span></div><div><b>{money(o.totalAmount)}</b><span>{o.paymentMethod} &middot; {o.paymentStatus}</span></div></div>
  <p>{o.deliveryAddress}{o.city?`, ${o.city} ${o.pincode}`:''}</p>
   <div className="admin-order-controls">
    <div className="admin-status-actions"><span className="admin-current-status">Status: <b>{o.status}</b></span>
     {nextStatusesFor(o).length?nextStatusesFor(o).map(s=><button key={s} className="outline" disabled={pendingStatus===o.id} onClick={()=>setStatus(o.id,s)}>{ACTION_LABELS[s]||s}</button>):<span className="admin-terminal">No further action available.</span>}
     {pendingStatus===o.id&&<small role="status">Saving...</small>}
    </div>
    <form className="assign-form" onSubmit={e=>{e.preventDefault();assign(o.id,e)}}><label className="field-label">Delivery partner<input name="partner" required placeholder="Partner name"/></label><label className="field-label">Tracking code<input name="tracking" placeholder="Optional"/></label><button className="outline">Assign delivery</button></form>
    {o.paymentStatus!=='Paid'&&['Delivered','Picked Up'].includes(o.status)&&<button className="outline" onClick={()=>markPaid(o.id)}>Confirm cash received</button>}
   </div></article>)}{!loading&&!orders.length&&<p>No orders yet.</p>}</section>}
 {tab==='products'&&<section className="panel admin-orders"><div className="rowhead"><h2>Products &amp; stock</h2><span>{products.length} products</span></div>
  <div className="listing-tools"><table className="admin-table"><thead><tr><th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Adjust</th><th>Status</th></tr></thead><tbody>
  {products.map(p=><tr key={p.id}><td><b>{p.name}</b><small>{p.category} &middot; {p.unit}</small></td><td>{p.sku||'-'}</td><td>{money(p.price)}</td><td className={p.stock<=p.lowStockThreshold?'low-stock':''}>{p.stock}</td><td><button className="outline" onClick={()=>adjustStock(p.id,10)}>+10</button><button className="outline" onClick={()=>adjustStock(p.id,-1)}>-1</button></td><td><button className="outline" onClick={()=>toggleProduct(p)}>{p.isActive?'Active':'Inactive'}</button></td></tr>)}
  </tbody></table></div></section>}
 {tab==='whatsapp'&&<section className="panel admin-orders"><div className="rowhead"><h2>WhatsApp notifications</h2><button className="outline" onClick={loadWa} disabled={waBusy}>{waBusy?'Working...':'Refresh'}</button></div>
  {waMessage&&<p role="status">{waMessage}</p>}
  {!wa&&<p>Loading WhatsApp settings...</p>}
  {wa&&<>
   <div className={wa.configuration.configured?'wa-ok':'wa-warn'}>
    <b>{wa.configuration.configured?'WhatsApp Business API is connected':'WhatsApp Business API is not configured'}</b>
    <p>{wa.configuration.note}</p>
    <p>Admin number: <b>{wa.configuration.adminNumber||'-'}</b>{wa.configuration.adminNumberNormalised?` (sends as ${wa.configuration.adminNumberNormalised})`:''} &middot; API version {wa.configuration.apiVersion}</p>
    {!wa.configuration.configured&&wa.configuration.missing.length>0&&<p><small>Set these server settings: {wa.configuration.missing.join(', ')}</small></p>}
    <p><small>The access token is stored in server configuration only. It is never returned by this API and cannot be set from the browser.</small></p>
   </div>
   <div className="wa-controls">
    <label className="wa-toggle"><input type="checkbox" checked={wa.configuration.enabled} disabled={waBusy} onChange={e=>saveWa({enabled:e.target.checked})}/> Enable WhatsApp notifications</label>
    <div className="wa-toggles">{[['newOrder','New orders'],['orderStatus','Order status changes'],['paymentUpdate','Payments received'],['lowStock','Low stock alerts'],['newCustomer','New customers']].map(([k,label])=><label className="wa-toggle" key={k}><input type="checkbox" checked={wa.eventTypes[k]} disabled={waBusy} onChange={e=>saveWa({[k]:e.target.checked})}/> {label}</label>)}</div>
    <button className="btn" onClick={sendTest} disabled={waBusy||!wa.configuration.configured}>Send test message</button>
   </div>
   <div className="rowhead"><h3>Notification log</h3><span>{wa.total} total &middot; {wa.log.filter(x=>x.status==='Sent').length} sent &middot; {wa.log.filter(x=>x.status==='Failed').length} failed &middot; {wa.log.filter(x=>x.status==='NotConfigured').length} not configured</span></div>
   {wa.log.length?wa.log.map(n=><article className="wa-log" key={n.id}>
     <div><b>{n.notificationType}{n.orderNumber?` · ${n.orderNumber}`:''}</b><span>{n.createdAt?new Date(n.createdAt).toLocaleString('en-IN'):''} &rarr; {n.recipient}</span></div>
     <span className={n.status==='Sent'?'wa-ok':n.status==='Failed'?'wa-warn':''}>{n.status}</span>
     <p>{n.message}</p>
     {n.errorMessage&&<p className="form-error">{n.errorMessage}</p>}
     {n.providerMessageId&&<small>Provider message id: {n.providerMessageId}</small>}
     {n.status==='Failed'&&<button className="outline" onClick={()=>retryWa(n.id)} disabled={waBusy}>Retry send</button>}
   </article>):<p>No notifications have been attempted yet.</p>}
  </>}
 </section>}
 </>;
}
