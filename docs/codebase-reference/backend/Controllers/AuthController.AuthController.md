# AuthController

- **Identity:** `class AuthController` in `backend/OMStationary.Api/Controllers/AuthController.cs`.
- **Purpose (simple Hinglish):** Yeh `AuthController` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** OmDbContext db, TokenService tokens, IWhatsAppNotificationService whatsapp
- **Routes/security attributes:** [ApiController] [Route("api/auth")]
- **Declared properties:** No public property/expression property parsed.
- **Named callable methods:** Register, Login, Refresh, Logout, Me, CreateSession
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
