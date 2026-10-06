// Category list loader (header nav, category filters).
import { useEffect, useState } from 'react';
import { listCategories } from '../services/productService.js';

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let active = true;
    listCategories()
      .then((rows) => { if (active && Array.isArray(rows)) setCategories(rows); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  return categories;
}
