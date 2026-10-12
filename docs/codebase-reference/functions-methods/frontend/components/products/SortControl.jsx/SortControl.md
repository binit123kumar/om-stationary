# SortControl (exported)

**Source identity:** `frontend/src/components/products/SortControl.jsx`, declaration at line 2  
**Declaration kind:** function declaration  
**Module report:** [SortControl.md](../../../../../components/products/SortControl.md)

## Signature and responsibility

- **Name:** `SortControl` (exported).
- **Parameters:** `{ value = 'relevance', onChange }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `SortControl` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L3: ( <label> Sort by <select value={value} onChange={(event) => onChange?.(event.target.value)} > <option value="relevance">Relevance</option> <option value="price-asc">Price: low to high</option> <option value="price-desc"`
- **Direct call identifiers in this body:** None identified by lexical scan.
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/products/ProductFilters.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
