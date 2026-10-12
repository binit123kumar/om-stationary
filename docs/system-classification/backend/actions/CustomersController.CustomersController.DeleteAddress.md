# CustomersController.DeleteAddress

- **Identity:** `CustomersController.DeleteAddress` in `backend/OMStationary.Api/Controllers/CustomersController.cs`.
- **Source implementation:** [`CustomersController.cs`](../../../../backend/OMStationary.Api/Controllers/CustomersController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> DeleteAddress(int addressId)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, FirstOrDefaultAsync, NotFound, Remove, SaveChangesAsync | Observed return paths: Unauthorized(); NotFound(); NoContent()
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); NotFound(); NoContent()
- **Dependencies/calls:** Unauthorized, FirstOrDefaultAsync, NotFound, Remove, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpDelete("addresses/{addressId:int}")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Data/external effects:** Remove row(s) in Addresses, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/customers")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


