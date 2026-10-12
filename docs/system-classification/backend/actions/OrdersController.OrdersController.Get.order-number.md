# OrdersController.Get(orderNumber)

- **Source implementation:** [`OrdersController.cs`](../../../../backend/OMStationary.Api/Controllers/OrdersController.cs), `Get(string orderNumber)`.
- **Route / verb:** `GET /api/orders/{orderNumber}`.
- **Authorization:** No `[Authorize]` attribute. The body checks `MayViewOrder(order)` and returns `NotFound()` when the order is missing or the caller is not permitted. The helper allows the owning customer, Admin, or a matching tracking token; for legacy rows without a tracking-token hash it treats the opaque order number as the capability.
- **Inputs / DTO:** `string orderNumber` route parameter; no body DTO.
- **Calls and data access:** Reads `Orders` with `AsNoTracking`, includes `Items` and `StatusHistory`, queries by order number, calls `MayViewOrder`, and projects order, item, and chronological status-history fields.
- **Response branches:** `404` for missing/unauthorized-to-view orders; `200` via `Ok(...)` for an order the caller may view.
- **Data effects:** Read-only EF query; no persistence mutation in this action.
- **Rate limit:** Source attribute applies `EnableRateLimiting("tracking-reads")`.
- **Test status:** **NOT TESTED** for this documentation task.
