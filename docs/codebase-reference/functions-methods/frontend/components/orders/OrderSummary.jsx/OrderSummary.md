# OrderSummary (exported)

**Source identity:** `frontend/src/components/orders/OrderSummary.jsx`, declaration at line 5  
**Declaration kind:** function declaration  
**Module report:** [OrderSummary.md](../../../../../components/orders/OrderSummary.md)

## Signature and responsibility

- **Name:** `OrderSummary` (exported).
- **Parameters:** `{ order }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `OrderSummary` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** ``L12: ( <div className="tracking-totals"> <div className="tracking-item"> <span>Items subtotal</span> <b>{rupees(subtotal)}</b> </div> {discount > 0 && ( <div className="tracking-item"> <span>Discount{order.couponCode ? ` (${o``
- **Direct call identifiers in this body:** Number, rupees
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/orders/TrackingTimeline.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
