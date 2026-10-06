// Store configuration hook: delivery options, payment options and the
// pickup location, all loaded from the API in parallel.
import { useEffect, useState } from 'react';
import { getDeliveryOptions } from '../services/deliveryService.js';
import { getPickupLocation } from '../services/deliveryService.js';
import { getPaymentOptions } from '../services/paymentService.js';

export function useStoreConfig() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      getDeliveryOptions().catch(() => null),
      getPaymentOptions().catch(() => null),
      getPickupLocation().catch(() => null)
    ]).then(([delivery, payments, location]) => {
      if (!active) return;
      setConfig({
        delivery: delivery || { enabled: false, cities: [], charge: null },
        payments: payments || { cashOnDelivery: true, onlineUpi: false, verificationAvailable: false, taxRatePercent: 0 },
        location
      });
    });
    return () => { active = false; };
  }, []);

  return config;
}
