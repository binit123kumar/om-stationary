# AdminDashboardPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminDashboardPage.jsx`, declaration at line 16  
**Declaration kind:** function declaration  
**Module report:** [AdminDashboardPage.md](../../../../../pages/admin/AdminDashboardPage.md)

## Signature and responsibility

- **Name:** `AdminDashboardPage` (exported).
- **Parameters:** `{ user, key, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminDashboardPage` UI render karta hai; body has 3 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L33: (bare return)`
- **Return at source:** `L46: () => { active = false; }`
- **Return at source:** `L50: ( <AdminLayout user={user} onLogout={onLogout}> <div className="pagehead"> <small>ADMIN PANEL</small> <h1>OM Stationary control centre</h1> <p>Manage orders, catalogue, stock and delivery for the OM Stationary store.</p>`
- **Direct call identifiers in this body:** adminHeaders, readSession, useState, useEffect, async, all, getDashboard, getAnalytics, fetch, Error, json, setOrders, isArray, setDashboard, setAnalytics, setLoading, setError
- **Effects visible in this body:** network request, state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (1), throw (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
