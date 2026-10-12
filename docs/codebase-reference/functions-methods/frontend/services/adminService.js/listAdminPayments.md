# listAdminPayments (exported)

**Source identity:** `frontend/src/services/adminService.js`, declaration at line 151  
**Declaration kind:** function declaration  
**Module report:** [adminService.md](../../../../services/adminService.md)

## Signature and responsibility

- **Name:** `listAdminPayments` (exported).
- **Parameters:** `headers, params = {}`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `listAdminPayments` body ke direct calls URLSearchParams, apiFetch, toString, Error, json hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L155: response.json()`
- **Direct call identifiers in this body:** URLSearchParams, apiFetch, toString, Error, json
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** catch (1), throw (1)
- **Verified static import callers:** pages/admin/AdminPaymentsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
