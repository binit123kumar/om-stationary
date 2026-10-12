# AdminController.Dashboard

- **Identity:** `AdminController.Dashboard` in `backend/OMStationary.Api/Controllers/AdminController.cs`.
- **Purpose (simple Hinglish):** `Dashboard` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Dashboard()`
- **Flow:** Calls/framework operations identified: CountAsync, Where, Ok | Observed return paths: Ok(new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Ok(new
- **Dependencies/calls:** CountAsync, Where, Ok
- **Endpoint:** HTTP attribute [HttpGet("dashboard")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

