// Fulfilment choice: pickup at the OM Stationary store or delivery.
import { Radio } from '../common/Radio.jsx';
import { Store, Truck } from 'lucide-react';
import { rupeesShort } from '../../utils/formatCurrency.js';

export function DeliveryMethodSelector({
  fulfillment,
  pickupAvailable,
  deliveryAvailable,
  deliveryOptions,
  onChange
}) {
  return (
    <div className="payment-choice-grid">
      <Radio
        name="fulfillment"
        value="Pickup"
        label="Pickup"
        hint={pickupAvailable ? 'Collect from OM Stationary' : 'Pickup is being configured'}
        checked={fulfillment === 'Pickup'}
        disabled={!pickupAvailable}
        icon={<Store size={22} />}
        onChange={() => onChange('Pickup')}
      />
      <Radio
        name="fulfillment"
        value="Delivery"
        label="Delivery"
        hint={deliveryAvailable
          ? `From ${rupeesShort(deliveryOptions?.charge ?? 0)} in serviceable PIN codes`
          : 'Delivery is not available right now'}
        checked={fulfillment === 'Delivery'}
        disabled={!deliveryAvailable}
        icon={<Truck size={22} />}
        onChange={() => onChange('Delivery')}
      />
    </div>
  );
}
