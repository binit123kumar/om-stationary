# OmDbContextFactory.ResolveContentRoot

- **Identity:** `OmDbContextFactory.ResolveContentRoot` in `backend/OMStationary.Api/Data/OmDbContextFactory.cs`.
- **Purpose (simple Hinglish):** `ResolveContentRoot` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `private static string ResolveContentRoot()`
- **Flow:** Branch checks: File.Exists(Path.Combine(directory.FullName, "OMStationary.Api.csproj")) | Observed return paths: directory.FullName; Directory.GetCurrentDirectory()
- **Output:** Declared return type `static string`; observed returns: directory.FullName; Directory.GetCurrentDirectory()
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** document/stream generation or response
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

