// Catalogue filter controls: category chips, brand, price range,
// stock-only toggle and sort. All values map to real API query
// parameters.
import { Search } from 'lucide-react';
import { CategoryFilter } from './CategoryFilter.jsx';
import { BrandFilter } from './BrandFilter.jsx';
import { PriceFilter } from './PriceFilter.jsx';
import { SortControl } from './SortControl.jsx';

export function ProductFilters({
  categories = [],
  category = '',
  onCategory,
  brand = '',
  onBrand,
  minPrice = '',
  maxPrice = '',
  onPrice,
  available = false,
  onAvailable,
  sort = 'relevance',
  onSort,
  resultCount = null,
  loading = false
}) {
  return (
    <>
      <div className="listing-tools">
        <div className="category-filters">
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={onCategory}
          />
        </div>
        <SortControl value={sort} onChange={onSort} />
      </div>
      <div className="search-filters">
        <BrandFilter value={brand} onChange={onBrand} />
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChange={onPrice}
        />
        <label className="filter-check">
          <input
            type="checkbox"
            checked={available}
            onChange={(event) => onAvailable?.(event.target.checked)}
          />
          {' '}In stock at OM Stationary
        </label>
      </div>
      <p className="filter-summary">
        {loading
          ? 'Searching catalogue...'
          : `${resultCount ?? 0} ${resultCount === 1 ? 'product' : 'products'} in the OM Stationary catalogue`}
      </p>
    </>
  );
}
