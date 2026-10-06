// Empty and error states used by every list page.
import { Link } from 'react-router-dom';

export function EmptyState({ icon, title, message, actionLabel, actionTo }) {
  return (
    <div className="empty">
      {icon}
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {actionLabel && actionTo && <Link className="btn" to={actionTo}>{actionLabel}</Link>}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="catalog-state error" role="alert">
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {onRetry && <button type="button" className="outline" onClick={onRetry}>Retry</button>}
    </div>
  );
}
