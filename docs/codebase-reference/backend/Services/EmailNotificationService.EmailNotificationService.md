# EmailNotificationService

- **Identity:** `class EmailNotificationService` in `backend/OMStationary.Api/Services/EmailNotificationService.cs`.
- **Purpose (simple Hinglish):** Yeh `EmailNotificationService` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** IOptions<EmailOptions> options, ILogger<EmailNotificationService> logger
- **Routes/security attributes:** None declared.
- **Declared properties:** No public property/expression property parsed.
- **Named callable methods:** SendAsync, NotifyOrderCreatedAsync, NotifyAdminOrderCreatedAsync, NotifyOrderStatusAsync, NotifyPaymentReceivedAsync
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
