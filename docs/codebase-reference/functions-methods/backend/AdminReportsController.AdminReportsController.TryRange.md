# AdminReportsController.TryRange

- **Identity:** `AdminReportsController.TryRange` in `backend/OMStationary.Api/Controllers/AdminReportsController.cs`.
- **Purpose (simple Hinglish):** `TryRange` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `private static bool TryRange(DateTime? from, DateTime? to, out DateTime start, out DateTime endExclusive, out string problem)`
- **Flow:** Branch checks: endExclusive <= start; (endExclusive - start).TotalDays > 400 | Observed return paths: false; false; true
- **Output:** Declared return type `static bool`; observed returns: false; false; true
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** No HTTP verb attribute on this method in source; likely a helper/non-action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

