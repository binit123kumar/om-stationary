# GatewayPaymentStatus

- **Identity:** `record GatewayPaymentStatus` in `backend/OMStationary.Api/Services/PaymentProviders.cs`.
- **Purpose (simple Hinglish):** Payment gateway status check ka verification, paid state, provider reference, amount aur detail carry karta hai.
- **Positional record values:** `bool Verified`, `bool Paid`, `string Status`, `string? ProviderReference`, `string? Amount`, `string? Detail`.
- **Routes/security attributes:** None declared.
- **Declared properties:** Compiler-generated positional properties `Verified`, `Paid`, `Status`, `ProviderReference`, `Amount`, `Detail`.
- **Named callable methods:** None.
- **Dependencies/data effects:** Immutable provider result value; status semantics are interpreted by payment-provider callers.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Preserve the distinction between provider verification, paid status and returned provider status.
