# OrdersController.PaymentStatus

- **Identity:** `OrdersController.PaymentStatus` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Purpose (simple Hinglish):** `PaymentStatus` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> PaymentStatus(int id, [FromBody] UpdatePaymentStatusRequest request, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: BadRequest, NotFound, Ok, Add, FirstOrDefaultAsync, Where, ExecuteUpdateAsync, SaveChangesAsync | Observed return paths: AdminRequired(); BadRequest("Only a manually confirmed COD payment can be marked Paid."); NotFound(); BadRequest("This payment method cannot be marked as COD collected."); BadRequest("Confirm cash only after the order has been delivered or collected."); Ok(new { order.Id, order.OrderNumber, order.PaymentStatus }); Ok(new { order.Id, order.OrderNumber, order.PaymentStatus })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: AdminRequired(); BadRequest("Only a manually confirmed COD payment can be marked Paid."); NotFound(); BadRequest("This payment method cannot be marked as COD collected."); BadRequest("Confirm cash only after the order has been delivered or collected."); Ok(new { order.Id, order.OrderNumber, order.PaymentStatus }); Ok(new { order.Id, order.OrderNumber, order.PaymentStatus })
- **Dependencies/calls:** BadRequest, NotFound, Ok, Add, FirstOrDefaultAsync, Where, ExecuteUpdateAsync, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPatch("{id:int}/payment"), EnableRateLimiting("order-writes")]; controller route [Route("api/orders")]
- **Data/external effects:** Add row(s) in AuditLogs, persist EF changes via SaveChanges, set-based database mutation
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** Contains a try/catch path; inspect source for handled exception types.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

