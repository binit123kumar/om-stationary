# AdminOrderDetailPage (exported)

**Source identity:** `frontend/src/pages/admin/AdminOrderDetailPage.jsx`, declaration at line 22  
**Declaration kind:** function declaration  
**Module report:** [AdminOrderDetailPage.md](../../../../../pages/admin/AdminOrderDetailPage.md)

## Signature and responsibility

- **Name:** `AdminOrderDetailPage` (exported).
- **Parameters:** `{ user, key, onLogout }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `AdminOrderDetailPage` UI render karta hai; body has 3 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L102: <AdminLayout user={user} onLogout={onLogout}><p className="catalog-state">Loading order...</p></AdminLayout>`
- **Return at source:** `L105: ( <AdminLayout user={user} onLogout={onLogout}> <div className="empty"> <h1>Order unavailable</h1> <p>{error || 'This order could not be loaded.'}</p> <Link className="btn" to="/admin/orders">Back to orders</Link> </div>`
- **Return at source:** `L120: ( <AdminLayout user={user} onLogout={onLogout}> <div className="pagehead"> <small>ADMIN PANEL</small> <h1>Order {order.orderNumber}</h1> <p>Placed {formatDateTime(order.createdAt)}</p> <Link className="outline" to="/admi`
- **Direct call identifiers in this body:** useParams, adminHeaders, readSession, useState, useCallback, async, setLoading, setError, getAdminOrder, Error, setOrder, useEffect, load, setMessage, setPendingStatus, updateOrderStatus, json, preventDefault, setAssignBusy, FormData, assignDelivery, get, setAssignOpen, confirmOrderPayment, isArray, String, toLowerCase, formatDateTime, rupees, map
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (4), catch (5), throw (4), finally (2)
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
