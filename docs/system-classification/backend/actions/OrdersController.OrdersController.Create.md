# OrdersController.Create

- **Identity:** `OrdersController.Create` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Source implementation:** [`OrdersController.cs`](../../../../backend/OMStationary.Api/Controllers/OrdersController.cs).
- **Purpose (simple Hinglish):** Request ya input se naya record/resource create karna hai; validation, persistence aur result source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Create([FromBody] CreateOrderRequest request, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Unauthorized, Forbid, BadRequest, Where, Select, Conflict, Add, Calculate, BeginTransactionAsync, TryRedeem, SaveChangesAsync, ExecuteUpdateAsync, CommitAsync, FirstOrDefaultAsync, CreatedAtAction | Observed return paths: Unauthorized(new { detail = "You must be signed in to place an order." }); Forbid(); BadRequest("Choose Cash on Delivery or UPI payment."); Problem("UPI payment initiation is not configured. Choose Pay on Shop.", statusCode: 503); BadRequest("Choose Pickup or Delivery."); Problem("OM Stationary pickup address is not configured.", statusCode: 503); BadRequest("Choose a future pickup date and time."); Problem("Delivery is not configured yet. Choose pickup or contact support.", statusCode: 503)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Unauthorized(new { detail = "You must be signed in to place an order." }); Forbid(); BadRequest("Choose Cash on Delivery or UPI payment."); Problem("UPI payment initiation is not configured. Choose Pay on Shop.", statusCode: 503); BadRequest("Choose Pickup or Delivery."); Problem("OM Stationary pickup address is not configured.", statusCode: 503); BadRequest("Choose a future pickup date and time."); Problem("Delivery is not configured yet. Choose pickup or contact support.", statusCode: 503)
- **Dependencies/calls:** Unauthorized, Forbid, BadRequest, Where, Select, Conflict, Add, Calculate, BeginTransactionAsync, TryRedeem, SaveChangesAsync, ExecuteUpdateAsync, CommitAsync, FirstOrDefaultAsync, CreatedAtAction
- **Endpoint:** HTTP attribute [Authorize, HttpPost, EnableRateLimiting("order-writes")]; controller route [Route("api/orders")]
- **Data/external effects:** Add row(s) in Orders, persist EF changes via SaveChanges, transactional database work, set-based database mutation
- **Security:** [Authorize, HttpPost, EnableRateLimiting("order-writes")]
- **Error handling:** Contains a try/catch path; inspect source for handled exception types.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


