# WishlistController.Add

- **Identity:** `WishlistController.Add` in `backend/OMStationary.Api/Controllers/WishlistController.cs`.
- **Source implementation:** [`WishlistController.cs`](../../../../backend/OMStationary.Api/Controllers/WishlistController.cs).
- **Purpose (simple Hinglish):** Request ya input se naya record/resource create karna hai; validation, persistence aur result source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Add(int productId)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, AnyAsync, NotFound, Ok, Add, SaveChangesAsync | Observed return paths: Unauthorized(); NotFound(); Ok(new { productId, alreadySaved = true }); Ok(new { productId, alreadySaved = false })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); NotFound(); Ok(new { productId, alreadySaved = true }); Ok(new { productId, alreadySaved = false })
- **Dependencies/calls:** Unauthorized, AnyAsync, NotFound, Ok, Add, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPost("{productId:int}")]; controller route [ApiController, Authorize(Roles = "Customer"), Route("api/wishlist")]
- **Data/external effects:** persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Customer"), Route("api/wishlist")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


