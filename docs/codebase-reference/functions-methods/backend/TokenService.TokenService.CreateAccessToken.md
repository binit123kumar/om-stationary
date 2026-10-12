# TokenService.CreateAccessToken

- **Identity:** `TokenService.CreateAccessToken` in `backend/OMStationary.Api/Services/TokenService.cs`.
- **Purpose (simple Hinglish):** `CreateAccessToken` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public string CreateAccessToken(ApplicationUser user)`
- **Flow:** Observed return paths: $"{unsigned}.{Base64Url(signature)}"
- **Output:** Declared return type `string`; observed returns: $"{unsigned}.{Base64Url(signature)}"
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

