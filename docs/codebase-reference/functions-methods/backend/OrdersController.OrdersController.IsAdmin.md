# OrdersController.IsAdmin

- **Identity:** `OrdersController.IsAdmin` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Purpose (simple Hinglish):** Named helper/state/configuration decision ko evaluate karta hai; exact behavior source conditions aur returns mein defined hai.
- **Inputs:** `private bool IsAdmin()`
- **Flow:** Observed return paths: User.Identity?.IsAuthenticated == true && User.IsInRole("Admin")
- **Output:** Declared return type `bool`; observed returns: User.Identity?.IsAuthenticated == true && User.IsInRole("Admin")
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** No HTTP verb attribute on this method in source; likely a helper/non-action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

