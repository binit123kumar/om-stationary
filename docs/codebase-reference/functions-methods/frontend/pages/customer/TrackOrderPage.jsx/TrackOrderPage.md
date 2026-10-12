# TrackOrderPage (exported)

**Source identity:** `frontend/src/pages/customer/TrackOrderPage.jsx`, declaration at line 14  
**Declaration kind:** function declaration  
**Module report:** [TrackOrderPage.md](../../../../../pages/customer/TrackOrderPage.md)

## Signature and responsibility

- **Name:** `TrackOrderPage` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `TrackOrderPage` UI render karta hai; body has 4 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 4 explicit return statement(s) identified.
- **Return at source:** `L30: <div className="catalog-state">Loading order…</div>`
- **Return at source:** `L33: ( <div className="empty"> <PackageCheck size={44} /> <h1>Order lookup</h1> <p>{error}</p> <Link className="btn" to="/orders">Try another order</Link> </div> )`
- **Return at source:** `L44: ( <div className="empty"> <PackageCheck size={44} /> <h1>Order not found</h1> <Link className="btn" to="/orders">Go to orders</Link> </div> )`
- **Return at source:** ``L55: ( <> <div className="pagehead"> <small>ORDER TRACKING</small> <h1>Order {order.orderNumber}</h1> <p> Placed {new Date(order.createdAt).toLocaleString()} {order.requestedDeliveryDate && ` · ${pickup ? 'Pickup' : 'Delivery``
- **Direct call identifiers in this body:** useParams, usePickupLocation, useOrderLookup, useEffect, readTrackingToken, async, getOrderByNumber, setOrder, json, Date, toLocaleString
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** No direct named/default-import caller found in scoped files; JSX route references, re-exports, and dynamic calls may be missed.

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
