// Product listing / search page.
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { ProductCard } from '../../components/products/ProductCard.jsx';
import { ProductFilters } from '../../components/products/ProductFilters.jsx';
import { Pagination } from '../../components/common/Pagination.jsx';
import { useProductSearch, useSearchCategories } from '../../hooks/useProducts.js';
import { PAGE_SIZE } from '../../utils/constants.js';

export function ProductListingPage({ add, addN, catalog, wishlist, toggleWishlist }) {
  const route = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(route.search);
  const q = (params.get('q') || '').trim();
  const cat = params.get('cat') || '';

  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);
  const [debounced, setDebounced] = useState(q);
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [available, setAvailable] = useState(false);

  // Debounce the query so typing doesn't fire a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => { setDebounced(q); setPage(1); }, 300);
    return () => clearTimeout(timer);
  }, [q]);

  const filters = useMemo(() => ({
    q: debounced,
    category: cat,
    brand,
    minPrice,
    maxPrice,
    available,
    sort,
    page,
    pageSize: PAGE_SIZE
  }), [debounced, cat, brand, minPrice, maxPrice, available, sort, page]);

  const { items, total, loading, error } = useProductSearch(filters);
  const categories = useSearchCategories(catalog.products);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <div className="pagehead listing-pagehead">
        <small>PRODUCTS</small>
        <h1>{debounced ? `Results for "${debounced}"` : cat || 'Shop all products'}</h1>
        <p>Browse stationery and office essentials from the current OM Stationary catalogue.</p>
      </div>

      <ProductFilters
        categories={categories}
        category={cat}
        onCategory={(value) => {
          setPage(1);
          const next = new URLSearchParams(route.search);
          if (value) next.set('cat', value); else next.delete('cat');
          navigate({ pathname: '/search', search: next.toString() ? `?${next}` : '' });
        }}
        brand={brand}
        onBrand={(value) => { setPage(1); setBrand(value); }}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPrice={({ minPrice: nextMin, maxPrice: nextMax }) => {
          setPage(1);
          setMinPrice(nextMin);
          setMaxPrice(nextMax);
        }}
        available={available}
        onAvailable={(value) => { setPage(1); setAvailable(value); }}
        sort={sort}
        onSort={(value) => { setPage(1); setSort(value); }}
        resultCount={total}
        loading={loading}
      />

      {error
        ? <div className="catalog-state error" role="alert"><strong>Products could not be loaded.</strong><p>{error}</p><button className="outline" type="button" onClick={() => window.location.reload()}>Try again</button></div>
        : loading
          ? <div className="catalog-state" role="status" aria-live="polite">Loading products…</div>
          : items.length
            ? (
              <>
                <div className="listing-product-grid grid" aria-label="Products">
                  {items.map((product) => (
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
                <Pagination page={page} pages={pages} onPage={setPage} />
              </>
            )
            : (
              <div className="empty">
                <SearchIcon size={40} />
                <h2>No matching products</h2>
                <p>Try another product name or browse a category.</p>
                <Link className="btn" to="/search">Clear search</Link>
              </div>
            )}
    </>
  );
}
