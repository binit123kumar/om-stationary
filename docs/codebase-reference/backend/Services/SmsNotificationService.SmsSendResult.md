# SmsSendResult

- **Identity:** `record SmsSendResult` in `backend/OMStationary.Api/Services/SmsNotificationService.cs`.
- **Purpose (simple Hinglish):** SMS send attempt hua ya nahi, provider ne accept kiya ya nahi, status aur optional error carry karta hai.
- **Positional record values:** `bool Attempted`, `bool Success`, `string Status`, `string? Error`.
- **Routes/security attributes:** None declared.
- **Declared properties:** Compiler-generated positional properties `Attempted`, `Success`, `Status`, `Error`.
- **Named callable methods:** None.
- **Dependencies/data effects:** Immutable send result; delivery/provider behavior belongs to `SmsNotificationService`.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep `Attempted` separate from `Success`; a provider rejection must not be documented as delivery.
