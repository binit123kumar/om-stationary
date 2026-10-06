// Brand text filter.
export function BrandFilter({ value = '', onChange }) {
  return (
    <label>
      Brand
      <input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder="Filter brand"
      />
    </label>
  );
}
