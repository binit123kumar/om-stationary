# AdminCategoriesController.Create

- **Identity:** `AdminCategoriesController.Create` in `backend/OMStationary.Api/Controllers/AdminCatalogueController.cs`.
- **Purpose (simple Hinglish):** Request ya input se naya record/resource create karna hai; validation, persistence aur result source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Create([FromBody] CategoryWriteRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: BadRequest, AnyAsync, Conflict, Add, SaveChangesAsync | Observed return paths: BadRequest(new { detail = "Category name is required." }); Conflict(new { detail = "That category already exists." }); Created($"/api/admin/categories/{category.Id}", new { category.Id, category.Name, category.IsActive, ProductCount = 0, ActiveProductCount = 0 })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest(new { detail = "Category name is required." }); Conflict(new { detail = "That category already exists." }); Created($"/api/admin/categories/{category.Id}", new { category.Id, category.Name, category.IsActive, ProductCount = 0, ActiveProductCount = 0 })
- **Dependencies/calls:** BadRequest, AnyAsync, Conflict, Add, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPost]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/categories")]
- **Data/external effects:** Add row(s) in AuditLogs, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/categories")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

