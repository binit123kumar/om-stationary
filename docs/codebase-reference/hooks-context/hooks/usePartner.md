# usePartner.js

**Source:** `frontend/src/hooks/usePartner.js`  
**Classification:** Hook / utility source

## Source-grounded summary

**Purpose:** usePartner is a React hook module identified by source path. Exports and callers are statically indexed; runtime behavior is not asserted.

## Declarations and dependencies

- Exports: usePartner
- Named function-like declarations: usePartner
- Direct local imports: getPartnerInventory, getPartnerOrders, getPartnerShop, updatePartnerInventory, updatePartnerOrderStatus -> services/partnerService.js
- Direct static consumers (impact): pages/partner/PartnerDashboardPage.jsx, pages/partner/PartnerInventoryPage.jsx, pages/partner/PartnerOrderDetailPage.jsx, pages/partner/PartnerOrdersPage.jsx, pages/partner/PartnerProductsPage.jsx, pages/partner/PartnerProfilePage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: usePartner, useState, useCallback, async, all, getPartnerShop, getPartnerInventory, getPartnerOrders, setShop, json, setInventory, setOrders, every, setError, useEffect, load, updatePartnerInventory, updatePartnerOrderStatus
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: None found directly.
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../../functions-methods/frontend/hooks/usePartner.js/_index.md) for one report per statically identified named declaration in this source file.
