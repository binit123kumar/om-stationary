# IWhatsAppNotificationService

- **Identity:** `interface IWhatsAppNotificationService` in `backend/OMStationary.Api/Services/WhatsAppNotificationService.cs`.
- **Source implementation:** [`WhatsAppNotificationService.cs`](../../../../../backend/OMStationary.Api/Services/WhatsAppNotificationService.cs).
- **Purpose (simple Hinglish):** WhatsApp send aur order/payment/customer/low-stock notification methods ka contract define karta hai.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Contract members:** `SendAsync(notificationType, orderId, message, recipient, cancellationToken)`, `NotifyOrderCreatedAsync`, `NotifyOrderStatusAsync`, `NotifyPaymentReceivedAsync`, `NotifyNewCustomerAsync`, `NotifyLowStockAsync`.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

