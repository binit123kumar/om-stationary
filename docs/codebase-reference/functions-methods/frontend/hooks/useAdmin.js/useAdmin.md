# useAdmin (exported)

**Source identity:** `frontend/src/hooks/useAdmin.js`, declaration at line 32  
**Declaration kind:** function declaration  
**Module report:** [useAdmin.md](../../../../hooks-context/hooks/useAdmin.md)

## Signature and responsibility

- **Name:** `useAdmin` (exported).
- **Parameters:** `user, key`
- **Simple Hinglish responsibility:** Hook-shaped function. Hinglish: `useAdmin` application values/hook state ko compose karta hai; direct body calls are readSession, adminHeaders, useState, useCallback, async, setLoading, setError, all, listAdminOrders, getDashboard, listAdminProducts, Error, setOrders, json, setDashboard, setProducts, useEffect, load, setMessage, setPendingStatus, updateOrderStatus, FormData, assignDelivery, get, confirmOrderPayment, adjustStock, updateProduct, deactivateProduct, saveAdminSettings.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L46: (bare return)`
- **Return at source:** `L156: response.json()`
- **Return at source:** `L160: { orders, dashboard, products, error, loading, message, pendingStatus, load, setStatus, assign, markPaid, adjustStockBy, toggleProduct, deactivate, saveSettings, setError, setMessage, hasAdminSession }`
- **Direct call identifiers in this body:** readSession, adminHeaders, useState, useCallback, async, setLoading, setError, all, listAdminOrders, getDashboard, listAdminProducts, Error, setOrders, json, setDashboard, setProducts, useEffect, load, setMessage, setPendingStatus, updateOrderStatus, FormData, assignDelivery, get, confirmOrderPayment, adjustStock, updateProduct, deactivateProduct, saveAdminSettings
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (6), catch (8), throw (8), finally (2)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
