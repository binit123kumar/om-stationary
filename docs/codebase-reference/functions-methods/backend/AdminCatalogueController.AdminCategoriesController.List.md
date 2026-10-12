# AdminCategoriesController.List

- **Identity:** `AdminCategoriesController.List` in `backend/OMStationary.Api/Controllers/AdminCatalogueController.cs`.
- **Purpose (simple Hinglish):** Matching data ko list/report ke roop mein lana hai; exact query, paging aur role scope source mein defined hai.
- **Inputs:** `public async Task<IActionResult> List()`
- **Flow:** Calls/framework operations identified: Ok, OrderBy, Select, ToListAsync
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: No return expression parsed (void/iterator/body parser limitation possible).
- **Dependencies/calls:** Ok, OrderBy, Select, ToListAsync
- **Endpoint:** HTTP attribute [HttpGet]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/categories")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/categories")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

