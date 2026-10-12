# NotificationService.AddForOrder

- **Identity:** `NotificationService.AddForOrder` in `backend/OMStationary.Api/Services/NotificationService.cs`.
- **Source implementation:** [`NotificationService.cs`](../../../../../backend/OMStationary.Api/Services/NotificationService.cs).
- **Purpose (simple Hinglish):** `AddForOrder` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public void AddForOrder(Order order, string eventName, string? message = null)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Add
- **Output:** Declared return type `void`; observed returns: No return expression parsed (void/iterator/body parser limitation possible).
- **Dependencies/calls:** Add
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** Add row(s) in Notifications
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


