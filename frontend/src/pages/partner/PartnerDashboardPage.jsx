import { Link } from 'react-router-dom';
import { usePartner } from '../../hooks/usePartner.js';

export function PartnerDashboardPage() {
  const { shop, inventory, orders, error } = usePartner();

  return (
    <section className="account-page">
      <div className="pagehead">
        <small>PARTNER PORTAL</small>
        <h1>{shop?.name || 'Partner dashboard'}</h1>
        <p>
          {shop?.isApproved
            ? <span className="partner-status-badge approved">Shop approved</span>
            : <span className="partner-status-badge pending">Shop approval pending</span>}
          {' · '}Inventory and orders belonging to this shop.
        </p>
      </div>
      {error && <p role="alert" className="form-error">{error}</p>}

      <div className="adminstats">
        <Link className="admin-kpi" to="/partner/inventory"><b>{inventory.length}</b><span>Inventory products</span></Link>
        <Link className="admin-kpi" to="/partner/orders"><b>{orders.length}</b><span>Shop orders</span></Link>
        <Link className="admin-kpi" to="/partner/products"><b>{inventory.length}</b><span>Shop products</span></Link>
        <Link className="admin-kpi" to="/partner/profile"><b>Profile</b><span>Shop details</span></Link>
      </div>
    </section>
  );
}
