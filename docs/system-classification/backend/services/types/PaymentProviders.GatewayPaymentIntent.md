# GatewayPaymentIntent

- **Identity:** `record GatewayPaymentIntent` in `backend/OMStationary.Api/Services/PaymentProviders.cs`.
- **Source implementation:** [`PaymentProviders.cs`](../../../../../backend/OMStationary.Api/Services/PaymentProviders.cs).
- **Purpose (simple Hinglish):** Payment gateway se create hue order/intent ka configuration, provider references, redirect/QR data aur status carry karta hai.
- **Positional record values:** `bool Configured`, `string? Provider`, `string? ProviderOrderId`, `string? RedirectUrl`, `string Status`, `string? Detail`, optional `string? QrData`, `string? QrImageBase64`.
- **Routes/security attributes:** None declared.
- **Declared properties:** Compiler-generated positional properties listed above.
- **Named callable methods:** None.
- **Dependencies/data effects:** Immutable provider result value; the gateway implementation performs any external request, not this record.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep optional QR fields and status/detail semantics aligned with payment-provider callers.

