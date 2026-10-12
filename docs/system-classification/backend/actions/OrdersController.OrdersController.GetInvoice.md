# OrdersController.GetInvoice

- **Identity:** `OrdersController.GetInvoice` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Source implementation:** [`OrdersController.cs`](../../../../backend/OMStationary.Api/Controllers/OrdersController.cs).
- **Purpose (simple Hinglish):** `GetInvoice` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> GetInvoice(string orderNumber, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: FirstOrDefaultAsync, NotFound, Include, Where, OrderByDescending, Select, Calculate, Ok | Observed return paths: NotFound(); NotFound(); NotFound("An invoice has not been generated for this order yet."); clean.Length == 0 || clean.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase) ? "" : clean; new; Ok(new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(); NotFound(); NotFound("An invoice has not been generated for this order yet."); clean.Length == 0 || clean.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase) ? "" : clean; new; Ok(new
- **Dependencies/calls:** FirstOrDefaultAsync, NotFound, Include, Where, OrderByDescending, Select, Calculate, Ok
- **Endpoint:** HTTP attribute [HttpGet("{orderNumber}/invoice"), EnableRateLimiting("tracking-reads")]; controller route [Route("api/orders")]
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Effective access guard in the method body:** Calls `MayViewOrder`; permits the owning customer, Admin, or a valid tracking-token holder. For legacy orders without a tracking-token hash, the helper also treats the opaque order number as the capability. Inaccessible/missing orders return 404.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

