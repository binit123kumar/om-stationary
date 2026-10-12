# AdminWhatsAppController.Status

- **Identity:** `AdminWhatsAppController.Status` in `backend/OMStationary.Api/Controllers/AdminWhatsAppController.cs`.
- **Source implementation:** [`AdminWhatsAppController.cs`](../../../../backend/OMStationary.Api/Controllers/AdminWhatsAppController.cs).
- **Purpose (simple Hinglish):** `Status` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Status([FromQuery] string? type = null, [FromQuery] string? logStatus = null,
        [FromQuery] int take = 50, CancellationToken cancellationToken = default)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Where, OrderByDescending, Take, Select, ToListAsync, Ok, Normalise, CountAsync | Observed return paths: Ok(new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Ok(new
- **Dependencies/calls:** Where, OrderByDescending, Take, Select, ToListAsync, Ok, Normalise, CountAsync
- **Endpoint:** HTTP attribute [HttpGet]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/whatsapp")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/whatsapp")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


