# usePartner (exported)

**Source identity:** `frontend/src/hooks/usePartner.js`, declaration at line 11  
**Declaration kind:** function declaration  
**Module report:** [usePartner.md](../../../../hooks-context/hooks/usePartner.md)

## Signature and responsibility

- **Name:** `usePartner` (exported).
- **Parameters:** `(none)`
- **Simple Hinglish responsibility:** Hook-shaped function. Hinglish: `usePartner` application values/hook state ko compose karta hai; direct body calls are useState, useCallback, async, all, getPartnerShop, getPartnerInventory, getPartnerOrders, setShop, json, setInventory, setOrders, every, setError, useEffect, load, updatePartnerInventory, updatePartnerOrderStatus.

## Source flow and effects

- **Flow / return:** 3 explicit return statement(s) identified.
- **Return at source:** `L36: (bare return)`
- **Return at source:** `L46: (bare return)`
- **Return at source:** `L51: { shop, inventory, orders, error, reload: load, saveInventory, changeOrderStatus }`
- **Direct call identifiers in this body:** useState, useCallback, async, all, getPartnerShop, getPartnerInventory, getPartnerOrders, setShop, json, setInventory, setOrders, every, setError, useEffect, load, updatePartnerInventory, updatePartnerOrderStatus
- **Effects visible in this body:** state update or dispatch
- **Error-flow markers visible in this body:** catch (2)
- **Verified static import callers:** pages/partner/PartnerDashboardPage.jsx, pages/partner/PartnerInventoryPage.jsx, pages/partner/PartnerOrderDetailPage.jsx, pages/partner/PartnerOrdersPage.jsx, pages/partner/PartnerProductsPage.jsx, pages/partner/PartnerProfilePage.jsx

## Lexical limitations

One named declaration, identified by lexical source scan. Line/return/call markers are static source readings, not an AST or control-flow proof. Complex syntax, JSX, template literals, nested callbacks, comments and regex literals can affect extraction. Anonymous arrow callbacks are listed in the per-source index, not analyzed as separate named reports. API/backend/data behavior is **not runtime-verified**.
