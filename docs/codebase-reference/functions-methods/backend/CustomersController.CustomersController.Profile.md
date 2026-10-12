# CustomersController.Profile

- **Identity:** `CustomersController.Profile` in `backend/OMStationary.Api/Controllers/CustomersController.cs`.
- **Purpose (simple Hinglish):** `Profile` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Profile()`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, Where, Select, FirstOrDefaultAsync, NotFound, Ok | Observed return paths: Unauthorized(); user is null ? NotFound() : Ok(user)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); user is null ? NotFound() : Ok(user)
- **Dependencies/calls:** Unauthorized, Where, Select, FirstOrDefaultAsync, NotFound, Ok
- **Endpoint:** HTTP attribute [HttpGet("me")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

