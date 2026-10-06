// Customer details section of the checkout form.
import { Input } from '../common/Input.jsx';

export function CustomerDetailsForm({ details, errors, onChange }) {
  return (
    <div className="flow-fields">
      <Input
        label="Full name"
        name="customerName"
        value={details.customerName}
        maxLength={120}
        autoComplete="name"
        error={errors.customerName}
        onChange={(event) => onChange('customerName', event.target.value)}
      />
      <Input
        label="Mobile number"
        name="customerPhone"
        value={details.customerPhone}
        maxLength={15}
        inputMode="numeric"
        autoComplete="tel"
        placeholder="10 digit mobile"
        error={errors.customerPhone}
        onChange={(event) => onChange('customerPhone', event.target.value)}
      />
      <Input
        label="Email address"
        name="customerEmail"
        type="email"
        value={details.customerEmail}
        maxLength={254}
        autoComplete="email"
        placeholder="For your invoice and order updates"
        className="flow-field-wide"
        error={errors.customerEmail}
        onChange={(event) => onChange('customerEmail', event.target.value)}
      />
    </div>
  );
}
