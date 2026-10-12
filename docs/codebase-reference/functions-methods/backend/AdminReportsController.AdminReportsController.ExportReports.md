# AdminReportsController.ExportReports

- **Identity:** `AdminReportsController.ExportReports` in `backend/OMStationary.Api/Controllers/AdminReportsController.cs`.
- **Purpose (simple Hinglish):** Validates the date range, builds `reportData`, selects the requested report rows, and renders the CSV response. The local name identifies the combined report result instead of using an opaque one-letter name.
- **Inputs:** `public async Task<IActionResult> ExportReports([FromQuery] string report = "sales", [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: BadRequest, Select | Observed return paths: BadRequest(new { detail = problem }); File(Encoding.UTF8.GetBytes(builder.ToString()), "text/csv",; clean.Contains(',') ? $"\"{clean}\"" : clean
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest(new { detail = problem }); File(Encoding.UTF8.GetBytes(builder.ToString()), "text/csv",; clean.Contains(',') ? $"\"{clean}\"" : clean
- **Dependencies/calls:** BadRequest, Select
- **Endpoint:** HTTP attribute [HttpGet("reports/export")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.
