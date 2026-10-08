// Compact navigation for small screens.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, User, X } from 'lucide-react';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Shop' },
  { to: '/orders', label: 'Orders' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/account', label: 'Account' }
];

export function MobileNav({ categories = [], cartCount = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="mobile-nav" aria-label="Mobile">
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={open}
        aria-label="Menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className="mobile-nav-links">
        <Link to="/cart" className="mobile-nav-cart" aria-label="Cart">
          <ShoppingCart size={18} /><span className="badge">{cartCount}</span>
        </Link>
        <Link to="/account" className="mobile-nav-account" aria-label="Account">
          <User size={18} />
        </Link>
      </div>
      {open && (
        <div className="mobile-nav-panel">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          {categories.length > 0 && (
            <div className="mobile-nav-categories">
              <small>Categories</small>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={'/search?cat=' + encodeURIComponent(category)}
                  onClick={() => setOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
