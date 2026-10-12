# getProduct (exported)

**Source identity:** `frontend/src/services/productService.js`, declaration at line 54  
**Declaration kind:** function declaration  
**Module report:** [productService.md](../../../../services/productService.md)

## Signature and responsibility

- **Name:** `getProduct` (exported).
- **Parameters:** `id`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `getProduct` body ke direct calls apiFetch, encodeURIComponent, Error, mapProduct, json hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L56: null`
- **Return at source:** `L58: mapProduct(await response.json())`
- **Direct call identifiers in this body:** apiFetch, encodeURIComponent, Error, mapProduct, json
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** throw (1)
- **Verified static import callers:** pages/admin/AdminProductFormPage.jsx, pages/customer/ProductDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
