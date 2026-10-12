# NotificationsController.MarkRead

- **Identity:** `NotificationsController.MarkRead` in `backend/OMStationary.Api/Controllers/NotificationsController.cs`.
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> MarkRead(int id)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, Where, ExecuteUpdateAsync, NotFound | Observed return paths: Unauthorized(); changed == 1 ? NoContent() : NotFound()
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); changed == 1 ? NoContent() : NotFound()
- **Dependencies/calls:** Unauthorized, Where, ExecuteUpdateAsync, NotFound
- **Endpoint:** HTTP attribute [HttpPost("{id:int}/read")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/notifications")]
- **Data/external effects:** set-based database mutation
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/notifications")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

