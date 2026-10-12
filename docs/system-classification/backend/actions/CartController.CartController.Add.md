# CartController.Add

- **Identity:** `CartController.Add` in `backend/OMStationary.Api/Controllers/CartController.cs`.
- **Source implementation:** [`CartController.cs`](../../../../backend/OMStationary.Api/Controllers/CartController.cs).
- **Purpose (simple Hinglish):** Request ya input se naya record/resource create karna hai; validation, persistence aur result source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Add(CartItemRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: AnyAsync, Conflict, FirstOrDefaultAsync, Add, SaveChangesAsync | Observed return paths: Conflict(new { detail = "Product is unavailable." }); await Get()
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Conflict(new { detail = "Product is unavailable." }); await Get()
- **Dependencies/calls:** AnyAsync, Conflict, FirstOrDefaultAsync, Add, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPost("items")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Data/external effects:** Add row(s) in CartItems, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


