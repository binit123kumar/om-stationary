// Tabbed detail panel for product description / specifications / reviews.
import { useState } from 'react';
import { Tabs } from '../common/Tabs.jsx';

export function ProductTabs({ product }) {
  const [active, setActive] = useState('details');
  const description = product?.desc || product?.shortDesc || '';

  return (
    <div className="product-tabs">
      <Tabs
        tabs={[
          { id: 'details', label: 'Details' },
          { id: 'shipping', label: 'Shipping & returns' }
        ]}
        active={active}
        onChange={setActive}
      />
      {active === 'details' && (
        <div className="product-tab-panel">
          {description
            ? <p>{description}</p>
            : <p>Product details will be updated by OM Stationary.</p>}
          {product?.sku && (
            <p><small>SKU: {product.sku}{product.unit ? ` · Unit: ${product.unit}` : ''}</small></p>
          )}
        </div>
      )}
      {active === 'shipping' && (
        <div className="product-tab-panel">
          <p>Orders are packed by OM Stationary and dispatched through the verified local delivery flow. Delivery charges and serviceable PIN codes are quoted at checkout; pickup from the OM Stationary store is free.</p>
        </div>
      )}
    </div>
  );
}
