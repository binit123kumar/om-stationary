// Coupon code entry with server-side validation.
import { useState } from 'react';
import { validateCoupon } from '../../services/orderService.js';
import { readFailure } from '../../services/api.js';
import { rupees } from '../../utils/formatCurrency.js';

export function CouponBox({ code, onCodeChange, items, applied, onApplied }) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const apply = async () => {
    setMessage('');
    onApplied(null);
    if (!code.trim()) {
      setMessage('Enter a coupon code first.');
      return;
    }
    setBusy(true);
    try {
      const response = await validateCoupon(code.trim(), items);
      if (!response.ok) {
        setMessage(await readFailure(response, 'This coupon is not valid.'));
        return;
      }
      const data = await response.json();
      onApplied(data);
      setMessage(`Coupon applied. You save ${rupees(data.discountAmount ?? 0)}.`);
    } catch {
      setMessage('Could not reach the coupon service. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="coupon-entry">
      <label className="field-label">
        Coupon code
        <input
          value={code}
          maxLength={40}
          placeholder="Enter code"
          onChange={(event) => {
            onCodeChange?.(event.target.value.toUpperCase());
            onApplied(null);
            setMessage('');
          }}
        />
      </label>
      <button type="button" className="outline" onClick={apply} disabled={busy}>
        {busy ? 'Checking…' : 'Apply'}
      </button>
      {message && <small role="status">{message}</small>}
    </div>
  );
}
