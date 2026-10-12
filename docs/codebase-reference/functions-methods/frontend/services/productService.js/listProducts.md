# listProducts (exported)

**Source identity:** `frontend/src/services/productService.js`, declaration at line 30  
**Declaration kind:** function declaration  
**Module report:** [productService.md](../../../../services/productService.md)

## Signature and responsibility

- **Name:** `listProducts` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `listProducts` body ke direct calls apiFetch, Error, json, isArray, map hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L34: (Array.isArray(rows) ? rows : []).map(mapProduct)`
- **Direct call identifiers in this body:** apiFetch, Error, json, isArray, map
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** throw (1)
- **Verified static import callers:** hooks/useCatalog.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
