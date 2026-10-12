# DeliveryOperationsController.UpdateStatus

- **Identity:** `DeliveryOperationsController.UpdateStatus` in `backend/OMStationary.Api/Controllers/DeliveryOperationsController.cs`.
- **Source implementation:** [`DeliveryOperationsController.cs`](../../../../backend/OMStationary.Api/Controllers/DeliveryOperationsController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> UpdateStatus(int deliveryId, DeliveryPartnerStatusRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, Where, Select, FirstOrDefaultAsync, NotFound, BadRequest, BeginTransactionAsync, Add, SaveChangesAsync, CommitAsync, Ok | Observed return paths: Unauthorized(); NotFound(); NotFound(); BadRequest(new { detail = $"Delivery cannot transition from {delivery.Status} to {next}." }); Ok(new { delivery.Id, DeliveryStatus = delivery.Status, order.OrderNumber, OrderStatus = order.Status })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(); NotFound(); NotFound(); BadRequest(new { detail = $"Delivery cannot transition from {delivery.Status} to {next}." }); Ok(new { delivery.Id, DeliveryStatus = delivery.Status, order.OrderNumber, OrderStatus = order.Status })
- **Dependencies/calls:** Unauthorized, Where, Select, FirstOrDefaultAsync, NotFound, BadRequest, BeginTransactionAsync, Add, SaveChangesAsync, CommitAsync, Ok
- **Endpoint:** HTTP attribute [Authorize(Roles = "DeliveryPartner"), HttpPatch("assignments/{deliveryId:int}/status")]; controller route [ApiController, Route("api/delivery")]
- **Data/external effects:** Add row(s) in DeliveryStatusHistory, persist EF changes via SaveChanges, transactional database work
- **Security:** [Authorize(Roles = "DeliveryPartner"), HttpPatch("assignments/{deliveryId:int}/status")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


