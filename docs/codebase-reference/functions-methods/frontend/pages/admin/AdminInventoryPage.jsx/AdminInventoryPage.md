# AdminInventoryPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminInventoryPage.jsx`, declaration at line 8  
**Declaration kind:** function declaration  
**Module report:** [AdminInventoryPage.md](../../../../../pages/admin/AdminInventoryPage.md)

## Signature and responsibility

- **Name:** `AdminInventoryPage` (exported).
- **Parameters:** `{ user, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminInventoryPage` UI render karta hai; body has 2 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 2 explicit return statement(s) identified.
- **Return at source:** `L23: (bare return)`
- **Return at source:** `L28: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Inventory</h1><p>Stock and thresholds from the product catalogue.</p></div>`
- **Direct call identifiers in this body:** adminHeaders, readSession, useState, useCallback, async, setLoading, setError, listAdminProducts, String, setRows, useEffect, load, Number, isInteger, setBusyId, setMessage, adjustStock, Error, json, setQ, setLowOnly, rupeesShort, setDelta, adjust
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (2), catch (3), throw (1), finally (2)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
