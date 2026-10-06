// Product search field with suggestion datalist.
import { Search as SearchIcon } from 'lucide-react';

export function ProductSearch({ products = [], value = '', onChange, onSubmit, placeholder = 'What are you looking for today?' }) {
  const submit = (event) => {
    event.preventDefault();
    onSubmit?.(value.trim());
  };

  return (
    <form className="search" action="/search" onSubmit={submit}>
      <SearchIcon size={20} />
      <input
        name="q"
        list="product-suggestions"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
      <datalist id="product-suggestions">
        {products.map((product) => (
          <option key={product.id} value={product.name} />
        ))}
        <option value="A4 Paper" />
        <option value="Notebook" />
        <option value="Office supplies" />
      </datalist>
      <button aria-label="Search">
        <SearchIcon size={18} />
      </button>
    </form>
  );
}
