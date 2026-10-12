# WhatsAppSendResult

- **Identity:** `record WhatsAppSendResult` in `backend/OMStationary.Api/Services/WhatsAppNotificationService.cs`.
- **Purpose (simple Hinglish):** WhatsApp send attempt/success, provider message ID aur optional error ko carry karta hai.
- **Positional record values:** `bool Attempted`, `bool Success`, `string Status`, `string? ProviderMessageId`, `string? Error`.
- **Routes/security attributes:** None declared.
- **Declared properties:** Compiler-generated positional properties `Attempted`, `Success`, `Status`, `ProviderMessageId`, `Error`.
- **Named callable methods:** None.
- **Dependencies/data effects:** Immutable send result; delivery/provider behavior belongs to `WhatsAppNotificationService`.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep `Attempted` distinct from provider acceptance and delivery state.
