# CustomersController.UpdateProfile

- **Identity:** `CustomersController.UpdateProfile` in `backend/OMStationary.Api/Controllers/CustomersController.cs`.
- **Source implementation:** [`CustomersController.cs`](../../../../backend/OMStationary.Api/Controllers/CustomersController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> UpdateProfile(ProfileUpdateRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, AnyAsync, Conflict, FirstOrDefaultAsync, Add, SaveChangesAsync, Ok | Observed return paths: Unauthorized(); Conflict(new { detail = "That mobile number is already in use." }); Ok(new { user.Id, user.Email, user.Phone, profile.FullName })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); Conflict(new { detail = "That mobile number is already in use." }); Ok(new { user.Id, user.Email, user.Phone, profile.FullName })
- **Dependencies/calls:** Unauthorized, AnyAsync, Conflict, FirstOrDefaultAsync, Add, SaveChangesAsync, Ok
- **Endpoint:** HTTP attribute [HttpPut("me")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Data/external effects:** Add row(s) in CustomerProfiles, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


