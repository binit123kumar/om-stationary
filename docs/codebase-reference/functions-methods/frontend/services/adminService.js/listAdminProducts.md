# listAdminProducts (exported)

**Source identity:** `frontend/src/services/adminService.js`, declaration at line 82  
**Declaration kind:** function declaration  
**Module report:** [adminService.md](../../../../services/adminService.md)

## Signature and responsibility

- **Name:** `listAdminProducts` (exported).
- **Parameters:** `headers, params = {}`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `listAdminProducts` body ke direct calls URLSearchParams, String, apiFetch, toString, Error, json hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L86: response.json()`
- **Direct call identifiers in this body:** URLSearchParams, String, apiFetch, toString, Error, json
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** throw (1)
- **Verified static import callers:** hooks/useAdmin.js, pages/admin/AdminInventoryPage.jsx, pages/admin/AdminProductsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
