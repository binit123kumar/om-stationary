// Public catalogue API. The list endpoint returns full product rows including
// the real `stock` and `lowStockThreshold` fields from the Product entity.
import { apiFetch } from './api.js';
import { PAGE_SIZE } from '../utils/constants.js';

// Normalises a raw API product row into the shape the storefront uses.
export function mapProduct(p) {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    mrp: p.mrp,
    cat: p.category,
    img: p.imageUrl,
    desc: p.description,
    shortDesc: p.shortDescription,
    brand: p.brand,
    sku: p.sku,
    unit: p.unit,
    slug: p.slug,
    stock: p.stock,
    lowStockThreshold: p.lowStockThreshold,
    images: p.images,
    isActive: p.isActive,
    createdAt: p.createdAt || p.CreatedAt,
    updatedAt: p.updatedAt || p.UpdatedAt
  };
}

export async function listProducts() {
  const response = await apiFetch('/api/products');
  if (!response.ok) throw new Error('Could not load products. Check the API connection and try again.');
  const rows = await response.json();
  return (Array.isArray(rows) ? rows : []).map(mapProduct);
}

export async function searchProducts({ q, category, brand, minPrice, maxPrice, available, sort, page, pageSize = PAGE_SIZE }) {
  const params = new URLSearchParams({ paginated: 'true', page: String(page), pageSize: String(pageSize), sort });
  if (q) params.set('q', q);
  if (category) params.set('category', category);
  if (brand) params.set('brand', brand);
  if (minPrice) params.set('minPrice', minPrice);
  if (maxPrice) params.set('maxPrice', maxPrice);
  if (available) params.set('available', 'true');
  const response = await apiFetch('/api/products?' + params.toString());
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || 'Could not search products.');
  }
  const data = await response.json();
  return { items: (data.items || []).map(mapProduct), total: data.total || 0, page: data.page, pageSize: data.pageSize };
}

export async function getProduct(id) {
  const response = await apiFetch('/api/products/' + encodeURIComponent(id));
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Could not load product.');
  return mapProduct(await response.json());
}

export async function listCategories() {
  const response = await apiFetch('/api/categories');
  if (!response.ok) return [];
  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}
