# ProductsController.Get(id)

- **Source implementation:** [`ProductsController.cs`](../../../../backend/OMStationary.Api/Controllers/ProductsController.cs), `Get(int id)`.
- **Route / verb:** `GET /api/products/{id:int}`.
- **Authorization:** No controller/action `[Authorize]` attribute is declared; this route is source-public.
- **Inputs / DTO:** `int id` route parameter; no body DTO.
- **Calls and data access:** Reads `Products.AsNoTracking()`, includes images ordered by `SortOrder`, queries an active product by ID using `FirstOrDefaultAsync`, and projects product details, inventory flags, and image URLs.
- **Response branches:** `404 NotFound()` if no active matching product exists; otherwise `200 Ok(...)`.
- **Data effects:** Read-only EF query; no persistence mutation in this action.
- **Test status:** **NOT TESTED** for this documentation task.

