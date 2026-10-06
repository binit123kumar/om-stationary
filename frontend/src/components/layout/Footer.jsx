// Site footer without the map panel (used where a full footer
// would be too heavy).
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { usePickupLocation } from '../../hooks/usePickupLocation.js';

export function Footer() {
  const location = usePickupLocation();
  return (
    <footer className="site-footer site-footer-simple">
      <div className="footer-brand">
        <b>OM STATIONARY</b>
        <span>Everything you need, one place.</span>
        <nav className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/search">Shop</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to="/account">Account</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/admin">Admin</Link>
        </nav>
        <b>Help</b>
        <Link to="/help">Help &amp; Support</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About Us</Link>
        <b>Legal</b>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms &amp; Conditions</Link>
        <Link to="/refund-policy">Refund Policy</Link>
        {location?.phone && (
          <>
            <a href={`tel:${location.phone}`}>{location.phone}</a>
            <a
              className="whatsapp-link"
              href={`https://wa.me/${location.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </>
        )}
        {location?.email && <a href={`mailto:${location.email}`}>{location.email}</a>}
        <span>&copy; 2026 OM Stationary</span>
      </div>
    </footer>
  );
}
