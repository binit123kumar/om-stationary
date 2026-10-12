# Partner-shop flow

## Flow chain

| Layer | Source-supported behavior |
|---|---|
| Route/page | Partner role routes `/partner`, `/partner/inventory`, `/partner/orders`, `/partner/profile`, `/partner/products`, and `/partner/orders/:id` map to dashboard/inventory/order/profile/product/detail pages, each guarded for `PartnerShop`. Admin approval UI is `/admin/partners`. |
| Handler/state | Partner pages load shop/profile, inventory, orders, and order detail; partner order actions request status changes. Admin partner page lists shops and updates approval. |
| Service | `partnerService` wraps portal operations; `adminService.listPartnerShops` and `setPartnerShopApproval` implement admin approval. |
| HTTP contract | Partner: `POST /api/partner/register`; `GET/PUT /api/partner/shop`; `GET/PUT /api/partner/inventory`; `GET /api/partner/orders`; `PATCH /api/partner/orders/{id}/status`. Admin: `GET /api/partner/shops`; `PUT /api/partner/shops/{id}/approval`. |
| Backend | `PartnerController.Register` creates partner account/shop registration; role-guarded handlers read/update the signed-in shop's profile, stock, and order queue/status. Admin-only shop list/approval handles review. Fulfilment selection uses partner-shop inventory when matching requested product IDs and stock. |
| Data | `PartnerShop` → `PartnerShops`; `ShopProduct` → `ShopProducts`; user/role data → `Users`/`Roles`; order processing reads/writes `Orders`, `OrderItems`, and status-history rows. |

## Response and error path

Partner operations are scoped to the current user/shop and role; access failures are rejected by API authorization. Registration validation/duplicate account paths return client-visible errors. Shop approval is independent of portal access and requires Admin. A partner's available stock/price is represented through `ShopProduct`; the product catalogue `Product.Stock` remains a different inventory value. Order updates are constrained by backend state rules.

## Tests and status

- **Tests:** No partner controller or UI integration tests were found (**NOT_MAPPED**).
- **Source status:** **Confirmed** from [App.jsx](../../../frontend/src/App.jsx), [RouteView.jsx](../../../frontend/src/RouteView.jsx), [partnerService.js](../../../frontend/src/services/partnerService.js), [adminService.js](../../../frontend/src/services/adminService.js), [PartnerController.cs](../../../backend/OMStationary.Api/Controllers/PartnerController.cs), [FulfillmentSelection.cs](../../../backend/OMStationary.Api/Services/FulfillmentSelection.cs), and [OmDbContext.cs](../../../backend/OMStationary.Api/Data/OmDbContext.cs).
- **Runtime status:** **Unverified.** No partner authentication, approval state, inventory mutation, or order fulfillment was executed.
