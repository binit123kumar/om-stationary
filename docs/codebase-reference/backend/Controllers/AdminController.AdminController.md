# AdminController

- **Identity:** `class AdminController` in `backend/OMStationary.Api/Controllers/AdminController.cs`.
- **Purpose (simple Hinglish):** Yeh `AdminController` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** OmDbContext db, StockAlertService stockAlerts
- **Routes/security attributes:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Declared properties:** No public property/expression property parsed.
- **Named callable methods:** Slugify, NormalizeUrl, Dashboard, Products, CreateProduct, UpdateProduct, DeactivateProduct, AdjustStock, EnsureUniqueSlugAsync, SyncImages
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
