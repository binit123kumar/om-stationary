// Admin top header with the signed-in identity and sign-out.
import { useNavigate } from 'react-router-dom';

export function AdminHeader({ user, onLogout }) {
  const navigate = useNavigate();
  const signOut = async () => {
    await onLogout?.();
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div>
        <small>ADMIN PANEL</small>
        <h1>OM Stationary control centre</h1>
      </div>
      <div className="admin-header-user">
        <span>Signed in as <b>{user?.email || 'Admin'}</b></span>
        <button className="outline" onClick={signOut}>Sign out</button>
      </div>
    </header>
  );
}
