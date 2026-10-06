// Search input with submit support.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';

export function SearchBar({ placeholder = 'Search…', initialValue = '', buttonLabel = 'Search' }) {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const query = value.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  };

  return (
    <form className="search" action="/search" onSubmit={submit}>
      <SearchIcon size={20} />
      <input
        name="q"
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        aria-label="Search products"
      />
      <button type="submit" aria-label="Search">
        <SearchIcon size={18} />
      </button>
    </form>
  );
}
