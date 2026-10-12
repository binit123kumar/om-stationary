# PartnerController.Register

- **Identity:** `PartnerController.Register` in `backend/OMStationary.Api/Controllers/PartnerController.cs`.
- **Purpose (simple Hinglish):** Request ya input se naya record/resource create karna hai; validation, persistence aur result source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Register([FromBody] CreatePartnerAccountRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: BadRequest, AnyAsync, Conflict, Where, Select, FirstOrDefaultAsync, Add, SaveChangesAsync, StatusCode | Observed return paths: BadRequest(new { detail = "Password must be at least 8 characters long." }); BadRequest(new { detail = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character." }); Conflict(new { detail = "An account already exists for this email or mobile number." }); Conflict(new { detail = "A partner shop already exists for this mobile number." }); Problem("Partner shop accounts are not configured.", statusCode: 503); StatusCode(StatusCodes.Status201Created, new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest(new { detail = "Password must be at least 8 characters long." }); BadRequest(new { detail = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character." }); Conflict(new { detail = "An account already exists for this email or mobile number." }); Conflict(new { detail = "A partner shop already exists for this mobile number." }); Problem("Partner shop accounts are not configured.", statusCode: 503); StatusCode(StatusCodes.Status201Created, new
- **Dependencies/calls:** BadRequest, AnyAsync, Conflict, Where, Select, FirstOrDefaultAsync, Add, SaveChangesAsync, StatusCode
- **Endpoint:** HTTP attribute [HttpPost("register"), EnableRateLimiting("order-writes")]; controller route [ApiController, Route("api/partner")]
- **Data/external effects:** Add row(s) in Users, persist EF changes via SaveChanges
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

