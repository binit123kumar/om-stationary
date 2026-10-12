# Program.HealthEndpoint

- **Identity:** Minimal endpoint lambda mapped in `backend/OMStationary.Api/Program.cs` at `GET /api/health`.
- **Purpose (simple Hinglish):** API process ke saath database connectivity check karke health response deta hai.
- **Inputs:** Injected `OmDbContext db`.
- **Flow:** Calls `db.Database.CanConnectAsync()`. Success returns HTTP 200 with `api: healthy` and `database: healthy`; false or a caught exception returns HTTP 503 with `api: healthy` and `database: unavailable`.
- **Output:** `IResult` JSON response.
- **Dependencies/calls:** ASP.NET minimal routing/results; EF Core `CanConnectAsync`.
- **Endpoint/data effect:** `GET /api/health`; read-only connectivity probe, no database mutation.
- **Security/error handling:** No explicit authorization attribute is attached to this minimal route in source. The endpoint catches all exceptions and reports a generic database-unavailable result.
- **Test evidence:** NOT TESTED; no health request or live DB probe was made.
- **Maintenance:** The result describes only a request-time connectivity check; do not treat this source report as current runtime/database status.

