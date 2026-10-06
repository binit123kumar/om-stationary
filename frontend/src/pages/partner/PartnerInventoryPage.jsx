import { Link } from 'react-router-dom';
import { PartnerInventoryForm } from '../../components/partner/PartnerInventoryForm.jsx';
import { usePartner } from '../../hooks/usePartner.js';

export function PartnerInventoryPage() {
  const { inventory, error, saveInventory } = usePartner();
  return (
    <section className="account-page">
      <div className="pagehead">
        <small>PARTNER PORTAL</small>
        <h1>Inventory Management</h1>
        <p>Update prices, stock levels and availability for products at your shop.</p>
        <Link className="outline" to="/partner">Partner dashboard</Link>
      </div>
      {error && <p role="alert" className="form-error">{error}</p>}
      <section className="panel">
        {inventory.map((entry) => (
          <PartnerInventoryForm key={entry.productId} entry={entry} onSave={saveInventory} />
        ))}
      </section>
    </section>
  );
}
