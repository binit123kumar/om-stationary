# WishlistController.MoveToCart

- **Identity:** `WishlistController.MoveToCart` in `backend/OMStationary.Api/Controllers/WishlistController.cs`.
- **Source implementation:** [`WishlistController.cs`](../../../../backend/OMStationary.Api/Controllers/WishlistController.cs).
- **Source implementation:** [`WishlistController.cs`](../../../../backend/OMStationary.Api/Controllers/WishlistController.cs).
- **Purpose (simple Hinglish):** `MoveToCart` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> MoveToCart(int productId)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, FirstOrDefaultAsync, NotFound, Include, Add, SaveChangesAsync, Remove, Ok | Observed return paths: Unauthorized(); NotFound(); Ok(new { productId, moved = true })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); NotFound(); Ok(new { productId, moved = true })
- **Dependencies/calls:** Unauthorized, FirstOrDefaultAsync, NotFound, Include, Add, SaveChangesAsync, Remove, Ok
- **Endpoint:** HTTP attribute [HttpPost("{productId:int}/move-to-cart")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/wishlist")]
- **Data/external effects:** Add row(s) in Carts, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/wishlist")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.



