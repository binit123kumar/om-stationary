// Category chip row ("All" + every real category).
import { Link } from 'react-router-dom';

export function CategoryFilter({ categories = [], value = '', onChange }) {
  return (
    <>
      <Link
        className={!value ? 'selected' : ''}
        to="/search"
        onClick={onChange ? (event) => { event.preventDefault(); onChange(''); } : undefined}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          className={value === category ? 'selected' : ''}
          key={category}
          to={'/search?cat=' + encodeURIComponent(category)}
          onClick={onChange ? (event) => { event.preventDefault(); onChange(category); } : undefined}
        >
          {category}
        </Link>
      ))}
    </>
  );
}
