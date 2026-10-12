# AdminReportsController.BuildReport

- **Identity:** `AdminReportsController.BuildReport` in `backend/OMStationary.Api/Controllers/AdminReportsController.cs`.
- **Purpose (simple Hinglish):** `BuildReport` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `private async Task<ReportData> BuildReport(DateTime start, DateTime endExclusive)`
- **Flow:** Calls/framework operations identified: Where, CountAsync, Select, OrderByDescending, ToListAsync, Take, OrderBy | Observed return paths: new ReportData
- **Output:** Declared return type `async Task<ReportData>`; observed returns: new ReportData
- **Dependencies/calls:** Where, CountAsync, Select, OrderByDescending, ToListAsync, Take, OrderBy
- **Endpoint:** No HTTP verb attribute on this method in source; likely a helper/non-action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

