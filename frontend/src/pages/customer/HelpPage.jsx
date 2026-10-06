// Help / FAQ page.
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FAQS = [
  ['How do I track my order?',
    'Open My Orders and select Track. Every status change is recorded by the store, so the timeline always reflects the real state of your order.'],
  ['Can I pay when the order arrives?',
    'Yes. Cash on delivery is available in serviceable PIN codes. Online payment appears at checkout only when it is enabled for the store.'],
  ['How do I collect from the store?',
    'Choose Pickup at checkout and select a date and time. You will get a notification when your order is packed and ready.'],
  ['What if an item is out of stock?',
    'Stock is checked again on the server when you place the order. If something is unavailable you will be told before the order is created.'],
  ['How do I change or cancel an order?',
    'Contact the store as early as possible. Orders can only be cancelled while they have not been handed over for delivery.'],
  ['I forgot my password.',
    'Self-service password reset is not enabled for this store yet. Visit the store or call during business hours and the team will verify your account.']
];

export function HelpPage() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <div className="pagehead">
        <small>HELP &amp; SUPPORT</small>
        <h1>Frequently asked questions</h1>
        <p>Answers to the questions we are asked most often.</p>
      </div>
      <div className="faq-list">
        {FAQS.map(([question, answer], index) => (
          <details
            className="faq"
            key={question}
            open={open === index}
            onToggle={(event) => setOpen(event.target.open ? index : -1)}
          >
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <section className="panel help-cta">
        <h2>Still need help?</h2>
        <p>Visit the store or get in touch during business hours.</p>
        <Link className="btn" to="/contact">Contact us</Link>
      </section>
    </>
  );
}
