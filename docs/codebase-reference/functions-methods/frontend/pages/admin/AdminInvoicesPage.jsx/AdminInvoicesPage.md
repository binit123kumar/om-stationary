# AdminInvoicesPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminInvoicesPage.jsx`, declaration at line 10  
**Declaration kind:** function declaration  
**Module report:** [AdminInvoicesPage.md](../../../../../pages/admin/AdminInvoicesPage.md)

## Signature and responsibility

- **Name:** `AdminInvoicesPage` (exported).
- **Parameters:** `{ user, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminInvoicesPage` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L12: () => { active = false; }`
- **Return at source:** `L13: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Invoices</h1><p>{data.total} invoices</p></div>{error && <p role="alert" className="form-error">{error}</p>}<label clas`
- **Direct call identifiers in this body:** adminHeaders, readSession, useState, useEffect, setLoading, setError, listAdminInvoices, then, setData, finally, setQ, formatDateTime, rupeesShort
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** catch (1), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
