# CartController.Remove

- **Identity:** `CartController.Remove` in `backend/OMStationary.Api/Controllers/CartController.cs`.
- **Source implementation:** [`CartController.cs`](../../../../backend/OMStationary.Api/Controllers/CartController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Remove(int itemId)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: FirstOrDefaultAsync, NotFound, Remove, SaveChangesAsync | Observed return paths: NotFound(); NoContent()
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(); NoContent()
- **Dependencies/calls:** FirstOrDefaultAsync, NotFound, Remove, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpDelete("items/{itemId:int}")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Data/external effects:** Remove row(s) in CartItems, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


