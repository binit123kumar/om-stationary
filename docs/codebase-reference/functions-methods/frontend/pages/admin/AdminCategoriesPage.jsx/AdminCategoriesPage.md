# AdminCategoriesPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminCategoriesPage.jsx`, declaration at line 8  
**Declaration kind:** function declaration  
**Module report:** [AdminCategoriesPage.md](../../../../../pages/admin/AdminCategoriesPage.md)

## Signature and responsibility

- **Name:** `AdminCategoriesPage` (exported).
- **Parameters:** `{ user, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminCategoriesPage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L39: ( <AdminLayout user={user} onLogout={onLogout}> <div className="pagehead"><small>ADMIN PANEL</small><h1>Categories</h1><p>Manage the real catalogue categories.</p><button className="btn" onClick={() => open()}>Add catego`
- **Direct call identifiers in this body:** adminHeaders, readSession, useState, useCallback, async, setLoading, setError, setRows, listAdminCategories, useEffect, load, setEditing, setName, setActive, preventDefault, setBusy, updateCategory, trim, createCategory, Error, json, open
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (3), catch (5), throw (2), finally (3)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
