# PartnerController.Orders

- **Identity:** `PartnerController.Orders` in `backend/OMStationary.Api/Controllers/PartnerController.cs`.
- **Purpose (simple Hinglish):** Matching data ko list/report ke roop mein lana hai; exact query, paging aur role scope source mein defined hai.
- **Inputs:** `public async Task<IActionResult> Orders()`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: NotFound, Ok, Where, OrderByDescending, Select, NextStatuses, ToListAsync | Observed return paths: NotFound("No partner shop is linked to this account yet."); Ok(await db.Orders.AsNoTracking()
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound("No partner shop is linked to this account yet."); Ok(await db.Orders.AsNoTracking()
- **Dependencies/calls:** NotFound, Ok, Where, OrderByDescending, Select, NextStatuses, ToListAsync
- **Endpoint:** HTTP attribute [Authorize(Roles = "PartnerShop"), HttpGet("orders")]; controller route [ApiController, Route("api/partner")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [Authorize(Roles = "PartnerShop"), HttpGet("orders")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

