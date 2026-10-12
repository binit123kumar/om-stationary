# OrdersController.Get() — admin order list

- **Source implementation:** [`OrdersController.cs`](../../../../backend/OMStationary.Api/Controllers/OrdersController.cs), `Get()`.
- **Route / verb:** `GET /api/orders`.
- **Authorization:** No `[Authorize]` attribute. The method explicitly checks `IsAdmin()` and returns `AdminRequired()` when false. `AdminRequired()` returns `Problem(..., statusCode: 401)`; verify source before treating it as standard framework authorization behavior.
- **Inputs / DTO:** No action parameters or request DTO.
- **Calls and data access:** `IsAdmin`, `AdminRequired`, `db.Orders.AsNoTracking`, `Include(Items)`, descending `CreatedAt` ordering, projection (including `OrderStateMachine.NextStatuses`), and `ToListAsync`.
- **Response branches:** `401` via `AdminRequired()` when the manual admin check fails; `200` via `Ok(...)` for the projected order list.
- **Data effects:** Read-only EF query; no persistence mutation in this action.
- **Rate limit:** No action-level rate-limit attribute on this route.
- **Test status:** **NOT TESTED** for this documentation task. The source test inventory is not a run result.

