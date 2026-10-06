import { Link } from 'react-router-dom';
import { Clock, Plus, Phone, Mail, Navigation } from 'lucide-react';
import { OM_CONTACT } from './content.js';
export function ContactPage(){
  const location=usePickupLocation();
  return <><div className="pagehead"><small>CONTACT</small><h1>Contact OM Stationary</h1><p>Visit the store, or reach us before you order.</p></div>
  <div className="contact-layout"><section className="panel"><h2>Store address</h2><p><b>{OM_CONTACT.name}</b><br/>{OM_CONTACT.address}<br/>{OM_CONTACT.landmark}</p><p><b>Plus code:</b> {OM_CONTACT.plusCode}</p><a className="btn" href={OM_CONTACT.maps} target="_blank" rel="noreferrer"><Navigation size={16}/> Get directions</a>
  {location?.hours&&<p className="pickup-meta"><Clock size={15}/>{location.hours}</p>}{location?.phone&&<p className="pickup-meta"><Phone size={15}/><a href={'tel:'+location.phone}>{location.phone}</a></p>}{location?.email&&<p className="pickup-meta"><Mail size={15}/><a href={'mailto:'+location.email}>{location.email}</a></p>}</section>
  <section className="panel"><h2>Need help with an order?</h2><p>Open the order from your account and use the track link to see its current status. For anything else, visit the store during business hours.</p><Link className="btn" to="/help">Help &amp; support</Link><Link className="outline" to="/orders">My orders</Link></section></div></>;
}
