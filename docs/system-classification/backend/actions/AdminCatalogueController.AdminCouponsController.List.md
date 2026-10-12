# AdminCouponsController.List

- **Identity:** `AdminCouponsController.List` in `backend/OMStationary.Api/Controllers/AdminCatalogueController.cs`.
- **Source implementation:** [`AdminCatalogueController.cs`](../../../../backend/OMStationary.Api/Controllers/AdminCatalogueController.cs).
- **Purpose (simple Hinglish):** Matching data ko list/report ke roop mein lana hai; exact query, paging aur role scope source mein defined hai.
- **Inputs:** `public async Task<IActionResult> List()`
- **Flow:** Calls/framework operations identified: OrderByDescending, ToListAsync, Ok, Select | Observed return paths: Ok(rows.Select(x => new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Ok(rows.Select(x => new
- **Dependencies/calls:** OrderByDescending, ToListAsync, Ok, Select
- **Endpoint:** HTTP attribute [HttpGet]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/coupons")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/coupons")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


