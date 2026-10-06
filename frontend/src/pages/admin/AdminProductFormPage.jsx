// Add / edit product form.
//
// Reused for both routes: /admin/products/new (create)
// and /admin/products/:id/edit (update). The form
// posts to POST /api/admin/products or
// PUT /api/admin/products/{id} — the real write APIs.
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout.jsx';
import { Input } from '../../components/common/Input.jsx';
import { Checkbox } from '../../components/common/Checkbox.jsx';
import { Button } from '../../components/common/Button.jsx';
import {
  adminHeaders,
  createProduct,
  updateProduct
} from '../../services/adminService.js';
import { getProduct } from '../../services/productService.js';
import { readSession } from '../../services/session.js';

export function AdminProductFormPage({ user, key, onLogout }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const editMode = Boolean(id);
  const headers = adminHeaders(readSession(), key);

  const [form, setForm] = useState({
    name: '', slug: '', sku: '', brand: '', unit: 'Piece', category: '',
    categoryId: null, shortDescription: '', description: '',
    price: 0, mrp: 0, stock: 0, lowStockThreshold: 5,
    imageUrl: '', isActive: true
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!editMode) return;
    let active = true;
    (async () => {
      try {
        // The public product endpoint returns the full product
        // record including stock, which is exactly what the
        // edit form needs.
        const existing = await getProduct(id);
        if (!active) return;
        if (!existing) {
          setError('That product was not found.');
          return;
        }
        setForm({
          name: existing.name, slug: existing.slug, sku: existing.sku,
          brand: existing.brand, unit: existing.unit || 'Piece',
          category: existing.cat || existing.category || '',
          categoryId: existing.categoryId ?? null,
          shortDescription: existing.shortDesc || '',
          description: existing.desc || '',
          price: existing.price, mrp: existing.mrp,
          stock: existing.stock ?? 0,
          lowStockThreshold: existing.lowStockThreshold ?? 5,
          imageUrl: existing.img || '', isActive: existing.isActive !== false
        });
      } catch (e) {
        if (active) setError(e.message);
      }
    })();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, editMode, key, user?.id]);

  const setField = (field) => (value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: '' } : current));
  };

  const validate = () => {
    const found = {};
    if (!String(form.name || '').trim()) found.name = 'Product name is required.';
    if (Number(form.price) < 0 || Number(form.mrp) < 0) found.price = 'Price cannot be negative.';
    if (Number(form.stock) < 0) found.stock = 'Stock cannot be negative.';
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        sku: form.sku.trim(),
        brand: form.brand.trim(),
        unit: form.unit.trim() || 'Piece',
        category: form.category.trim(),
        categoryId: form.categoryId,
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        mrp: Number(form.mrp),
        stock: Number(form.stock),
        lowStockThreshold: Number(form.lowStockThreshold),
        imageUrl: form.imageUrl.trim(),
        isActive: form.isActive
      };
      const response = editMode
        ? await updateProduct(id, payload, headers)
        : await createProduct(payload, headers);
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body.detail || (editMode ? 'Could not update product.' : 'Could not create product.'));
      }
      setMessage(editMode ? 'Product updated.' : 'Product created.');
      if (!editMode) navigate('/admin/products');
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout user={user} onLogout={onLogout}>
      <div className="pagehead">
        <small>ADMIN PANEL</small>
        <h1>{editMode ? 'Edit product' : 'Add product'}</h1>
        <p>{editMode ? `Product #${id}` : 'A new catalogue entry'}</p>
        <Link className="outline" to="/admin/products">All products</Link>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      <form className="panel admin-form" onSubmit={submit}>
        <div className="flow-fields">
          <Input
            label="Product name"
            name="name"
            value={form.name}
            maxLength={200}
            required
            error={errors.name}
            onChange={(event) => setField('name')(event.target.value)}
          />
          <Input
            label="SKU"
            name="sku"
            value={form.sku}
            maxLength={60}
            error={errors.sku}
            onChange={(event) => setField('sku')(event.target.value)}
          />
          <Input
            label="Brand"
            name="brand"
            value={form.brand}
            maxLength={80}
            onChange={(event) => setField('brand')(event.target.value)}
          />
          <Input
            label="Unit"
            name="unit"
            value={form.unit}
            maxLength={30}
            onChange={(event) => setField('unit')(event.target.value)}
          />
          <Input
            label="Category"
            name="category"
            value={form.category}
            maxLength={80}
            onChange={(event) => setField('category')(event.target.value)}
          />
          <Input
            label="Price (₹)"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            error={errors.price}
            onChange={(event) => setField('price')(event.target.value)}
          />
          <Input
            label="MRP (₹)"
            name="mrp"
            type="number"
            min="0"
            step="0.01"
            value={form.mrp}
            onChange={(event) => setField('mrp')(event.target.value)}
          />
          <Input
            label="Stock"
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            error={errors.stock}
            onChange={(event) => setField('stock')(Number(event.target.value))}
          />
          <Input
            label="Low stock threshold"
            name="lowStockThreshold"
            type="number"
            min="0"
            value={form.lowStockThreshold}
            onChange={(event) => setField('lowStockThreshold')(Number(event.target.value))}
          />
          <Input
            label="Image URL"
            name="imageUrl"
            type="url"
            maxLength={600}
            value={form.imageUrl}
            onChange={(event) => setField('imageUrl')(event.target.value)}
          />
          <Input
            label="Short description"
            name="shortDescription"
            value={form.shortDescription}
            maxLength={300}
            className="flow-field-wide"
            onChange={(event) => setField('shortDescription')(event.target.value)}
          />
          <label className="field-label flow-field-wide">
            Description
            <textarea
              name="description"
              rows={4}
              maxLength={2000}
              value={form.description}
              onChange={(event) => setField('description')(event.target.value)}
            />
          </label>
          <Checkbox
            label="Active (visible in the store)"
            name="isActive"
            checked={form.isActive}
            onChange={(event) => setField('isActive')(event.target.checked)}
          />
        </div>
        <Button busy={busy} type="submit">
          {busy ? 'Saving...' : editMode ? 'Save product' : 'Create product'}
        </Button>
      </form>
    </AdminLayout>
  );
}
