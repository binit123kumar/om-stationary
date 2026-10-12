# AdminHeader (exported)

**Source identity:** `frontend/src/components/admin/AdminHeader.jsx`, declaration at line 4  
**Declaration kind:** function declaration  
**Module report:** [AdminHeader.md](../../../../../components/admin/AdminHeader.md)

## Signature and responsibility

- **Name:** `AdminHeader` (exported).
- **Parameters:** `{ user, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminHeader` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L11: ( <header className="admin-header"> <div> <small>ADMIN PANEL</small> <h1>OM Stationary control centre</h1> </div> <div className="admin-header-user"> <span>Signed in as <b>{user?.email || 'Admin'}</b></span> <button clas`
- **Direct call identifiers in this body:** useNavigate, async, navigate
- **Effects visible in this body:** navigation
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
