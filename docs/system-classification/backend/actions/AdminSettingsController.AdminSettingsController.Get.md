# AdminSettingsController.Get

- **Identity:** `AdminSettingsController.Get` in `backend/OMStationary.Api/Controllers/AdminSettingsController.cs`.
- **Source implementation:** [`AdminSettingsController.cs`](../../../../backend/OMStationary.Api/Controllers/AdminSettingsController.cs).
- **Purpose (simple Hinglish):** Reads the effective store configuration and its database overrides, then returns store, billing, pickup, delivery, and non-secret payment status fields. Locals are named `effectiveSettings` and `settingsOverrides` to distinguish the merged configuration from editable override values.
- **Inputs:** `public async Task<IActionResult> Get(CancellationToken cancellationToken)`
- **Flow:** Calls/framework operations identified: GetAsync, Ok | Observed return paths: Ok(new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Ok(new
- **Dependencies/calls:** GetAsync, Ok
- **Endpoint:** HTTP attribute [HttpGet]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/settings")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/settings")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

