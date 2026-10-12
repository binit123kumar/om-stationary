# WishlistController.Remove

- **Identity:** `WishlistController.Remove` in `backend/OMStationary.Api/Controllers/WishlistController.cs`.
- **Source implementation:** [`WishlistController.cs`](../../../../backend/OMStationary.Api/Controllers/WishlistController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Remove(int productId)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, Where, ExecuteDeleteAsync, NotFound | Observed return paths: Unauthorized(); removed == 0 ? NotFound() : NoContent()
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); removed == 0 ? NotFound() : NoContent()
- **Dependencies/calls:** Unauthorized, Where, ExecuteDeleteAsync, NotFound
- **Endpoint:** HTTP attribute [HttpDelete("{productId:int}")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/wishlist")]
- **Data/external effects:** set-based database mutation
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/wishlist")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


