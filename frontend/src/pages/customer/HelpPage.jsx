import { Link } from 'react-router-dom';

export function HelpPage(){
  const [open,setOpen]=useState(0);
  const faqs=[['How do I track my order?','Open My Orders and select Track. Every status change is recorded by the store, so the timeline always reflects the real state of your order.'],['Can I pay when the order arrives?','Yes. Cash on delivery is available in serviceable PIN codes. Online payment appears at checkout only when it is enabled for the store.'],['How do I collect from the store?','Choose Pickup at checkout and select a date and time. You will get a notification when your order is packed and ready.'],['What if an item is out of stock?','Stock is checked again on the server when you place the order. If something is unavailable you will be told before the order is created.'],['How do I change or cancel an order?','Contact the store as early as possible. Orders can only be cancelled while they have not been handed over for delivery.'],['I need password help.','Password reset is not available online yet. Contact the store using the details on the Contact page so the team can help you securely.']];
  return <><div className="pagehead"><small>HELP &amp; SUPPORT</small><h1>Frequently asked questions</h1><p>Answers to the questions we are asked most often.</p></div>
  <div className="faq-list">{faqs.map(([q,a],i)=><details className="faq" key={q} open={open===i} onToggle={e=>setOpen(e.target.open?i:-1)}><summary>{q}</summary><p>{a}</p></details>)}</div>
  <section className="panel help-cta"><h2>Still need help?</h2><p>Visit the store or get in touch during business hours.</p><Link className="btn" to="/contact">Contact us</Link></section></>;
}
