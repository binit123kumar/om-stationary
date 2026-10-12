# WishlistController

- **Identity:** `class WishlistController` in `backend/OMStationary.Api/Controllers/WishlistController.cs`.
- **Source implementation:** [`WishlistController.cs`](../../../../backend/OMStationary.Api/Controllers/WishlistController.cs).
- **Purpose (simple Hinglish):** Yeh `WishlistController` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** OmDbContext db
- **Routes/security attributes:** [ApiController, Authorize(Roles = "Customer"), Route("api/wishlist")]
- **Declared properties:** No public property/expression property parsed.
- **Named callable methods:** GetOrCreateAsync, List, Add, Remove, MoveToCart
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

