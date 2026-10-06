// Editable profile form (PUT /api/customers/me).
export function ProfileForm({ profile, user, onSave, busy = false }) {
  return (
    <form className="panel account-form" onSubmit={onSave}>
      <h2>Profile</h2>
      <label>
        Full name
        <input
          name="fullName"
          required
          defaultValue={profile?.fullName || user?.fullName || ''}
        />
      </label>
      <label>
        Mobile number
        <input
          name="phone"
          required
          defaultValue={profile?.phone || user?.phone || ''}
        />
      </label>
      <label>
        Email
        <input disabled defaultValue={profile?.email || user?.email || ''} />
      </label>
      <button className="btn" type="submit" disabled={busy}>
        {busy ? 'Saving…' : 'Save profile'}
      </button>
    </form>
  );
}
