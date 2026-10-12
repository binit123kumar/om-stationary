# partnerService service

## Source identity

- Source: [frontend/src/services/partnerService.js](../../../frontend/src/services/partnerService.js)
- Classification: frontend service module under frontend/src/services.
- Exported declarations detected: getPartnerShop, updatePartnerShop, getPartnerInventory, updatePartnerInventory, getPartnerOrders, updatePartnerOrderStatus, registerPartnerShop.
- Important function exports, signatures, and adjacent source comments:
- **getPartnerShop()** — No directly preceding source comment.
- **updatePartnerShop(shop)** — No directly preceding source comment.
- **getPartnerInventory()** — No directly preceding source comment.
- **updatePartnerInventory(entry)** — No directly preceding source comment.
- **getPartnerOrders()** — No directly preceding source comment.
- **updatePartnerOrderStatus(id, status)** — No directly preceding source comment.
- **registerPartnerShop(payload)** — No directly preceding source comment.

## HTTP call expressions detected
- GET/DEFAULT via apiFetch; path expression: /api/partner/shop.
- PUT via apiFetch; path expression: /api/partner/shop.
- GET/DEFAULT via apiFetch; path expression: /api/partner/inventory.
- PUT via apiFetch; path expression: /api/partner/inventory.
- GET/DEFAULT via apiFetch; path expression: /api/partner/orders.
- PATCH via apiFetch; path expression: /api/partner/orders/${encodeURIComponent(id)}/status.
- POST via apiFetch; path expression: /api/partner/register.

## Local dependencies

- apiFetch from frontend/src/services/api.js.

## Backend mapping and runtime status

The listed expressions are frontend source call sites; method labels use a static scan of the nearby options object and otherwise say GET/default. They are not observed network traffic. No backend route/action mapping is asserted in this report, and response behavior or availability is not runtime-verified.
