import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { apiFetch } from '../../session.js';
export function NotificationsPage(){
  const session=readSession(),[data,setData]=useState({unread:0,items:[]}),[loading,setLoading]=useState(true);
  const load=async()=>{setLoading(true);try{const r=await apiFetch('/api/notifications?take=50');if(r.ok)setData(await r.json())}catch{}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  if(!session?.accessToken)return <div className="empty"><Bell size={40}/><h1>Sign in to see notifications</h1><p>Order updates appear here once you are signed in.</p><Link className="btn" to="/login">Sign in</Link></div>;
  const markAll=async()=>{await apiFetch('/api/notifications/read-all',{method:'POST'});load()};
  return <><div className="pagehead"><small>NOTIFICATIONS</small><h1>Your notifications</h1><p>Order updates from OM Stationary. Refreshes automatically every 15 seconds.</p>{data.unread>0&&<button className="outline" onClick={markAll}>Mark all as read</button>}</div>
  {loading?<div className="catalog-state">Loading notifications...</div>:data.items.length?<div className="notification-list">{data.items.map(n=><article className={n.isRead?'notification':'notification unread'} key={n.id}><div><b>{n.title}</b><p>{n.message}</p><small>{new Date(n.createdAt).toLocaleString()}</small></div><div className="notification-actions">{n.orderNumber&&<Link className="outline" to={'/track/'+encodeURIComponent(n.orderNumber)}>Track</Link>}{n.orderNumber&&<Link className="outline" to={`/invoice/${encodeURIComponent(n.orderNumber)}`}>Invoice</Link>}{!n.isRead&&<button type="button" className="outline" onClick={async()=>{await apiFetch('/api/notifications/'+n.id+'/read',{method:'POST'});load()}}>Mark read</button>}</div></article>)}</div>:<div className="empty"><Bell size={40}/><h2>No notifications yet</h2><p>You will be notified here when your order status changes.</p><Link className="btn" to="/orders">View my orders</Link></div>}</>;
}
