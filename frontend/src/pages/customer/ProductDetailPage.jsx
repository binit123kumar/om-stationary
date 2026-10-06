// Product detail page.
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PackageCheck } from 'lucide-react';
import { getProduct } from '../../services/productService.js';
import { ProductGallery } from '../../components/products/ProductGallery.jsx';
import { ProductInfo } from '../../components/products/ProductInfo.jsx';
import { ProductTabs } from '../../components/products/ProductTabs.jsx';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs.jsx';
import { rememberRecentProduct } from './HomePage.jsx';

export function ProductDetailPage({ add, addN, catalog, wishlist, toggleWishlist }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const existing = catalog.products.find((x) => x.id === Number(id));
  const [remote, setRemote] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let alive = true;
    setRemote(null);
    setMissing(false);
    if (catalog.loading) return () => { alive = false; };
    if (existing) { setRemote(existing); return () => { alive = false; }; }
    getProduct(id)
      .then((product) => {
        if (alive && product) setRemote(product);
        else if (alive && !product) setMissing(true);
      })
      .catch(() => { if (alive) setMissing(true); });
    return () => { alive = false; };
  }, [id, catalog.loading, existing?.id]);

  const product = existing || remote;

  useEffect(() => {
    if (!product) return;
    rememberRecentProduct(product.id);
  }, [product?.id]);

  if (catalog.loading && !product) return <div className="catalog-state">Loading product...</div>;
  if (!product && !missing) return <div className="catalog-state">Loading product...</div>;
  if (!product) {
    return (
      <div className="empty">
        <PackageCheck />
        <h1>Product not found</h1>
        <Link to="/search" className="btn">Browse products</Link>
      </div>
    );
  }

  const buyNow = (p) => { add(p); navigate('/checkout'); };

  return (
    <>
      <Breadcrumbs items={[
        { to: '/', label: 'Home' },
        { to: '/search', label: 'Shop' },
        { to: '', label: product.name }
      ]} />
      <section className="product product-premium">
        <ProductGallery product={product} />
        <ProductInfo
          product={product}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          onAdd={add}
          onBuyNow={buyNow}
        />
      </section>
      <ProductTabs product={product} />
    </>
  );
}
