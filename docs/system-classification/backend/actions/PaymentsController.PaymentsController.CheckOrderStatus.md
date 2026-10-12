# PaymentsController.CheckOrderStatus

- **Identity:** `PaymentsController.CheckOrderStatus` in `backend/OMStationary.Api/Controllers/PaymentsController.cs`.
- **Source implementation:** [`PaymentsController.cs`](../../../../backend/OMStationary.Api/Controllers/PaymentsController.cs).
- **Purpose (simple Hinglish):** `CheckOrderStatus` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> CheckOrderStatus(string orderNumber, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: FirstOrDefaultAsync, NotFound, Ok | Observed return paths: NotFound(); Ok(new { status = order.PaymentStatus, orderStatus = order.Status, paymentStatus = order.PaymentStatus, verified = false,
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(); Ok(new { status = order.PaymentStatus, orderStatus = order.Status, paymentStatus = order.PaymentStatus, verified = false,
- **Dependencies/calls:** FirstOrDefaultAsync, NotFound, Ok
- **Endpoint:** HTTP attribute [HttpPost("orders/{orderNumber}/status"), EnableRateLimiting("tracking-reads")]; controller route [ApiController, Route("api/payments")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Effective access guard in the method body:** The order must exist and `CanAccess(order)` must pass. The helper grants access to an authenticated Admin, the owning user, or a caller presenting a matching tracking token; missing/inaccessible orders return 404.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

