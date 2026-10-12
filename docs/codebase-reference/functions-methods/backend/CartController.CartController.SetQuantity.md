# CartController.SetQuantity

- **Identity:** `CartController.SetQuantity` in `backend/OMStationary.Api/Controllers/CartController.cs`.
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> SetQuantity(int itemId, CartItemRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: FirstOrDefaultAsync, NotFound, AnyAsync, Conflict, SaveChangesAsync | Observed return paths: NotFound(); Conflict(new { detail = "Product is unavailable." }); await Get()
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(); Conflict(new { detail = "Product is unavailable." }); await Get()
- **Dependencies/calls:** FirstOrDefaultAsync, NotFound, AnyAsync, Conflict, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPut("items/{itemId:int}")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Data/external effects:** persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

