# AdminWhatsAppController

- **Identity:** `class AdminWhatsAppController` in `backend/OMStationary.Api/Controllers/AdminWhatsAppController.cs`.
- **Purpose (simple Hinglish):** Yeh `AdminWhatsAppController` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** OmDbContext db, IWhatsAppNotificationService whatsapp, IOptions<WhatsAppOptions> options, IConfiguration configuration
- **Routes/security attributes:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/whatsapp")]
- **Declared properties:** No public property/expression property parsed.
- **Named callable methods:** Status, UpdateSettings, SendTest, Retry, Describe
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
