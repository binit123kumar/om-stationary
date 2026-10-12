# AuthController.Refresh

- **Identity:** `AuthController.Refresh` in `backend/OMStationary.Api/Controllers/AuthController.cs`.
- **Purpose (simple Hinglish):** `Refresh` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Refresh(RefreshRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: FirstOrDefaultAsync, Unauthorized | Observed return paths: Unauthorized(new { detail = "Refresh token is invalid or expired." }); Unauthorized(); await CreateSession(user)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(new { detail = "Refresh token is invalid or expired." }); Unauthorized(); await CreateSession(user)
- **Dependencies/calls:** FirstOrDefaultAsync, Unauthorized
- **Endpoint:** HTTP attribute [HttpPost("refresh"), EnableRateLimiting("order-writes")]; controller route [Route("api/auth")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

