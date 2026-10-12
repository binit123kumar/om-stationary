# AdminReportsPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminReportsPage.jsx`, declaration at line 7  
**Declaration kind:** function declaration  
**Module report:** [AdminReportsPage.md](../../../../../pages/admin/AdminReportsPage.md)

## Signature and responsibility

- **Name:** `AdminReportsPage` (exported).
- **Parameters:** `{user,onLogout}`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminReportsPage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L7: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Reports</h1><p>Sales, orders, customers, inventory, payment and delivery summaries.</p></div>{error&&<p role="alert" cl`
- **Direct call identifiers in this body:** useState, async, setBusy, setError, getReport, adminHeaders, readSession, Error, setData, json, useEffect, load, exportReport, blob, createObjectURL, createElement, click, revokeObjectURL, setFrom, setTo, entries, filter, includes, map, test, rupeesShort, isArray, csv, keys, values
- **Effects visible in this body:** state update or dispatch, browser/console global
- **Error-flow markers visible in this body:** try (2), catch (2), throw (2), finally (1)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
