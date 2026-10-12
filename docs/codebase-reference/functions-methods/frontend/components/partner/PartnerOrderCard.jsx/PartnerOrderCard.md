# PartnerOrderCard (exported)

**Source identity:** `frontend/src/components/partner/PartnerOrderCard.jsx`, declaration at line 10  
**Declaration kind:** function declaration  
**Module report:** [PartnerOrderCard.md](../../../../../components/partner/PartnerOrderCard.md)

## Signature and responsibility

- **Name:** `PartnerOrderCard` (exported).
- **Parameters:** `{ order, onStatus }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `PartnerOrderCard` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L23: ( <article className="partner-order"> <div className="admin-order-head"> <div> <b>{order.orderNumber}</b> <span>{order.customerName} · {order.customerPhone}</span> </div> <div> <b>{rupees(order.totalAmount)}</b> <OrderSt`
- **Direct call identifiers in this body:** useState, async, setBusy, onStatus, isArray, rupees, map, run
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), finally (1)
- **Verified static import callers:** pages/partner/PartnerOrderDetailPage.jsx, pages/partner/PartnerOrdersPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
