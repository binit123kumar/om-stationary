// Full catalogue loader (home page, recently viewed, lookups).
import { useEffect, useState } from 'react';
import { listProducts } from '../services/productService.js';

export function useCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    listProducts()
      .then((rows) => { if (active) setProducts(rows); })
      .catch(() => {
        if (active) setError('Could not load products. Check the API connection and try again.');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return { products, loading, error };
}
