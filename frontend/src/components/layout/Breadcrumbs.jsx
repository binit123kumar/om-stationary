// Breadcrumb trail. Each crumb is a real route; the last item
// is the current page and is not a link.
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items = [] }) {
  if (items.length < 2) return null;
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.slice(0, -1).map((item) => (
        <span key={item.to} className="breadcrumb-item">
          <Link to={item.to}>{item.label}</Link>
          <ChevronRight size={13} />
        </span>
      ))}
      <span className="breadcrumb-item breadcrumb-current" aria-current="page">
        {items[items.length - 1].label}
      </span>
    </nav>
  );
}
