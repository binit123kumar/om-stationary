# AdminCouponsPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminCouponsPage.jsx`, declaration at line 13  
**Declaration kind:** function declaration  
**Module report:** [AdminCouponsPage.md](../../../../../pages/admin/AdminCouponsPage.md)

## Signature and responsibility

- **Name:** `AdminCouponsPage` (exported).
- **Parameters:** `{ user, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminCouponsPage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L21: <AdminLayout user={user} onLogout={onLogout}><div className="pagehead"><small>ADMIN PANEL</small><h1>Coupons</h1><p>Manage real coupon rules and usage limits.</p><button className="btn" onClick={() => open()}>Create coup`
- **Direct call identifiers in this body:** adminHeaders, readSession, useState, blank, useCallback, async, setLoading, setError, setRows, listAdminCoupons, useEffect, load, setEditing, setForm, String, localInput, preventDefault, setBusy, Number, Date, toISOString, trim, toUpperCase, updateCoupon, createCoupon, Error, json, open, rupeesShort, formatDateTime
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (2), catch (3), throw (1), finally (2)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
