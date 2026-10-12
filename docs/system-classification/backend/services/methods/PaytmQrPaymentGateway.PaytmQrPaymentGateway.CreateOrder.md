# PaytmQrPaymentGateway.CreateOrder

- **Identity:** `PaytmQrPaymentGateway.CreateOrder` in `backend/OMStationary.Api/Services/PaytmQrPaymentGateway.cs`.
- **Source implementation:** [`PaytmQrPaymentGateway.cs`](../../../../../backend/OMStationary.Api/Services/PaytmQrPaymentGateway.cs).
- **Purpose (simple Hinglish):** `CreateOrder` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<GatewayPaymentIntent> CreateOrder(decimal amount, string orderNumber, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Generate, Verify | Observed return paths: new(false, Name, null, null, "NotConfigured", "Paytm dynamic QR credentials are not configured."); new(false, Name, null, null, "ProviderError", "Paytm could not create a payment QR. Try again."); new(false, Name, null, null, "InvalidProviderResponse", "Paytm response verification failed."); new(false, Name, null, null, "ProviderError", "Paytm did not create a payment QR for this order."); new(false, Name, null, null, "InvalidProviderResponse", "Paytm returned an incomplete QR response."); new(true, Name, qrId, null, "Pending", null, qrData, image)
- **Output:** Declared return type `async Task<GatewayPaymentIntent>`; observed returns: new(false, Name, null, null, "NotConfigured", "Paytm dynamic QR credentials are not configured."); new(false, Name, null, null, "ProviderError", "Paytm could not create a payment QR. Try again."); new(false, Name, null, null, "InvalidProviderResponse", "Paytm response verification failed."); new(false, Name, null, null, "ProviderError", "Paytm did not create a payment QR for this order."); new(false, Name, null, null, "InvalidProviderResponse", "Paytm returned an incomplete QR response."); new(true, Name, qrId, null, "Pending", null, qrData, image)
- **Dependencies/calls:** Generate, Verify
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** outbound HTTP request
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** Contains a try/catch path; inspect source for handled exception types.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


