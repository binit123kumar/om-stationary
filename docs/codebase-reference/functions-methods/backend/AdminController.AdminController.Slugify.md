# AdminController.Slugify

- **Identity:** `AdminController.Slugify` in `backend/OMStationary.Api/Controllers/AdminController.cs`.
- **Purpose (simple Hinglish):** `Slugify` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `private static string Slugify(string value)`
- **Flow:** Observed return paths: string.IsNullOrEmpty(slug) ? $"product-{Guid.NewGuid():N}"[..20] : slug[..Math.Min(slug.Length, 160)]
- **Output:** Declared return type `static string`; observed returns: string.IsNullOrEmpty(slug) ? $"product-{Guid.NewGuid():N}"[..20] : slug[..Math.Min(slug.Length, 160)]
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** No HTTP verb attribute on this method in source; likely a helper/non-action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

