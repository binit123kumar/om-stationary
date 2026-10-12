# ProductsController.Get(catalog query)

- **Source implementation:** [`ProductsController.cs`](../../../../backend/OMStationary.Api/Controllers/ProductsController.cs), `Get(...)` with catalog filters.
- **Route / verb:** `GET /api/products`.
- **Authorization:** No controller/action `[Authorize]` attribute is declared; this route is source-public.
- **Inputs / DTO:** Query parameters `q`, `category`, `sort`, `brand`, `sku`, `minPrice`, `maxPrice`, `available`, `page` (default 1), `pageSize` (default 24), and `paginated` (default false). No request-body DTO.
- **Calls and data access:** Starts from active `Products.AsNoTracking()`; conditionally filters name/category/brand/SKU/price/stock; sorts by price or name; validates page bounds; executes `Take`, `CountAsync`, `Skip`, `Take`, and `ToListAsync`.
- **Response branches:** `400 BadRequest` if page is below 1, page size below 1, or page size above 100. Otherwise `200 Ok`; the no-filter default request preserves the legacy list response (maximum 100), while other requests return a page object.
- **Data effects:** Read-only EF query; no persistence mutation in this action.
- **Test status:** **NOT TESTED** for this documentation task.

