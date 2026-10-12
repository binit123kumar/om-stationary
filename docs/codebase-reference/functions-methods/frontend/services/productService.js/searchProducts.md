# searchProducts (exported)

**Source identity:** `frontend/src/services/productService.js`, declaration at line 37  
**Declaration kind:** function declaration  
**Module report:** [productService.md](../../../../services/productService.md)

## Signature and responsibility

- **Name:** `searchProducts` (exported).
- **Parameters:** `{ q, category, brand, minPrice, maxPrice, available, sort, page, pageSize = PAGE_SIZE }`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `searchProducts` body ke direct calls URLSearchParams, String, set, apiFetch, toString, json, Error, map hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L51: { items: (data.items || []).map(mapProduct), total: data.total || 0, page: data.page, pageSize: data.pageSize }`
- **Direct call identifiers in this body:** URLSearchParams, String, set, apiFetch, toString, json, Error, map
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** catch (1), throw (1)
- **Verified static import callers:** hooks/useProducts.js

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
