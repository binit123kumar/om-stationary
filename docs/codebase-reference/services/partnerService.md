# partnerService.js

**Source:** `frontend/src/services/partnerService.js`  
**Classification:** Service module

## Source-grounded summary

**Purpose:** partnerService is the service-layer module identified by its source path. API paths and methods are listed only when their literals/options occur in this module; delegated client behavior is called out separately.

## API surface

- API endpoint path literals: /api/partner/shop, /api/partner/inventory, /api/partner/orders, /api/partner/register
- Explicit HTTP methods: PUT, PATCH, POST
- API client/import boundary: apiFetch -> services/api.js

## Declarations and dependencies

- Exports: getPartnerShop, updatePartnerShop, getPartnerInventory, updatePartnerInventory, getPartnerOrders, updatePartnerOrderStatus, registerPartnerShop
- Named function-like declarations: getPartnerShop, updatePartnerShop, getPartnerInventory, updatePartnerInventory, getPartnerOrders, updatePartnerOrderStatus, registerPartnerShop
- Direct local imports: apiFetch -> services/api.js
- Direct static consumers (impact): hooks/usePartner.js, pages/partner/PartnerProfilePage.jsx

## Behavior, errors, security, and maintenance

- Statically observed calls: getPartnerShop, apiFetch, updatePartnerShop, stringify, getPartnerInventory, json, updatePartnerInventory, getPartnerOrders, updatePartnerOrderStatus, encodeURIComponent, registerPartnerShop
- Error/control-flow markers: No explicit try/throw/finally token found.
- Browser storage / network / navigation markers: network call
- External service/backend behavior is source-derived only; API/backend/data integration is **not runtime-verified**.
- Maintenance boundary: update this module in its existing source role; route wiring lives in App.jsx + RouteView.jsx, shared state in AppShell/hooks, remote calls in services. (The last clauses indicate repository boundaries, not proof of runtime behavior.)
- Tests: No frontend *.test.* or *.spec.* files were found in the inspected frontend tree.


## Function/method details

See the [per-declaration index](../functions-methods/frontend/services/partnerService.js/_index.md) for one report per statically identified named declaration in this source file.
