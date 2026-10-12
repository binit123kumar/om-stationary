# AuthController.Me

- **Identity:** `AuthController.Me` in `backend/OMStationary.Api/Controllers/AuthController.cs`.
- **Source implementation:** [`AuthController.cs`](../../../../backend/OMStationary.Api/Controllers/AuthController.cs).
- **Purpose (simple Hinglish):** `Me` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Me()`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, Where, Select, FirstOrDefaultAsync, Ok | Observed return paths: Unauthorized(); user is null ? Unauthorized() : Ok(user)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); user is null ? Unauthorized() : Ok(user)
- **Dependencies/calls:** Unauthorized, Where, Select, FirstOrDefaultAsync, Ok
- **Endpoint:** HTTP attribute [Authorize, HttpGet("me")]; controller route [Route("api/auth")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [Authorize, HttpGet("me")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


