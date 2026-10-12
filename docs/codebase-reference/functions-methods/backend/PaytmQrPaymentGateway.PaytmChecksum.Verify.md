# PaytmChecksum.Verify

- **Identity:** `PaytmChecksum.Verify` in `backend/OMStationary.Api/Services/PaytmQrPaymentGateway.cs`.
- **Purpose (simple Hinglish):** Named helper/state/configuration decision ko evaluate karta hai; exact behavior source conditions aur returns mein defined hai.
- **Inputs:** `public static bool Verify(string payload, string key, string? signature)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Create | Observed return paths: false; false; CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(expected), Encoding.UTF8.GetBytes(hashAndSalt)); false; false
- **Output:** Declared return type `static bool`; observed returns: false; false; CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(expected), Encoding.UTF8.GetBytes(hashAndSalt)); false; false
- **Dependencies/calls:** Create
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** Contains a try/catch path; inspect source for handled exception types.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

