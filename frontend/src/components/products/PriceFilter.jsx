// Min/max price range filter.
export function PriceFilter({ minPrice = '', maxPrice = '', onChange }) {
  return (
    <>
      <label>
        Min price
        <input
          type="number"
          min="0"
          value={minPrice}
          onChange={(event) => onChange?.({ minPrice: event.target.value, maxPrice })}
        />
      </label>
      <label>
        Max price
        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(event) => onChange?.({ minPrice, maxPrice: event.target.value })}
        />
      </label>
    </>
  );
}
