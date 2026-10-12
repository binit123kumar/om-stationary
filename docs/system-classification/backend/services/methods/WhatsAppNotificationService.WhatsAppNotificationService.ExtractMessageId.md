# WhatsAppNotificationService.ExtractMessageId

- **Identity:** `WhatsAppNotificationService.ExtractMessageId` in `backend/OMStationary.Api/Services/WhatsAppNotificationService.cs`.
- **Source implementation:** [`WhatsAppNotificationService.cs`](../../../../../backend/OMStationary.Api/Services/WhatsAppNotificationService.cs).
- **Purpose (simple Hinglish):** `ExtractMessageId` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `private static string? ExtractMessageId(string json)`
- **Flow:** Branch checks: !document.RootElement.TryGetProperty("messages", out var messages); message.TryGetProperty("id", out var id)) return id.GetString( | Observed return paths: null; id.GetString(); null
- **Output:** Declared return type `static string?`; observed returns: null; id.GetString(); null
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** Contains a try/catch path; inspect source for handled exception types.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


