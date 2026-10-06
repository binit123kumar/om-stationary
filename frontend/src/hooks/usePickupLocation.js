// Pickup station location (address, hours, map pins).
import { useEffect, useState } from 'react';
import { getPickupLocation } from '../services/deliveryService.js';

export function usePickupLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let active = true;
    getPickupLocation()
      .then((data) => { if (active) setLocation(data); })
      .catch(() => { if (active) setLocation(null); });
    return () => { active = false; };
  }, []);

  return location;
}
