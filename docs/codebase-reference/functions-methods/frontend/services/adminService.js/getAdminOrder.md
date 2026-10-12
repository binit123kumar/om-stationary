# getAdminOrder (exported)

**Source identity:** `frontend/src/services/adminService.js`, declaration at line 242  
**Declaration kind:** function declaration  
**Module report:** [adminService.md](../../../../services/adminService.md)

## Signature and responsibility

- **Name:** `getAdminOrder` (exported).
- **Parameters:** `id, headers`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `getAdminOrder` body ke direct calls apiFetch, Error, json hain; 2 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L244: null`
- **Return at source:** `L246: response.json()`
- **Direct call identifiers in this body:** apiFetch, Error, json
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** throw (1)
- **Verified static import callers:** pages/admin/AdminOrderDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
