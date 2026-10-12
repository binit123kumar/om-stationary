# CustomersController.UpdateAddress

- **Identity:** `CustomersController.UpdateAddress` in `backend/OMStationary.Api/Controllers/CustomersController.cs`.
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> UpdateAddress(int addressId, AddressRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, FirstOrDefaultAsync, NotFound, Where, ExecuteUpdateAsync, SaveChangesAsync, Ok | Observed return paths: Unauthorized(); NotFound(); Ok(address)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); NotFound(); Ok(address)
- **Dependencies/calls:** Unauthorized, FirstOrDefaultAsync, NotFound, Where, ExecuteUpdateAsync, SaveChangesAsync, Ok
- **Endpoint:** HTTP attribute [HttpPut("addresses/{addressId:int}")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Data/external effects:** persist EF changes via SaveChanges, set-based database mutation
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

