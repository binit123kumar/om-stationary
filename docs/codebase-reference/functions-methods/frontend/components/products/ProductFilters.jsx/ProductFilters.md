# ProductFilters (exported)

**Source identity:** `frontend/src/components/products/ProductFilters.jsx`, declaration at line 10  
**Declaration kind:** function declaration  
**Module report:** [ProductFilters.md](../../../../../components/products/ProductFilters.md)

## Signature and responsibility

- **Name:** `ProductFilters` (exported).
- **Parameters:** `{
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
}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `ProductFilters` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.
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
}`. Hinglish: yeh UI render karta hai; exact source return fragments neeche diye gaye hain.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ` L26: ( <> <div className="listing-tools"> <div className="category-filters"> <CategoryFilter categories={categories} value={category} onChange={onCategory} /> </div> <SortControl value={sort} onChange={onSort} /> </div> <div  `
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/customer/ProductListingPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
