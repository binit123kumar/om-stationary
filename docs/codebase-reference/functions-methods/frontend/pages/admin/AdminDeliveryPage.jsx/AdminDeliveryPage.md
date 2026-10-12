# AdminDeliveryPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminDeliveryPage.jsx`, declaration at line 9  
**Declaration kind:** function declaration  
**Module report:** [AdminDeliveryPage.md](../../../../../pages/admin/AdminDeliveryPage.md)

## Signature and responsibility

- **Name:** `AdminDeliveryPage` (exported).
- **Parameters:** `{ user, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminDeliveryPage` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L14: (bare return)`
- **Return at source:** `L16: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Delivery management</h1><p>Manage delivery partners and server-recorded assignments.</p><button className="btn" onClick`
- **Direct call identifiers in this body:** adminHeaders, readSession, useState, useCallback, async, setLoading, setError, all, listDeliveryPartners, listAllAssignments, setPartners, setAssignments, useEffect, load, preventDefault, setBusy, createDeliveryPartner, Error, json, setCreateOpen, setPartner, some, String, assignDeliveryPartner, filter, setSelection, map, assign
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (3), catch (5), throw (2), finally (3)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
