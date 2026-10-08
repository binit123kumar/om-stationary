import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, BookOpen, PackageCheck, Search, ShieldCheck, Store, Truck } from 'lucide-react';
import { ProductCard } from '../../components/products/ProductCard.jsx';
import { readRecentProducts, writeRecentProducts } from '../../utils/storage.js';

export function HomePage({ add, addN, catalog, categories = [], wishlist = [], toggleWishlist }) {
  const { products = [], loading, error } = catalog;
  const availableCategories = [...new Set([...categories, ...products.map((product) => product.cat).filter(Boolean)])];
  const [recentIds] = useState(readRecentProducts);
  const recentProducts = recentIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const offers = products.filter((product) => Number(product.mrp) > Number(product.price)).slice(0, 4);
  const recentAdditions = products.filter((product) => product.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  const cardProps = (product) => ({
    key: product.id, product, add, addN,
    saved: wishlist.includes(product.id), toggleWishlist
  });

  return (
    <div className="store-home">
      <section className="hero hero-premium">
        <div className="hero-copy">
          <p className="eyebrow">YOUR LOCAL STATIONERY STORE</p>
          <h1>Make room for<br /><strong>brighter ideas.</strong></h1>
          <p>Everyday stationery, school essentials and office supplies, ready for delivery or convenient store pickup.</p>
          <div className="purchase-actions">
            <Link className="btn" to="/search">Shop the catalogue <ArrowRight size={17} /></Link>
            <Link className="outline" to="/search">Explore products</Link>
          </div>
          <span className="hero-note"><ShieldCheck size={16} /> Secure checkout · Local service · Pickup available</span>
        </div>
        <div className="hero-art-panel" aria-hidden="true">
          <div className="hero-art-orbit hero-orbit-one" /><div className="hero-art-orbit hero-orbit-two" />
          <div className="hero-stationery-stack"><span className="hero-pencil">✎</span><span className="hero-notebook"><i /><i /><i /><i /></span><span className="hero-ruler">OM</span></div>
          <div className="hero-art-label"><Store size={16} /> OM Stationary · Your learning partner</div>
        </div>
      </section>

      <section className="trust" aria-label="Store services">
        <div><PackageCheck /><span><b>Easy order tracking</b><small>Follow your order updates</small></span></div>
        <div><Store /><span><b>Official pickup</b><small>Collect from our store</small></span></div>
        <div><Truck /><span><b>Local delivery</b><small>Where service is available</small></span></div>
        <div><BadgeCheck /><span><b>Clear pricing</b><small>Verified at checkout</small></span></div>
      </section>

      <section className="home-section" aria-labelledby="home-categories">
        <div className="rowhead"><div><small className="section-eyebrow">FIND WHAT YOU NEED</small><h2 id="home-categories">Shop by category</h2></div><Link to="/search">All products <ArrowRight size={16} /></Link></div>
        {availableCategories.length ? <div className="cats">{availableCategories.map((category, index) => <Link to={`/search?cat=${encodeURIComponent(category)}`} key={category}><span className="category-icon">{index % 2 ? <BookOpen size={19} /> : <PackageCheck size={19} />}</span><span>{category}</span><ArrowRight size={15} /></Link>)}</div> : <p className="catalog-state">Categories will appear when the catalogue is available.</p>}
      </section>

      <section className="home-section">
        <div className="rowhead"><div><small className="section-eyebrow">SELECTED FROM THE CATALOGUE</small><h2>Featured essentials</h2><p>Useful picks from our current product range.</p></div><Link to="/search">Browse all <ArrowRight size={16} /></Link></div>
        {loading ? <div className="catalog-state" role="status">Loading the catalogue…</div> : error ? <div className="catalog-state error" role="alert">{error}<button className="outline" type="button" onClick={() => window.location.reload()}>Try again</button></div> : products.length ? <div className="grid">{products.slice(0, 8).map((product) => <ProductCard {...cardProps(product)} />)}</div> : <div className="catalog-state">Our catalogue is being updated. Please check back soon.</div>}
      </section>

      <section className="home-best-sellers">
        <div><small className="section-eyebrow">CUSTOMER FAVOURITES</small><h2>Best selling products</h2><p>Sales ranking is not currently provided by the live catalogue. Browse all available products to find the right stationery for you.</p></div>
        <Link className="btn" to="/search">Browse products <ArrowRight size={16} /></Link>
      </section>

      {offers.length > 0 && <section className="home-section home-offers">
        <div className="rowhead"><div><small className="section-eyebrow">CURRENT CATALOGUE PRICES</small><h2>Offers &amp; discounts</h2><p>Products with a current selling price below MRP.</p></div><Link to="/search">See every product <ArrowRight size={16} /></Link></div>
        <div className="grid">{offers.map((product) => <ProductCard {...cardProps(product)} />)}</div>
      </section>}

      {recentAdditions.length > 0 && <section className="home-section">
        <div className="rowhead"><div><small className="section-eyebrow">LATEST FROM THE STORE</small><h2>Recently added</h2><p>Sorted by the product creation date returned by the catalogue.</p></div><Link to="/search">Explore catalogue <ArrowRight size={16} /></Link></div>
        <div className="grid">{recentAdditions.map((product) => <ProductCard {...cardProps(product)} />)}</div>
      </section>}

      {recentProducts.length > 0 && <section className="home-section">
        <div className="rowhead"><div><small className="section-eyebrow">YOUR RECENTLY VIEWED</small><h2>Pick up where you left off</h2></div></div>
        <div className="grid">{recentProducts.map((product) => <ProductCard {...cardProps(product)} />)}</div>
      </section>}
    </div>
  );
}

export function rememberRecentProduct(productId) {
  const recent = [productId, ...readRecentProducts().filter((id) => id !== productId)].slice(0, 6);
  writeRecentProducts(recent);
}
