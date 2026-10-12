# Program health endpoint

- **Source implementation:** [`Program.cs`](../../../../backend/OMStationary.Api/Program.cs), `app.MapGet("/api/health", ...)`.
- **Route / verb:** `GET /api/health`; this is a minimal endpoint, not a controller action and is excluded from the count of 90 controller `[Http...]` attributes.
- **Authorization:** No endpoint-specific `RequireAuthorization` is declared. `UseAuthentication`, `UseAuthorization`, and `AddAuthorization` are registered elsewhere in startup; actual runtime policy behavior is not verified.
- **Inputs / DTO:** Receives `OmDbContext` from dependency injection; no route/query/body parameters.
- **Calls and data access:** Calls `db.Database.CanConnectAsync()`.
- **Response branches:** `200 Results.Ok(...)` when the database connection check succeeds; `503 Results.Json(...)` when it returns false or throws. The endpoint reports only its own API/database health fields.
- **Data effects:** Connection probe only; no write is performed by this endpoint.
- **Test status:** **NOT TESTED** for this documentation task.

