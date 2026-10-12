# ISmsNotificationService

- **Identity:** `interface ISmsNotificationService` in `backend/OMStationary.Api/Services/SmsNotificationService.cs`.
- **Purpose (simple Hinglish):** SMS send aur order/status/payment SMS notification methods ka contract define karta hai.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Contract members:** `SendAsync(recipient, message, cancellationToken)`, `NotifyOrderCreatedAsync`, `NotifyAdminOrderCreatedAsync`, `NotifyOrderStatusAsync`, `NotifyPaymentReceivedAsync`.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
