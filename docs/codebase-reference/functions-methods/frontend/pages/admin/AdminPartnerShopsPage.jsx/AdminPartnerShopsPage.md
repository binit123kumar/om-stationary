# AdminPartnerShopsPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminPartnerShopsPage.jsx`, declaration at line 7  
**Declaration kind:** function declaration  
**Module report:** [AdminPartnerShopsPage.md](../../../../../pages/admin/AdminPartnerShopsPage.md)

## Signature and responsibility

- **Name:** `AdminPartnerShopsPage` (exported).
- **Parameters:** `{ user, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminPartnerShopsPage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L12: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Partner shops</h1><p>Review shop details and approval status.</p></div>{error && <p role="alert" className="form-error"`
- **Direct call identifiers in this body:** useState, async, setLoading, setRows, listPartnerShops, adminHeaders, readSession, setError, useEffect, load, setBusy, setPartnerShopApproval, Error, json, approval
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (2), catch (3), throw (1), finally (2)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
