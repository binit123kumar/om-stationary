# AdminSettingsController.Update

- **Identity:** `AdminSettingsController.Update` in `backend/OMStationary.Api/Controllers/AdminSettingsController.cs`.
- **Source implementation:** [`AdminSettingsController.cs`](../../../../backend/OMStationary.Api/Controllers/AdminSettingsController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Update([FromBody] StoreSettingsWriteRequest request, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Add, BadRequest, Select, Where, SaveChangesAsync | Observed return paths: BadRequest(new { detail = "GST rate must be between 0 and 100." }); BadRequest(new { detail = "Invoice prefix may only contain letters, digits and hyphens." }); BadRequest(new { detail = "Delivery charge cannot be negative." }); BadRequest(new { detail = "Maximum delivery radius must be greater than zero." }); await Get(cancellationToken)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest(new { detail = "GST rate must be between 0 and 100." }); BadRequest(new { detail = "Invoice prefix may only contain letters, digits and hyphens." }); BadRequest(new { detail = "Delivery charge cannot be negative." }); BadRequest(new { detail = "Maximum delivery radius must be greater than zero." }); await Get(cancellationToken)
- **Dependencies/calls:** Add, BadRequest, Select, Where, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPut]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/settings")]
- **Data/external effects:** Add row(s) in AuditLogs, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/settings")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


