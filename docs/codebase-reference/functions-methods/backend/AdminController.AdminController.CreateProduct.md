# AdminController.CreateProduct

- **Identity:** `AdminController.CreateProduct` in `backend/OMStationary.Api/Controllers/AdminController.cs`.
- **Purpose (simple Hinglish):** Request ya input se naya record/resource create karna hai; validation, persistence aur result source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> CreateProduct(ProductWriteRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: BadRequest, AnyAsync, Conflict, Add, SaveChangesAsync | Observed return paths: BadRequest(new { detail = "Product name is required." }); BadRequest(new { detail = "Price cannot be negative." }); BadRequest(new { detail = "Stock cannot be negative." }); Conflict(new { detail = "That SKU is already used by another product." }); Created($"/api/admin/products/{product.Id}", new { product.Id, product.Name, product.Slug })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest(new { detail = "Product name is required." }); BadRequest(new { detail = "Price cannot be negative." }); BadRequest(new { detail = "Stock cannot be negative." }); Conflict(new { detail = "That SKU is already used by another product." }); Created($"/api/admin/products/{product.Id}", new { product.Id, product.Name, product.Slug })
- **Dependencies/calls:** BadRequest, AnyAsync, Conflict, Add, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPost("products")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Data/external effects:** Add row(s) in Products, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

