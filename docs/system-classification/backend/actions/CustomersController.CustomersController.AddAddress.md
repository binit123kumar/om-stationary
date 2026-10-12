# CustomersController.AddAddress

- **Identity:** `CustomersController.AddAddress` in `backend/OMStationary.Api/Controllers/CustomersController.cs`.
- **Source implementation:** [`CustomersController.cs`](../../../../backend/OMStationary.Api/Controllers/CustomersController.cs).
- **Purpose (simple Hinglish):** `AddAddress` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> AddAddress(AddressRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, AnyAsync, Where, ExecuteUpdateAsync, Add, SaveChangesAsync | Observed return paths: Unauthorized(); Created($"/api/customers/addresses/{address.Id}", address)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); Created($"/api/customers/addresses/{address.Id}", address)
- **Dependencies/calls:** Unauthorized, AnyAsync, Where, ExecuteUpdateAsync, Add, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPost("addresses")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Data/external effects:** Add row(s) in Addresses, persist EF changes via SaveChanges, set-based database mutation
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


