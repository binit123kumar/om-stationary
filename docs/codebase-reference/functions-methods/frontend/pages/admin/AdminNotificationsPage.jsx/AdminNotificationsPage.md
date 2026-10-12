# AdminNotificationsPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminNotificationsPage.jsx`, declaration at line 6  
**Declaration kind:** function declaration  
**Module report:** [AdminNotificationsPage.md](../../../../../pages/admin/AdminNotificationsPage.md)

## Signature and responsibility

- **Name:** `AdminNotificationsPage` (exported).
- **Parameters:** `{user,onLogout}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminNotificationsPage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L6: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Notifications</h1><p>Operational alerts from live orders, inventory and payments.</p></div>{error&&<p role="alert" clas`
- **Direct call identifiers in this body:** useState, useEffect, getAdminNotifications, adminHeaders, readSession, then, setError, entries, map, toUpperCase, slice, stringify
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** catch (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
