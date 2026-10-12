# AdminWhatsAppController.Retry

- **Identity:** `AdminWhatsAppController.Retry` in `backend/OMStationary.Api/Controllers/AdminWhatsAppController.cs`.
- **Purpose (simple Hinglish):** Configured notification/delivery work perform ya retry karta hai; provider/config checks source implementation mein hain.
- **Inputs:** `public async Task<IActionResult> Retry(int id, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: FirstOrDefaultAsync, NotFound, BadRequest, Add, SaveChangesAsync, SendAsync, Ok | Observed return paths: NotFound(new { detail = "That notification was not found." }); BadRequest(new { detail = "That notification was already accepted by the provider." }); Ok(new { attempted = result.Attempted, success = result.Success, status = result.Status, error = result.Error })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(new { detail = "That notification was not found." }); BadRequest(new { detail = "That notification was already accepted by the provider." }); Ok(new { attempted = result.Attempted, success = result.Success, status = result.Status, error = result.Error })
- **Dependencies/calls:** FirstOrDefaultAsync, NotFound, BadRequest, Add, SaveChangesAsync, SendAsync, Ok
- **Endpoint:** HTTP attribute [HttpPost("{id:int}/retry")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/whatsapp")]
- **Data/external effects:** Add row(s) in AuditLogs, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/whatsapp")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

