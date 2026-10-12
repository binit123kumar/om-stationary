# PartnerController.Shops

- **Identity:** `PartnerController.Shops` in `backend/OMStationary.Api/Controllers/PartnerController.cs`.
- **Purpose (simple Hinglish):** Matching data ko list/report ke roop mein lana hai; exact query, paging aur role scope source mein defined hai.
- **Inputs:** `public async Task<IActionResult> Shops()`
- **Flow:** Calls/framework operations identified: Ok, OrderByDescending, Select, ToListAsync | Observed return paths: Ok(await db.PartnerShops.AsNoTracking().OrderByDescending(x => x.Id).Select(x => new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Ok(await db.PartnerShops.AsNoTracking().OrderByDescending(x => x.Id).Select(x => new
- **Dependencies/calls:** Ok, OrderByDescending, Select, ToListAsync
- **Endpoint:** HTTP attribute [Authorize(Roles = "Admin"), HttpGet("shops")]; controller route [ApiController, Route("api/partner")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [Authorize(Roles = "Admin"), HttpGet("shops")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

