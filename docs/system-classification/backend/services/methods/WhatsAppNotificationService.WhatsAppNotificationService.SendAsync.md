# WhatsAppNotificationService.SendAsync

- **Identity:** `WhatsAppNotificationService.SendAsync` in `backend/OMStationary.Api/Services/WhatsAppNotificationService.cs`.
- **Source implementation:** [`WhatsAppNotificationService.cs`](../../../../../backend/OMStationary.Api/Services/WhatsAppNotificationService.cs).
- **Purpose (simple Hinglish):** Configured notification/delivery work perform ya retry karta hai; provider/config checks source implementation mein hain.
- **Inputs:** `public async Task<WhatsAppSendResult> SendAsync(string notificationType, int? orderId, string message, string? recipient = null, CancellationToken cancellationToken = default)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Normalise, Add, SaveChangesAsync, LogInformation, LogWarning, LogError | Observed return paths: new WhatsAppSendResult(false, false, row.Status, null, row.ErrorMessage); new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage); new WhatsAppSendResult(true, true, row.Status, messageId, null); new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage); new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage); new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage)
- **Output:** Declared return type `async Task<WhatsAppSendResult>`; observed returns: new WhatsAppSendResult(false, false, row.Status, null, row.ErrorMessage); new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage); new WhatsAppSendResult(true, true, row.Status, messageId, null); new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage); new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage); new WhatsAppSendResult(true, false, row.Status, null, row.ErrorMessage)
- **Dependencies/calls:** Normalise, Add, SaveChangesAsync, LogInformation, LogWarning, LogError
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** Add row(s) in WhatsAppNotifications, persist EF changes via SaveChanges, outbound HTTP request
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** Contains a try/catch path; inspect source for handled exception types.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


