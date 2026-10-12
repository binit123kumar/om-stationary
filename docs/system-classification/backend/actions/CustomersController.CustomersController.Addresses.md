# CustomersController.Addresses

- **Identity:** `CustomersController.Addresses` in `backend/OMStationary.Api/Controllers/CustomersController.cs`.
- **Source implementation:** [`CustomersController.cs`](../../../../backend/OMStationary.Api/Controllers/CustomersController.cs).
- **Purpose (simple Hinglish):** `Addresses` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Addresses()`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, Ok, Where, OrderByDescending, ThenBy, ToListAsync | Observed return paths: Unauthorized(); Ok(await db.Addresses.AsNoTracking().Where(x => x.UserId == id).OrderByDescending(x => x.IsDefault).ThenBy(x => x.Id).ToListAsync())
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); Ok(await db.Addresses.AsNoTracking().Where(x => x.UserId == id).OrderByDescending(x => x.IsDefault).ThenBy(x => x.Id).ToListAsync())
- **Dependencies/calls:** Unauthorized, Ok, Where, OrderByDescending, ThenBy, ToListAsync
- **Endpoint:** HTTP attribute [HttpGet("addresses")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


