# AdminAuditLogPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminAuditLogPage.jsx`, declaration at line 8  
**Declaration kind:** function declaration  
**Module report:** [AdminAuditLogPage.md](../../../../../pages/admin/AdminAuditLogPage.md)

## Signature and responsibility

- **Name:** `AdminAuditLogPage` (exported).
- **Parameters:** `{user,onLogout}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminAuditLogPage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L8: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Audit log</h1><p>Recent administrative actions recorded by the server.</p></div>{error&&<p role="alert" className="form`
- **Direct call identifiers in this body:** useState, useEffect, getAuditLog, adminHeaders, readSession, then, setError, finally, setLoading, formatDateTime
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** catch (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
