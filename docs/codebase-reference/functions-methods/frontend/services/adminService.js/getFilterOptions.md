# getFilterOptions (exported)

**Source identity:** `frontend/src/services/adminService.js`, declaration at line 24  
**Declaration kind:** function declaration  
**Module report:** [adminService.md](../../../../services/adminService.md)

## Signature and responsibility

- **Name:** `getFilterOptions` (exported).
- **Parameters:** `headers`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `getFilterOptions` body ke direct calls apiFetch, json hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L26: response.ok ? response.json() : null`
- **Direct call identifiers in this body:** apiFetch, json
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminOrdersPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
