# AdminReportsController.AuditLog

- **Identity:** `AdminReportsController.AuditLog` in `backend/OMStationary.Api/Controllers/AdminReportsController.cs`.
- **Purpose (simple Hinglish):** Matching data ko list/report ke roop mein lana hai; exact query, paging aur role scope source mein defined hai.
- **Inputs:** `public async Task<IActionResult> AuditLog([FromQuery] int take = 100)`
- **Flow:** Calls/framework operations identified: OrderByDescending, Take, Select, Where, ToListAsync, Ok | Observed return paths: Ok(rows)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Ok(rows)
- **Dependencies/calls:** OrderByDescending, Take, Select, Where, ToListAsync, Ok
- **Endpoint:** HTTP attribute [HttpGet("audit-log")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

