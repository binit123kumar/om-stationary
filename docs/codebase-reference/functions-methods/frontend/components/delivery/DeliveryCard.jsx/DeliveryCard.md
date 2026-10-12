# DeliveryCard (exported)

**Source identity:** `frontend/src/components/delivery/DeliveryCard.jsx`, declaration at line 26  
**Declaration kind:** function declaration  
**Module report:** [DeliveryCard.md](../../../../../components/delivery/DeliveryCard.md)

## Signature and responsibility

- **Name:** `DeliveryCard` (exported).
- **Parameters:** `{ delivery, onStatus }`
- **Simple Hinglish responsibility:** React component-shaped function. Hinglish: `DeliveryCard` UI render karta hai; body has 1 return statement(s) and JSX is documented in the linked module report.

## Source flow and effects

- **Flow / return:** 1 explicit return statement(s) identified.
- **Return at source:** `L39: ( <article className="panel delivery-card"> <h2>{delivery.orderNumber} · {delivery.status}</h2> <p>Pickup: {delivery.pickupAddress}</p> <p>Drop: {delivery.dropAddress}</p> <p>Customer: {delivery.customerName} · {delivery`
- **Direct call identifiers in this body:** useState, async, setBusy, onStatus, rupees, map, run
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (1), finally (1)
- **Verified static import callers:** pages/delivery/AssignedDeliveriesPage.jsx, pages/delivery/DeliveryDashboardPage.jsx, pages/delivery/DeliveryDetailPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
