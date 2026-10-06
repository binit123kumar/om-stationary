// Admin catalogue management: products table with
// stock adjustment and activate/deactivate actions.
// Stock values come from the Product table only.
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { AdminKpiCard } from '../../components/admin/AdminKpiCard.jsx';
import { AdminDataTable } from '../../components/admin/AdminDataTable.jsx';
import {
  adminHeaders,
  adjustStock,
  deactivateProduct,
  listAdminProducts,
  updateProduct
} from '../../services/adminService.js';
import { readSession } from '../../services/session.js';
import { rupeesShort } from '../../utils/formatCurrency.js';
import { stockStateLabel } from '../../utils/formatOrderStatus.js';
import { ADMIN_PAGE_SIZE } from '../../utils/constants.js';

export function AdminProductsPage({ user, key, onLogout }) {
  const headers = adminHeaders(readSession(), key);
  const [data, setData] = useState({ items: [], total: 0, summary: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(null);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page: String(page),
        pageSize: String(ADMIN_PAGE_SIZE),
        q,
        category,
        lowStockOnly: lowStockOnly ? 'true' : 'false'
      };
      const result = await listAdminProducts(headers, params);
      setData(result);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, q, category, lowStockOnly, key, user?.id]);

  useEffect(() => { load(); }, [load]);

  const runAdjust = async (product, delta) => {
    setPending(product.id);
    setMessage('');
    try {
      const response = await adjustStock(product.id, delta, '', headers);
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail || 'Could not update stock.');
      setMessage(`Stock updated for ${product.name}.`);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(null);
    }
  };

  const runToggle = async (product) => {
    setPending(product.id);
    setMessage('');
    try {
      const response = await updateProduct(product.id, {
        name: product.name, sku: product.sku, brand: product.brand,
        unit: product.unit, category: product.category,
        description: product.description, shortDescription: product.description,
        price: product.price, mrp: product.mrp, stock: product.stock,
        lowStockThreshold: product.lowStockThreshold,
        imageUrl: product.imageUrl, isActive: !product.isActive
      }, headers);
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.detail || 'Could not update product.');
      setMessage('Product updated.');
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(null);
    }
  };

  const runDeactivate = async (product) => {
    setPending(product.id);
    try {
      await deactivateProduct(product.id, headers);
      setMessage(`${product.name} deactivated.`);
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setPending(null);
    }
  };

  return (
    <AdminLayout user={user} onLogout={onLogout}>
      <div className="pagehead">
        <small>ADMIN PANEL</small>
        <h1>Products</h1>
        <p>{data.total} products</p>
        <Link className="btn" to="/admin/products/new">Add product</Link>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      {data.summary && (
        <div className="adminstats">
          <AdminKpiCard label="In stock" value={data.summary.inStock} tone="ok" />
          <AdminKpiCard label="Low stock" value={data.summary.lowStock} tone="warn" />
          <AdminKpiCard label="Out of stock" value={data.summary.outOfStock} tone="bad" />
          <AdminKpiCard label="Total units" value={data.summary.totalStock} />
          <AdminKpiCard label="Stock value" value={data.summary.stockValue} money tone="ok" />
        </div>
      )}

      <div className="admin-filter-row">
        <label className="field-label">
          Search
          <input value={q} placeholder="Name, SKU or brand" onChange={(event) => { setQ(event.target.value); setPage(1); }} />
        </label>
        <label className="field-label">
          Category
          <input value={category} placeholder="Category" onChange={(event) => { setCategory(event.target.value); setPage(1); }} />
        </label>
        <label className="check-field">
          <input
            type="checkbox"
            checked={lowStockOnly}
            onChange={(event) => { setLowStockOnly(event.target.checked); setPage(1); }}
          />
          {' '}Low stock only
        </label>
      </div>

      <AdminDataTable
        loading={loading}
        columns={[
          { key: 'product', label: 'Product' },
          { key: 'sku', label: 'SKU' },
          { key: 'price', label: 'Price' },
          { key: 'stock', label: 'Stock' },
          { key: 'state', label: 'State' },
          { key: 'adjust', label: 'Adjust' },
          { key: 'status', label: 'Status' }
        ]}
        rows={data.items}
        total={data.total}
        page={page}
        pageSize={ADMIN_PAGE_SIZE}
        onPage={setPage}
        renderRow={(product) => (
          <tr key={product.id}>
            <td>
              <Link to={`/admin/products/${product.id}/edit`}>{product.name}</Link>
              <small>{product.category} · {product.unit}</small>
            </td>
            <td>{product.sku || '—'}</td>
            <td>{rupeesShort(product.price)}</td>
            <td className={product.stockState === 'Out of stock' || product.stockState === 'Low stock' ? 'low-stock' : ''}>
              {product.stock}
            </td>
            <td>{stockStateLabel(product) || product.stockState}</td>
            <td>
              <button
                className="outline"
                onClick={() => runAdjust(product, 10)}
                disabled={pending === product.id}
              >
                +10
              </button>
              <button
                className="outline"
                onClick={() => runAdjust(product, -1)}
                disabled={pending === product.id}
              >
                −1
              </button>
            </td>
            <td>
              <button
                className="outline"
                onClick={() => runToggle(product)}
                disabled={pending === product.id}
              >
                {product.isActive ? 'Active' : 'Inactive'}
              </button>
              <button
                className="outline"
                onClick={() => runDeactivate(product)}
                disabled={pending === product.id}
                title="Deactivate product"
              >
                Remove
              </button>
            </td>
          </tr>
        )}
      />
    </AdminLayout>
  );
}
