# AdminReportsController.Customers

- **Identity:** `AdminReportsController.Customers` in `backend/OMStationary.Api/Controllers/AdminReportsController.cs`.
- **Source implementation:** [`AdminReportsController.cs`](../../../../backend/OMStationary.Api/Controllers/AdminReportsController.cs).
- **Purpose (simple Hinglish):** Matching data ko list/report ke roop mein lana hai; exact query, paging aur role scope source mein defined hai.
- **Inputs:** `public async Task<IActionResult> Customers([FromQuery] string? q = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 25)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Where, CountAsync, OrderByDescending, Skip, Take, Select, ToListAsync, Ok | Observed return paths: Ok(new { total, page, pageSize, items = users })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Ok(new { total, page, pageSize, items = users })
- **Dependencies/calls:** Where, CountAsync, OrderByDescending, Skip, Take, Select, ToListAsync, Ok
- **Endpoint:** HTTP attribute [HttpGet("customers")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


