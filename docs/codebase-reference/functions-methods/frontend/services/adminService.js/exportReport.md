# exportReport (exported)

**Source identity:** `frontend/src/services/adminService.js`, declaration at line 191  
**Declaration kind:** function declaration  
**Module report:** [adminService.md](../../../../services/adminService.md)

## Signature and responsibility

- **Name:** `exportReport` (exported).
- **Parameters:** `headers, report, from, to`
- **Simple Hinglish responsibility:** Named helper. Hinglish: `exportReport` body ke direct calls URLSearchParams, set, apiFetch, toString hain; 1 return statement(s) statically identified.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L195: apiFetch('/api/admin/reports/export?' + params.toString(), { headers })`
- **Direct call identifiers in this body:** URLSearchParams, set, apiFetch, toString
- **Effects visible in this body:** network request
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** pages/admin/AdminReportsPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
