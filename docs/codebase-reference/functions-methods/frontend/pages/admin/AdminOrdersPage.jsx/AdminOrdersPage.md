# AdminOrdersPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminOrdersPage.jsx`, declaration at line 13  
**Declaration kind:** function declaration  
**Module report:** [AdminOrdersPage.md](../../../../../pages/admin/AdminOrdersPage.md)

## Signature and responsibility

- **Name:** `AdminOrdersPage` (exported).
- **Parameters:** `{ user, key, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminOrdersPage` UI render karta hai; body has 4 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 4 explicit return statement(s) identified.
- **Return at source:** `L35: () => { active = false; }`
- **Return at source:** `L49: (bare return)`
- **Return at source:** `L58: () => { active = false; }`
- **Return at source:** `L71: ( <AdminLayout user={user} onLogout={onLogout}> <div className="pagehead"> <small>ADMIN PANEL</small> <h1>Orders</h1> <p>{total} total</p> </div> {error && <p className="form-error" role="alert">{error}</p>} <div classNa`
- **Direct call identifiers in this body:** adminHeaders, readSession, useState, useMemo, useEffect, getFilterOptions, then, setOptions, setLoading, setError, URLSearchParams, String, entries, forEach, set, listAdminOrders, fromEntries, async, Error, json, setRows, isArray, setTotal, map, setQ, setPage, setStatus, selectOptions, setPaymentStatus, setPaymentMethod
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** catch (2), throw (2)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
