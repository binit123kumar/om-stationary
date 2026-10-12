# PaymentsController.CreateIntent

- **Identity:** `PaymentsController.CreateIntent` in `backend/OMStationary.Api/Controllers/PaymentsController.cs`.
- **Source implementation:** [`PaymentsController.cs`](../../../../backend/OMStationary.Api/Controllers/PaymentsController.cs).
- **Purpose (simple Hinglish):** Request ya input se naya record/resource create karna hai; validation, persistence aur result source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> CreateIntent(string orderNumber, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Include, FirstOrDefaultAsync, NotFound, BadRequest, Ok, SaveChangesAsync | Observed return paths: NotFound(); BadRequest("This order does not use UPI payment."); Ok(new { status = "Paid", order.OrderNumber }); Problem("UPI payment initiation is not configured. Your order remains pending.", statusCode: 503); Problem("Payment record is missing for this order.", statusCode: 409); Ok(new { configured = true, provider = "UPI", status = "Pending", amount = order.TotalAmount,
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(); BadRequest("This order does not use UPI payment."); Ok(new { status = "Paid", order.OrderNumber }); Problem("UPI payment initiation is not configured. Your order remains pending.", statusCode: 503); Problem("Payment record is missing for this order.", statusCode: 409); Ok(new { configured = true, provider = "UPI", status = "Pending", amount = order.TotalAmount,
- **Dependencies/calls:** Include, FirstOrDefaultAsync, NotFound, BadRequest, Ok, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPost("orders/{orderNumber}/intent"), EnableRateLimiting("order-writes")]; controller route [ApiController, Route("api/payments")]
- **Data/external effects:** persist EF changes via SaveChanges
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Effective access guard in the method body:** The order must exist and `CanAccess(order)` must pass. The helper grants access to an authenticated Admin, the owning user, or a caller presenting a matching tracking token; missing/inaccessible orders return 404.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

