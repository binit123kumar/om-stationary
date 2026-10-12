# SmsNotificationService

- **Identity:** `class SmsNotificationService` in `backend/OMStationary.Api/Services/SmsNotificationService.cs`.
- **Source implementation:** [`SmsNotificationService.cs`](../../../../../backend/OMStationary.Api/Services/SmsNotificationService.cs).
- **Purpose (simple Hinglish):** Yeh `SmsNotificationService` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** HttpClient http, IOptions<SmsOptions> options, ILogger<SmsNotificationService> logger
- **Routes/security attributes:** None declared.
- **Declared properties:** No public property/expression property parsed.
- **Named callable methods:** SendAsync, NotifyOrderCreatedAsync, NotifyAdminOrderCreatedAsync, NotifyOrderStatusAsync, NotifyPaymentReceivedAsync, NormalizePhoneNumber
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

