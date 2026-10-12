# IEmailNotificationService

- **Identity:** `interface IEmailNotificationService` in `backend/OMStationary.Api/Services/EmailNotificationService.cs`.
- **Purpose (simple Hinglish):** Email delivery service ka contract define karta hai: generic send aur order/status/payment email notifications.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Contract members:** `SendAsync(recipient, subject, body, cancellationToken)`, `NotifyOrderCreatedAsync`, `NotifyAdminOrderCreatedAsync`, `NotifyOrderStatusAsync`, `NotifyPaymentReceivedAsync`.
- **Dependencies/data effects:** Implemented by `EmailNotificationService`; member signatures and `EmailSendResult` are defined in the linked service source.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
