# CartController.Replace

- **Identity:** `CartController.Replace` in `backend/OMStationary.Api/Controllers/CartController.cs`.
- **Source implementation:** [`CartController.cs`](../../../../backend/OMStationary.Api/Controllers/CartController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Replace(CartMergeRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Select, BadRequest, CountAsync, Conflict, BeginTransactionAsync, Where, ExecuteDeleteAsync, SaveChangesAsync, CommitAsync | Observed return paths: BadRequest(new { detail = "Cart contains duplicate product rows." }); Conflict(new { detail = "One or more cart products are no longer available." }); await Get()
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest(new { detail = "Cart contains duplicate product rows." }); Conflict(new { detail = "One or more cart products are no longer available." }); await Get()
- **Dependencies/calls:** Select, BadRequest, CountAsync, Conflict, BeginTransactionAsync, Where, ExecuteDeleteAsync, SaveChangesAsync, CommitAsync
- **Endpoint:** HTTP attribute [HttpPut]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Data/external effects:** persist EF changes via SaveChanges, transactional database work, set-based database mutation
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


