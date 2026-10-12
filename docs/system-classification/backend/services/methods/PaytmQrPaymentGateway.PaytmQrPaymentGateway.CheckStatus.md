# PaytmQrPaymentGateway.CheckStatus

- **Identity:** `PaytmQrPaymentGateway.CheckStatus` in `backend/OMStationary.Api/Services/PaytmQrPaymentGateway.cs`.
- **Source implementation:** [`PaytmQrPaymentGateway.cs`](../../../../../backend/OMStationary.Api/Services/PaytmQrPaymentGateway.cs).
- **Purpose (simple Hinglish):** `CheckStatus` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<GatewayPaymentStatus> CheckStatus(string orderNumber, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Generate, Verify | Observed return paths: new(false, false, "NotConfigured", null, null, "Paytm is not configured."); new(false, false, "ProviderError", null, null, "Could not verify payment with Paytm yet."); new(false, false, "InvalidProviderResponse", null, null, "Paytm status signature verification failed."); new(false, false, "OrderMismatch", txnId, amount, "Paytm status did not match this order."); new(true, string.Equals(status, "TXN_SUCCESS", StringComparison.OrdinalIgnoreCase), status ?? "Unknown", txnId, amount, null)
- **Output:** Declared return type `async Task<GatewayPaymentStatus>`; observed returns: new(false, false, "NotConfigured", null, null, "Paytm is not configured."); new(false, false, "ProviderError", null, null, "Could not verify payment with Paytm yet."); new(false, false, "InvalidProviderResponse", null, null, "Paytm status signature verification failed."); new(false, false, "OrderMismatch", txnId, amount, "Paytm status did not match this order."); new(true, string.Equals(status, "TXN_SUCCESS", StringComparison.OrdinalIgnoreCase), status ?? "Unknown", txnId, amount, null)
- **Dependencies/calls:** Generate, Verify
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** outbound HTTP request
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


