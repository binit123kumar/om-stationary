# listCategories (exported)

**Source identity:** `frontend/src/services/productService.js`, declaration at line 61  
**Declaration kind:** function declaration  
**Module report:** [productService.md](../../../../services/productService.md)

## Signature and responsibility

- **Name:** `listCategories` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `listCategories` body ke direct calls apiFetch, json, isArray hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L63: []`
- **Return at source:** `L65: Array.isArray(rows) ? rows : []`
- **Direct call identifiers in this body:** apiFetch, json, isArray
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** hooks/useCategories.js, hooks/useProducts.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
