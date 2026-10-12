# OrdersController.Status

- **Identity:** `OrdersController.Status` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Purpose (simple Hinglish):** `Status` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> Status(int id, [FromBody] UpdateOrderStatusRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: BadRequest, NotFound, Ok, CanTransition, Add, FirstOrDefaultAsync, SaveChangesAsync | Observed return paths: AdminRequired(); BadRequest("Unsupported order status."); NotFound(); Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus }); BadRequest(new { detail = $"Order cannot transition from {order.Status} to {canonicalStatus}." }); BadRequest("A refund can only be requested for a paid order."); BadRequest("No pending refund exists for this order."); Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: AdminRequired(); BadRequest("Unsupported order status."); NotFound(); Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus }); BadRequest(new { detail = $"Order cannot transition from {order.Status} to {canonicalStatus}." }); BadRequest("A refund can only be requested for a paid order."); BadRequest("No pending refund exists for this order."); Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus })
- **Dependencies/calls:** BadRequest, NotFound, Ok, CanTransition, Add, FirstOrDefaultAsync, SaveChangesAsync
- **Endpoint:** HTTP attribute [HttpPatch("{id:int}/status"), EnableRateLimiting("order-writes")]; controller route [Route("api/orders")]
- **Data/external effects:** Add row(s) in Refunds, persist EF changes via SaveChanges
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** Contains a try/catch path; inspect source for handled exception types.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

