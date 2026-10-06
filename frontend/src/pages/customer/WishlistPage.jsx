// Wishlist page.
//
// The wishlist is server-owned for signed-in customers, so the page
// renders straight from /api/wishlist instead of filtering the
// catalogue loader (which is capped at one page and would silently
// hide any saved item outside it). Guests see the device-local list.
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { getWishlist } from '../../services/wishlistService.js';
import { ProductCard } from '../../components/products/ProductCard.jsx';

export function WishlistPage({
  catalog,
  wishlist,
  add,
  addN,
  toggleWishlist,
  user,
  error = '',
  loading = false,
  reload
}) {
  // Signed-in view: real server rows with their stock values.
  const [rows, setRows] = useState([]);
  const [rowLoading, setRowLoading] = useState(false);
  const [rowError, setRowError] = useState('');

  const loadRows = useCallback(async () => {
    if (user?.role !== 'Customer') { setRows([]); return; }
    setRowLoading(true);
    setRowError('');
    try {
      const { signed, rows: serverRows } = await getWishlist();
      if (!signed) { setRows([]); return; }
      setRows(
        (Array.isArray(serverRows) ? serverRows : []).map((x) => ({
          id: x.productId,
          name: x.name,
          price: x.price,
          mrp: x.mrp,
          cat: x.category,
          img: x.imageUrl,
          brand: x.brand,
          sku: x.sku,
          stock: x.stock,
          lowStockThreshold: x.lowStockThreshold
        }))
      );
    } catch (e) {
      setRowError(e.message || 'Wishlist could not be loaded.');
    } finally {
      setRowLoading(false);
    }
  }, [user?.role]);

  useEffect(() => { loadRows(); }, [loadRows, wishlist.length]);

  const showError = error || rowError;
  const busy = loading || rowLoading;

  if (user?.role === 'Customer') {
    return (
      <>
        <div className="pagehead">
          <small>SAVED PRODUCTS</small>
          <h1>Your wishlist</h1>
          <p>Saved to your OM Stationary account - it stays on every device you sign in from.</p>
        </div>
        {showError
          ? (
            <div className="catalog-state error" role="alert">
              {showError}{' '}
              <button className="outline" onClick={() => { reload?.(); loadRows(); }}>Retry</button>
            </div>
          )
          : busy
            ? <div className="catalog-state">Loading saved products...</div>
            : rows.length
              ? (
                <div className="grid">
                  {rows.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      add={add}
                      addN={addN}
                      saved
                      toggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>
              )
              : (
                <div className="empty">
                  <Heart size={40} />
                  <h2>Your wishlist is empty</h2>
                  <p>Tap the heart on any product to save it here.</p>
                  <Link className="btn" to="/search">Browse products</Link>
                </div>
              )}
      </>
    );
  }

  // Guest view: the device-local cache.
  const { products, loading: catalogLoading, error: catalogError } = catalog;
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <div className="pagehead">
        <small>SAVED PRODUCTS</small>
        <h1>Your wishlist</h1>
        <p>You&rsquo;re browsing as a guest. Sign in to save this wishlist to your account.</p>
      </div>
      {showError
        ? <div className="catalog-state error" role="alert">{showError}</div>
        : busy || catalogLoading
          ? <div className="catalog-state">Loading saved products...</div>
          : items.length
            ? (
              <div className="grid">
                {items.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    add={add}
                    addN={addN}
                    saved
                    toggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            )
            : (
              <div className="empty">
                <Heart size={40} />
                <h2>Your wishlist is empty</h2>
                <p>Sign in and tap the heart on any product to save it here.</p>
                <Link className="btn" to="/search">Browse products</Link>
              </div>
            )}
      {catalogError && <div className="catalog-state error" role="alert">{catalogError}</div>}
    </>
  );
}
