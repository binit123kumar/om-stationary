# AdminController.DeactivateProduct

- **Identity:** `AdminController.DeactivateProduct` in `backend/OMStationary.Api/Controllers/AdminController.cs`.
- **Source implementation:** [`AdminController.cs`](../../../../backend/OMStationary.Api/Controllers/AdminController.cs).
- **Purpose (simple Hinglish):** `DeactivateProduct` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> DeactivateProduct(int id)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: NotFound, Add, SaveChangesAsync | Observed return paths: NotFound(); NoContent()
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(); NoContent()
- **Dependencies/calls:** NotFound, Add, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpDelete("products/{id:int}")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Data/external effects:** Add row(s) in AuditLogs, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


