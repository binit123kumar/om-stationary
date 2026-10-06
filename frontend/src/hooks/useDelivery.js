// Store configuration hook: delivery options, payment options and the
// pickup location, all loaded from the API in parallel.
import { useEffect, useState } from 'react';
import { getDeliveryOptions } from '../services/deliveryService.js';
import { getPickupLocation } from '../services/deliveryService.js';
import { getPaymentOptions } from '../services/paymentService.js';
import { getMyAssignments, updateAssignmentStatus } from '../services/deliveryService.js';

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

export function useDeliveryAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  const reload = async () => {
    try {
      const rows = await getMyAssignments();
      if (rows === null) {
        setError('Could not load assigned deliveries.');
        return;
      }
      setAssignments(Array.isArray(rows) ? rows : []);
      setError('');
    } catch {
      setError('Could not load assigned deliveries.');
    }
  };

  useEffect(() => { reload(); }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateAssignmentStatus(id, status);
      await reload();
    } catch (e) {
      setError(e.message || 'This delivery cannot move to that status.');
      return;
    }
  };

  return { assignments, error, reload, changeStatus };
}
