# AdminOrdersController.Detail

- **Identity:** `AdminOrdersController.Detail` in `backend/OMStationary.Api/Controllers/AdminCatalogueController.cs`.
- **Source implementation:** [`AdminCatalogueController.cs`](../../../../backend/OMStationary.Api/Controllers/AdminCatalogueController.cs).
- **Purpose (simple Hinglish):** `Detail` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Detail(int id)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Include, FirstOrDefaultAsync, NotFound, Where, OrderByDescending, Select, ToListAsync, NextStatuses, Ok, OrderBy, CanTransition | Observed return paths: NotFound(new { detail = "That order was not found." }); Ok(new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(new { detail = "That order was not found." }); Ok(new
- **Dependencies/calls:** Include, FirstOrDefaultAsync, NotFound, Where, OrderByDescending, Select, ToListAsync, NextStatuses, Ok, OrderBy, CanTransition
- **Endpoint:** HTTP attribute [HttpGet("{id:int}")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/orders")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/orders")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


