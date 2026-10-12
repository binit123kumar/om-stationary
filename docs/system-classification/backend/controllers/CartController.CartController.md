# CartController

- **Identity:** `class CartController` in `backend/OMStationary.Api/Controllers/CartController.cs`.
- **Source implementation:** [`CartController.cs`](../../../../backend/OMStationary.Api/Controllers/CartController.cs).
- **Purpose (simple Hinglish):** Yeh `CartController` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** OmDbContext db
- **Routes/security attributes:** [ApiController, Authorize(Roles = "Customer"), Route("api/cart")]
- **Declared properties:** No public property/expression property parsed.
- **Named callable methods:** Get, Add, SetQuantity, Remove, Clear, Merge, Replace, GetOrCreateCart
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

