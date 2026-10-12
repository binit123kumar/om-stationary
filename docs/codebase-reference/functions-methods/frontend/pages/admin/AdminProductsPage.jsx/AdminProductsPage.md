# AdminProductsPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminProductsPage.jsx`, declaration at line 21  
**Declaration kind:** function declaration  
**Module report:** [AdminProductsPage.md](../../../../../pages/admin/AdminProductsPage.md)

## Signature and responsibility

- **Name:** `AdminProductsPage` (exported).
- **Parameters:** `{ user, key, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminProductsPage` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L108: ( <AdminLayout user={user} onLogout={onLogout}> <div className="pagehead"> <small>ADMIN PANEL</small> <h1>Products</h1> <p>{data.total} products</p> <Link className="btn" to="/admin/products/new">Add product</Link> </div`
- **Direct call identifiers in this body:** adminHeaders, readSession, useState, useCallback, async, setLoading, setError, String, listAdminProducts, setData, useEffect, load, setPending, setMessage, adjustStock, json, Error, updateProduct, deactivateProduct, setQ, setPage, setCategory, setLowStockOnly, rupeesShort, stockStateLabel, runAdjust, runToggle, runDeactivate
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (4), catch (5), throw (2), finally (3)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
