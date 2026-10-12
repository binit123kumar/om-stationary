# PartnerController.UpdateOrderStatus

- **Identity:** `PartnerController.UpdateOrderStatus` in `backend/OMStationary.Api/Controllers/PartnerController.cs`.
- **Source implementation:** [`PartnerController.cs`](../../../../backend/OMStationary.Api/Controllers/PartnerController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] PartnerOrderStatusRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: NotFound, FirstOrDefaultAsync, BadRequest, Ok, CanTransition, Add, SaveChangesAsync | Observed return paths: NotFound("No partner shop is linked to this account yet."); NotFound(); BadRequest(new { detail = "A partner may only set the order to Accepted, Preparing or Ready for Pickup." }); BadRequest(new { detail = "Unsupported partner status." }); Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus }); BadRequest(new { detail = $"Order cannot transition from {order.Status} to {canonical}." }); Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound("No partner shop is linked to this account yet."); NotFound(); BadRequest(new { detail = "A partner may only set the order to Accepted, Preparing or Ready for Pickup." }); BadRequest(new { detail = "Unsupported partner status." }); Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus }); BadRequest(new { detail = $"Order cannot transition from {order.Status} to {canonical}." }); Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus })
- **Dependencies/calls:** NotFound, FirstOrDefaultAsync, BadRequest, Ok, CanTransition, Add, SaveChangesAsync
- **Endpoint:** HTTP attribute [Authorize(Roles = "PartnerShop"), HttpPatch("orders/{id:int}/status"), EnableRateLimiting("order-writes")]; controller route [ApiController, Route("api/partner")]
- **Data/external effects:** Add row(s) in OrderStatusHistory, persist EF changes via SaveChanges
- **Security:** [Authorize(Roles = "PartnerShop"), HttpPatch("orders/{id:int}/status"), EnableRateLimiting("order-writes")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


