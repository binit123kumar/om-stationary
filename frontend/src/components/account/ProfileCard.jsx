// Profile summary card.
export function ProfileCard({ profile, user }) {
  return (
    <div className="panel account-profile">
      <h2>Profile</h2>
      <p><b>{profile?.fullName || user?.fullName || user?.name || '—'}</b></p>
      <p>{profile?.phone || user?.phone || '—'}</p>
      <p>{profile?.email || user?.email || '—'}</p>
    </div>
  );
}
