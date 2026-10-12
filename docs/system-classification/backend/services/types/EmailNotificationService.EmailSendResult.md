# EmailSendResult

- **Identity:** `record EmailSendResult` in `backend/OMStationary.Api/Services/EmailNotificationService.cs`.
- **Source implementation:** [`EmailNotificationService.cs`](../../../../../backend/OMStationary.Api/Services/EmailNotificationService.cs).
- **Purpose (simple Hinglish):** Email bhejne ke attempt ka outcome carry karta hai—attempt hua ya nahi, accept hua ya nahi, status aur optional error.
- **Positional record values:** `bool Attempted`, `bool Success`, `string Status`, `string? Error`.
- **Routes/security attributes:** None declared.
- **Declared properties:** Compiler-generated positional properties `Attempted`, `Success`, `Status`, `Error`.
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

