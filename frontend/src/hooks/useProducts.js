// Paginated, filtered product search. Every parameter maps to a
// real query parameter on GET /api/products.
import { useEffect, useState } from 'react';
import { searchProducts } from '../services/productService.js';
import { listCategories } from '../services/productService.js';

export function useProductSearch(filters) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    searchProducts(filters)
      .then((data) => {
        if (!active) return;
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((e) => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.q, filters.category, filters.brand, filters.minPrice,
    filters.maxPrice, filters.available, filters.sort, filters.page, filters.pageSize
  ]);

  return { items, total, loading, error };
}

export function useSearchCategories(fallbackProducts) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let active = true;
    listCategories()
      .then((rows) => {
        if (!active) return;
        setCategories(Array.isArray(rows) && rows.length
          ? rows
          : [...new Set((fallbackProducts || []).map((p) => p.cat))]);
      })
      .catch(() => {
        if (active) setCategories([...new Set((fallbackProducts || []).map((p) => p.cat))]);
      });
    return () => { active = false; };
  }, [fallbackProducts]);

  return categories;
}
