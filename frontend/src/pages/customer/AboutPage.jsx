
import { Navigation } from 'lucide-react';
import { OM_CONTACT } from './content.js';
export function AboutPage(){
  return <><div className="pagehead"><small>ABOUT US</small><h1>OM Stationary</h1><p>Your neighbourhood stationery and office supplies store in Patna, online and in person.</p></div>
  <section className="content-prose"><h2>Who we are</h2><p>OM Stationary sells stationery, printing supplies, office supplies and school supplies directly through this website. When you order here, you are ordering from us - we stock the products, pack them and deliver them ourselves.</p>
  <h2>Visit the store</h2><p>We are at <b>{OM_CONTACT.address}</b>, {OM_CONTACT.landmark}. Our plus code is <b>{OM_CONTACT.plusCode}</b>.</p>
  <p><a className="btn" href={OM_CONTACT.maps} target="_blank" rel="noreferrer"><Navigation size={16}/> Get directions</a></p>
  <h2>How ordering works</h2><ul><li>Browse the catalogue and add products to your cart.</li><li>Choose delivery to your address, or pickup from the store.</li><li>Pay cash on delivery, or online if online payment is enabled.</li><li>Track your order from placement through to delivery.</li></ul>
  <h2>Fair pricing</h2><p>The price you see is the price you pay. Taxes and delivery charges, if any, are shown before you place the order.</p></section></>;
}
