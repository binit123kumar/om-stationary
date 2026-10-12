# AdminController.Products

- **Identity:** `AdminController.Products` in `backend/OMStationary.Api/Controllers/AdminController.cs`.
- **Purpose (simple Hinglish):** Matching data ko list/report ke roop mein lana hai; exact query, paging aur role scope source mein defined hai.
- **Inputs:** `public async Task<IActionResult> Products([FromQuery] int page = 1, [FromQuery] int pageSize = 25, [FromQuery] string? q = null,
        [FromQuery] string? category = null, [FromQuery] bool? active = null,
        [FromQuery] bool lowStockOnly = false, [FromQuery] bool outOfStockOnly = false,
        [FromQuery] decimal? minPrice = null, [FromQuery] decimal? maxPrice = null,
        [FromQuery] string? sort = null)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Where, OrderBy, OrderByDescending, CountAsync, Skip, Take, Select, ToListAsync, Ok | Observed return paths: Ok(new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Ok(new
- **Dependencies/calls:** Where, OrderBy, OrderByDescending, CountAsync, Skip, Take, Select, ToListAsync, Ok
- **Endpoint:** HTTP attribute [HttpGet("products")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

