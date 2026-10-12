# AdminCategoriesController.Update

- **Identity:** `AdminCategoriesController.Update` in `backend/OMStationary.Api/Controllers/AdminCatalogueController.cs`.
- **Source implementation:** [`AdminCatalogueController.cs`](../../../../backend/OMStationary.Api/Controllers/AdminCatalogueController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Update(int id, [FromBody] CategoryWriteRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: NotFound, BadRequest, AnyAsync, Conflict, Where, ExecuteUpdateAsync, Add, SaveChangesAsync, Ok, CountAsync | Observed return paths: NotFound(new { detail = "That category was not found." }); BadRequest(new { detail = "Category name is required." }); Conflict(new { detail = "Another category already uses that name." }); Ok(new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(new { detail = "That category was not found." }); BadRequest(new { detail = "Category name is required." }); Conflict(new { detail = "Another category already uses that name." }); Ok(new
- **Dependencies/calls:** NotFound, BadRequest, AnyAsync, Conflict, Where, ExecuteUpdateAsync, Add, SaveChangesAsync, Ok, CountAsync
- **Endpoint:** HTTP attribute [HttpPut("{id:int}")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/categories")]
- **Data/external effects:** Add row(s) in AuditLogs, persist EF changes via SaveChanges, set-based database mutation
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/categories")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


