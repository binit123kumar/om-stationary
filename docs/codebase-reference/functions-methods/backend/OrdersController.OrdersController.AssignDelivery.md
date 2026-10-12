# OrdersController.AssignDelivery

- **Identity:** `OrdersController.AssignDelivery` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Purpose (simple Hinglish):** `AssignDelivery` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> AssignDelivery(int id, [FromBody] AssignDeliveryRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: NotFound, FirstOrDefaultAsync, BadRequest, Conflict, Add, SaveChangesAsync, Ok | Observed return paths: AdminRequired(); NotFound(); BadRequest("This order does not have a delivery record."); Conflict(new { detail = "The selected delivery partner is not available." }); BadRequest("Select an active delivery partner."); Ok(new { order.OrderNumber, order.Status, AssignedPartner = selectedPartner?.Name ?? delivery.PartnerName, delivery.TrackingCode, DeliveryStatus = delivery.Status })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: AdminRequired(); NotFound(); BadRequest("This order does not have a delivery record."); Conflict(new { detail = "The selected delivery partner is not available." }); BadRequest("Select an active delivery partner."); Ok(new { order.OrderNumber, order.Status, AssignedPartner = selectedPartner?.Name ?? delivery.PartnerName, delivery.TrackingCode, DeliveryStatus = delivery.Status })
- **Dependencies/calls:** NotFound, FirstOrDefaultAsync, BadRequest, Conflict, Add, SaveChangesAsync, Ok
- **Endpoint:** HTTP attribute [HttpPost("{id:int}/delivery"), EnableRateLimiting("order-writes")]; controller route [Route("api/orders")]
- **Data/external effects:** Add row(s) in OrderStatusHistory, persist EF changes via SaveChanges
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

