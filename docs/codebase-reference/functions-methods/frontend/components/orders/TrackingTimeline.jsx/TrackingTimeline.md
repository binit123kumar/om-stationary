# TrackingTimeline (exported)

**Source identity:** `frontend/src/components/orders/TrackingTimeline.jsx`, declaration at line 14  
**Declaration kind:** function declaration  
**Module report:** [TrackingTimeline.md](../../../../../components/orders/TrackingTimeline.md)

## Signature and responsibility

- **Name:** `TrackingTimeline` (exported).
- **Parameters:** `{ order, onOrderRefresh }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `TrackingTimeline` UI render karta hai; body has 7 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 7 explicit return statement(s) identified.
- **Return at source:** `L25: (bare return)`
- **Return at source:** `L33: (bare return)`
- **Return at source:** `L39: (bare return)`
- **Return at source:** `L43: (bare return)`
- **Return at source:** `L47: (bare return)`
- **Return at source:** `L51: (bare return)`
- **Return at source:** `L61: ( <section className="track"> <div className="tracking-current"> <OrderStatusBadge status={order.status} /> <p>{pickup ? 'Your order will be collected from OM Stationary.' : 'Your order is with the verified local deliver`
- **Direct call identifiers in this body:** useState, String, toLowerCase, async, setVerifying, setPayState, verifyPayment, readTrackingToken, json, onOrderRefresh, map, rupees, Number, paymentLabel
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), catch (2), finally (1)
- **Verified static import callers:** pages/customer/TrackOrderPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
