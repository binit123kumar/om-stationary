# DeliveryOperationsController.AllAssignments

- **Identity:** `DeliveryOperationsController.AllAssignments` in `backend/OMStationary.Api/Controllers/DeliveryOperationsController.cs`.
- **Source implementation:** [`DeliveryOperationsController.cs`](../../../../backend/OMStationary.Api/Controllers/DeliveryOperationsController.cs).
- **Purpose (simple Hinglish):** Matching data ko list/report ke roop mein lana hai; exact query, paging aur role scope source mein defined hai.
- **Inputs:** `public async Task<IActionResult> AllAssignments()`
- **Flow:** Calls/framework operations identified: Ok, OrderByDescending, Select, Where, ToListAsync
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: No return expression parsed (void/iterator/body parser limitation possible).
- **Dependencies/calls:** Ok, OrderByDescending, Select, Where, ToListAsync
- **Endpoint:** HTTP attribute [Authorize(Roles = "Admin"), HttpGet("management/assignments")]; controller route [ApiController, Route("api/delivery")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [Authorize(Roles = "Admin"), HttpGet("management/assignments")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


