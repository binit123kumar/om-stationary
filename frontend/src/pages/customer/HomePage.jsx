// Customer home page.
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, PackageCheck, Search, ShieldCheck } from 'lucide-react';
import { ProductCard } from '../../components/products/ProductCard.jsx';
import { readRecentProducts, writeRecentProducts } from '../../utils/storage.js';
import { useState } from 'react';

export function HomePage({ add, addN, catalog, categories = [], wishlist, toggleWishlist }) {
  const { products, loading, error } = catalog;
  const availableCats = [...new Set([...categories, ...products.map((p) => p.cat)])];

  const [recentIds] = useState(readRecentProducts);
  const recentProducts = recentIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <>
      <section className="hero hero-premium">
        <div>
          <p className="eyebrow">LOCAL SHOPPING, MADE SIMPLE</p>
          <h1>Everything for Study,<br /><strong>Office &amp; More</strong></h1>
          <p>Quality stationery at best price. Local shop, fast delivery &amp; easy pickup.</p>
          <div className="purchase-actions">
            <Link className="btn" to="/search">SHOP NOW</Link>
            <Link className="outline" to="/search">VIEW OFFERS</Link>
          </div>
          <span className="hero-note">
            <ShieldCheck size={16} /> Clear prices &middot; Cash on delivery &middot; Easy pickup
          </span>
        </div>
        <div className="hero-art-panel">
          <div className="hero-monogram">OM<span>.</span></div>
          <div className="hero-art-label">
            <MapPin size={16} /> Your local essentials, one stop away
          </div>
        </div>
      </section>

      <section className="trust">
        <div><Search /> Easy product search</div>
        <div><MapPin /> Official OM pickup</div>
        <div><ShieldCheck /> Cash on delivery</div>
        <div><PackageCheck /> Order tracking</div>
      </section>

      <div className="rowhead">
        <div>
          <small className="section-eyebrow">CATEGORIES</small>
          <h2>Shop by category</h2>
        </div>
      </div>
      <div className="cats">
        {availableCats.map((category) => (
          <Link to={'/search?cat=' + encodeURIComponent(category)} key={category}>
            {category}<ChevronRight size={15} />
          </Link>
        ))}
      </div>

      <div className="rowhead">
        <div>
          <small className="section-eyebrow">FROM OUR CATALOGUE</small>
          <h2>Popular essentials</h2>
        </div>
        <Link to="/search">Browse all <ChevronRight size={17} /></Link>
      </div>
      {loading
        ? <div className="catalog-state">Loading catalogue...</div>
        : error
          ? (
            <div className="catalog-state error" role="alert">
              {error} <button className="outline" onClick={() => location.reload()}>Retry</button>
            </div>
          )
          : products.length
            ? (
              <div className="grid">
                {products.slice(0, 8).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    add={add}
                    addN={addN}
                    saved={wishlist.includes(product.id)}
                    toggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            )
            : <div className="catalog-state">Our catalogue is being updated. Please check back soon.</div>}

      {recentProducts.length > 0 && (
        <>
          <div className="rowhead">
            <div>
              <small className="section-eyebrow">YOUR RECENTLY VIEWED</small>
              <h2>Pick up where you left off</h2>
            </div>
          </div>
          <div className="grid">
            {recentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                add={add}
                addN={addN}
                saved={wishlist.includes(product.id)}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

// Keeps the recently-viewed list up to date; called from
// the product detail page.
export function rememberRecentProduct(productId) {
  const recent = [productId, ...readRecentProducts().filter((x) => x !== productId)].slice(0, 6);
  writeRecentProducts(recent);
}
