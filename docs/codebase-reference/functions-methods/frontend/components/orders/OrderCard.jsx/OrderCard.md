# OrderCard (exported)

**Source identity:** `frontend/src/components/orders/OrderCard.jsx`, declaration at line 8  
**Declaration kind:** function declaration  
**Module report:** [OrderCard.md](../../../../../components/orders/OrderCard.md)

## Signature and responsibility

- **Name:** `OrderCard` (exported).
- **Parameters:** `{ order }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `OrderCard` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L9: ( <Link className="recent-order" to={'/track/' + encodeURIComponent(order.orderNumber)}> <div> <b>{order.orderNumber}</b> <span> <OrderStatusBadge status={order.status} /> {' · '}{formatDate(order.createdAt)} </span> </d`
- **Direct call identifiers in this body:** encodeURIComponent, formatDate, rupeesShort
- **Effects visible in this body:** No network, browser-storage, state-update, navigation, or browser-global marker identified.
- **Error-flow markers visible in this body:** No explicit try/catch/throw/finally marker identified.
- **Verified static import callers:** components/orders/OrderList.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
