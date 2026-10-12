# useDeliveryAssignments (exported)

**Source identity:** `frontend/src/hooks/useDelivery.js`, declaration at line 32  
**Declaration kind:** function declaration  
**Module report:** [useDelivery.md](../../../../hooks-context/hooks/useDelivery.md)

## Signature and responsibility

- **Name:** `useDeliveryAssignments` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Hook-shaped function. Hinglish: `useDeliveryAssignments` application values/hook state ko compose karta hai; direct body calls are useState, async, getMyAssignments, setError, setAssignments, isArray, useEffect, reload, updateAssignmentStatus.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L41: (bare return)`
- **Return at source:** `L58: (bare return)`
- **Return at source:** `L62: { assignments, error, reload, changeStatus }`
- **Direct call identifiers in this body:** useState, async, getMyAssignments, setError, setAssignments, isArray, useEffect, reload, updateAssignmentStatus
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** try (2), catch (2)
- **Verified static import callers:** pages/delivery/AssignedDeliveriesPage.jsx, pages/delivery/DeliveryDashboardPage.jsx, pages/delivery/DeliveryDetailPage.jsx, pages/delivery/DeliveryHistoryPage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
