// Desktop category navigation bar.
import { Link } from 'react-router-dom';

export function TopNav({ categories = [] }) {
  if (!categories.length) return null;
  return (
    <nav className="topnav" aria-label="Categories">
      {categories.map((category) => (
        <Link
          key={category}
          to={'/search?cat=' + encodeURIComponent(category)}
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
