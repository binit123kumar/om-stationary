// Customer header: logo, search, fulfilment hint and account links.
import { Link } from 'react-router-dom';
import {
  Bell, Heart, MapPin, Search, ShieldAlert, ShoppingCart, User
} from 'lucide-react';
import { useCategories } from '../../hooks/useCategories.js';
import { useCatalog } from '../../hooks/useCatalog.js';

export function Header({
  user,
  cartCount,
  wishlistCount,
  unreadCount,
  catalog
}) {
  const navCategories = useCategories();
  // Fallback categories from the catalogue when the API is unreachable.
  const categories = [...new Set([
    ...navCategories,
    ...(catalog?.products || []).map((p) => p.cat)
  ])];

  return (
    <header>
      <div className="top">
        <Link className="logo" to="/">
          <span>OM</span> STATIONARY
          <small>Your Learning &amp; Office Partner</small>
        </Link>
        <form className="search" action="/search">
          <Search size={20} />
          <input
            name="q"
            list="product-suggestions"
            placeholder="What are you looking for today?"
          />
          <datalist id="product-suggestions">
            {(catalog?.products || []).map((p) => (
              <option key={p.id} value={p.name} />
            ))}
            <option value="A4 Paper" />
            <option value="Notebook" />
            <option value="Office supplies" />
          </datalist>
          <button aria-label="Search">
            <Search size={18} />
          </button>
        </form>
        <div className="deliver">
          <MapPin size={20} />
          <div>
            <small>Fulfillment</small>
            <b>Check availability</b>
          </div>
        </div>
        <Link to="/orders" className="headlink">Orders</Link>
        <Link to="/wishlist" className="headlink" aria-label="Wishlist">
          <Heart /><span className="badge">{wishlistCount}</span>
        </Link>
        <Link to="/notifications" className="headlink" aria-label="Notifications">
          <Bell /><span className="badge">{unreadCount}</span>
        </Link>
        <Link to="/cart" className="headlink">
          <ShoppingCart /> <b>{cartCount}</b>
        </Link>
        <Link to="/account" className="headlink">
          <User />
        </Link>
        {user?.role === 'Admin' && (
          <Link to="/admin" className="admin-top-button">
            <ShieldAlert size={17} /> Admin
          </Link>
        )}
      </div>
      <TopNav categories={categories} />
      <MobileNav categories={categories} />
    </header>
  );
}
