// Delivery address form with the live serviceability check.
import { Input } from '../common/Input.jsx';
import { Select } from '../common/Select.jsx';
import { Button } from '../common/Button.jsx';
import { Navigation } from 'lucide-react';

export function AddressForm({
  details,
  errors,
  cities = [],
  locating = false,
  quoting = false,
  geoError = '',
  quote,
  quoteError = '',
  onField,
  onRequestLocation,
  onRequestQuote
}) {
  return (
    <div className="delivery-panel">
      <div className="flow-fields">
        <Input
          label="Address"
          name="addressLine"
          value={details.addressLine}
          maxLength={300}
          autoComplete="street-address"
          placeholder="House / street"
          className="flow-field-wide"
          error={errors.addressLine}
          onChange={(event) => onField('addressLine', event.target.value)}
        />
        <Input
          label="Landmark (optional)"
          name="landmark"
          value={details.landmark}
          maxLength={300}
          onChange={(event) => onField('landmark', event.target.value)}
        />
        <Select
          label="City"
          name="city"
          value={details.city}
          error={errors.city}
          onChange={(event) => onField('city', event.target.value)}
        >
          {(cities || []).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </Select>
        <Input
          label="State"
          name="state"
          value={details.state}
          maxLength={80}
          placeholder="Bihar"
          autoComplete="address-state"
          error={errors.state}
          onChange={(event) => onField('state', event.target.value)}
        />
        <Input
          label="PIN code"
          name="pincode"
          value={details.pincode}
          maxLength={6}
          inputMode="numeric"
          placeholder="800007"
          autoComplete="postal-code"
          error={errors.pincode}
          onChange={(event) => onField('pincode', event.target.value)}
        />
      </div>
      <div className="geo-row">
        <button
          type="button"
          className="outline"
          onClick={onRequestLocation}
          disabled={locating}
        >
          <Navigation size={16} />
          {locating ? 'Locating…' : details.coordinatesConfirmed ? 'Location confirmed — update' : 'Use my location'}
        </button>
        {geoError && <small role="alert">{geoError}</small>}
      </div>
      <Button onClick={onRequestQuote} busy={quoting} disabled={quoting}>
        {quoting ? 'Checking availability…' : 'Check delivery availability & price'}
      </Button>
      {quote && (
        <p className="quote-ok">
          Delivery available &middot; charge quoted &middot; stock verified
        </p>
      )}
      {quoteError && <p className="quote-bad" role="status">{quoteError}</p>}
    </div>
  );
}
