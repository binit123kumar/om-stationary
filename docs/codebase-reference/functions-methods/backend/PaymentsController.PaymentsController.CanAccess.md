# PaymentsController.CanAccess

- **Identity:** `PaymentsController.CanAccess` in `backend/OMStationary.Api/Controllers/PaymentsController.cs`.
- **Purpose (simple Hinglish):** `CanAccess` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `private bool CanAccess(Order order)`
- **Flow:** Branch checks: User.Identity?.IsAuthenticated == true && User.IsInRole("Admin"); Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) && order.CustomerUserId == id; string.IsNullOrWhiteSpace(order.TrackingTokenHash) || string.IsNullOrWhiteSpace(supplied) | Observed return paths: true; true; false; CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(order.TrackingTokenHash), Encoding.UTF8.GetBytes(hash))
- **Output:** Declared return type `bool`; observed returns: true; true; false; CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(order.TrackingTokenHash), Encoding.UTF8.GetBytes(hash))
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** No HTTP verb attribute on this method in source; likely a helper/non-action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

