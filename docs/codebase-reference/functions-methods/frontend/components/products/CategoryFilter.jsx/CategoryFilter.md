# CategoryFilter (exported)

**Source identity:** `frontend/src/components/products/CategoryFilter.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [CategoryFilter.md](../../../../../components/products/CategoryFilter.md)

## Signature and responsibility

- **Name:** `CategoryFilter` (exported).
- **Parameters:** `{ categories = [], value = '', onChange }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `CategoryFilter` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ` L5: ( <> <Link className={!value ? 'selected' : ''} to="/search" onClick={onChange ? (event) => { event.preventDefault(); onChange(''); } : undefined} > All </Link> {categories.map((category) => ( <Link className={value ===  `
- **Direct call identifiers in this body:** preventDefault, onChange, map, encodeURIComponent
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/products/ProductFilters.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
