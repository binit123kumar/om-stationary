# RecordingHandler.SendAsync

- **Identity:** `RecordingHandler.SendAsync` in `backend/OMStationary.Api.Tests/NotificationDeliveryTests.cs`.
- **Purpose (simple Hinglish):** Yeh test helper outgoing HTTP request ke method, body aur authorization scheme ko record karke configured fake response return karta hai.
- **Inputs:** `protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)`
- **Flow:** Observed return paths: new HttpResponseMessage(ResponseStatus)
- **Output:** Declared return type `override async Task<HttpResponseMessage>`; observed returns: new HttpResponseMessage(ResponseStatus)
- **Dependencies/calls:** `HttpRequestMessage`, `HttpContent.ReadAsStringAsync`, `HttpResponseMessage`, configured `ResponseStatus`.
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** Updates in-memory recording fields used by tests; no DB/external network effect in this fake handler.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** Helper used by SMS delivery tests, not an assertion test itself. No test execution is claimed.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

