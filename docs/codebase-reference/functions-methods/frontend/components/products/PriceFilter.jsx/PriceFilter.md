# PriceFilter (exported)

**Source identity:** `frontend/src/components/products/PriceFilter.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [PriceFilter.md](../../../../../components/products/PriceFilter.md)

## Signature and responsibility

- **Name:** `PriceFilter` (exported).
- **Parameters:** `{ minPrice = '', maxPrice = '', onChange }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `PriceFilter` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L3: ( <> <label> Min price <input type="number" min="0" value={minPrice} onChange={(event) => onChange?.({ minPrice: event.target.value, maxPrice })} /> </label> <label> Max price <input type="number" min="0" value={maxPrice`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/products/ProductFilters.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
