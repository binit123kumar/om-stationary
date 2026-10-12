# AuthController.Login

- **Identity:** `AuthController.Login` in `backend/OMStationary.Api/Controllers/AuthController.cs`.
- **Source implementation:** [`AuthController.cs`](../../../../backend/OMStationary.Api/Controllers/AuthController.cs).
- **Purpose (simple Hinglish):** `Login` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Login(LoginRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: BadRequest, FirstOrDefaultAsync, Unauthorized | Observed return paths: BadRequest(new { detail = "Enter a valid email address or 10 digit mobile number." }); Unauthorized(new { detail = "Email or mobile number, and password are incorrect." }); await CreateSession(user)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest(new { detail = "Enter a valid email address or 10 digit mobile number." }); Unauthorized(new { detail = "Email or mobile number, and password are incorrect." }); await CreateSession(user)
- **Dependencies/calls:** BadRequest, FirstOrDefaultAsync, Unauthorized
- **Endpoint:** HTTP attribute [HttpPost("login"), EnableRateLimiting("order-writes")]; controller route [Route("api/auth")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


