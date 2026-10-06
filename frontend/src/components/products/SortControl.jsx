// Sort dropdown. Values are the sort keys the products API accepts.
export function SortControl({ value = 'relevance', onChange }) {
  return (
    <label>
      Sort by
      <select
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        <option value="relevance">Relevance</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
    </label>
  );
}
