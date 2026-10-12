# Program.PartitionKey

- **Identity:** Static local function in `backend/OMStationary.Api/Program.cs`, inside rate-limiter setup.
- **Purpose (simple Hinglish):** Request ko user identity ya remote IP ke basis par rate-limit bucket mein group karta hai.
- **Inputs:** `HttpContext context`.
- **Flow:** `ClaimTypes.NameIdentifier` leta hai; claim absent ho to remote IP string; dono absent ho to `"unknown"`.
- **Output:** `string` partition key.
- **Dependencies/calls:** `HttpContext.User`, `FindFirstValue`, `Connection.RemoteIpAddress`.
- **Endpoint/data effect:** Is function ka endpoint nahi; returned key `order-writes`/`tracking-reads` limiter partition ko control karti hai. No persistence or external side effect.
- **Security/error handling:** Uses authenticated identity when available; anonymous requests fall back to IP. No local exception handler.
- **Test evidence:** NOT TESTED; no direct test or runtime request was collected.
- **Maintenance:** Keep the fallback chain aligned with the rate-limit isolation and anonymous-client policy.

