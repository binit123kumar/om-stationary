// Partner inventory row: price / stock / availability
// editor for one shop product. All values submit to
// PUT /api/partner/inventory.
import { useState } from 'react';

export function PartnerInventoryForm({ entry, onSave }) {
  const [price, setPrice] = useState(String(entry.sellingPrice));
  const [stock, setStock] = useState(String(entry.stock));
  const [available, setAvailable] = useState(!!entry.isAvailable);
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      await onSave({
        productId: entry.productId,
        sellingPrice: Number(price),
        stock: Number(stock),
        isAvailable: available
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="partner-inventory" onSubmit={submit}>
      <b>{entry.name}</b>
      <label>
        Price
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      <label>
        Stock
        <input
          name="stock"
          type="number"
          min="0"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
        />
      </label>
      <label className="check-field">
        <input
          name="available"
          type="checkbox"
          checked={available}
          onChange={(event) => setAvailable(event.target.checked)}
        />
        {' '}Available
      </label>
      <button className="outline" type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}
