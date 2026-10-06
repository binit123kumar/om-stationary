// New address form (POST /api/customers/addresses).
export function AddressForm({ profile, user, onSave, busy = false }) {
  return (
    <form className="panel account-form" onSubmit={onSave}>
      <h2>Add delivery address</h2>
      <label>
        Label
        <input name="label" defaultValue="Home" required />
      </label>
      <label>
        Recipient name
        <input
          name="recipientName"
          defaultValue={profile?.fullName || user?.fullName || ''}
          required
        />
      </label>
      <label>
        Mobile number
        <input
          name="phone"
          defaultValue={profile?.phone || user?.phone || ''}
          required
        />
      </label>
      <label>
        Address line
        <input name="line1" required maxLength={300} />
      </label>
      <label>
        Apartment/landmark
        <input name="line2" maxLength={300} />
      </label>
      <div className="address-fields">
        <label>
          City
          <input name="city" required />
        </label>
        <label>
          State
          <input name="state" required />
        </label>
      </div>
      <label>
        PIN code
        <input name="pincode" pattern="[0-9]{6}" required />
      </label>
      <label className="check-field">
        <input type="checkbox" name="isDefault" /> Make default address
      </label>
      <button className="btn" type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Save address'}
      </button>
    </form>
  );
}
