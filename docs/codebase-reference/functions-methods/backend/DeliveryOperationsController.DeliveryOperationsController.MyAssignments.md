# DeliveryOperationsController.MyAssignments

- **Identity:** `DeliveryOperationsController.MyAssignments` in `backend/OMStationary.Api/Controllers/DeliveryOperationsController.cs`.
- **Purpose (simple Hinglish):** Matching data ko list/report ke roop mein lana hai; exact query, paging aur role scope source mein defined hai.
- **Inputs:** `public async Task<IActionResult> MyAssignments()`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, Where, Select, FirstOrDefaultAsync, NotFound, OrderByDescending, ToListAsync, Ok | Observed return paths: Unauthorized(); NotFound(); Ok(rows)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); NotFound(); Ok(rows)
- **Dependencies/calls:** Unauthorized, Where, Select, FirstOrDefaultAsync, NotFound, OrderByDescending, ToListAsync, Ok
- **Endpoint:** HTTP attribute [Authorize(Roles = "DeliveryPartner"), HttpGet("assignments")]; controller route [ApiController, Route("api/delivery")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [Authorize(Roles = "DeliveryPartner"), HttpGet("assignments")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

