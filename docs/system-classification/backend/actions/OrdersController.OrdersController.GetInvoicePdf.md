# OrdersController.GetInvoicePdf

- **Identity:** `OrdersController.GetInvoicePdf` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Source implementation:** [`OrdersController.cs`](../../../../backend/OMStationary.Api/Controllers/OrdersController.cs).
- **Purpose (simple Hinglish):** `GetInvoicePdf` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<IActionResult> GetInvoicePdf(string orderNumber, CancellationToken cancellationToken)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: FirstOrDefaultAsync, NotFound | Observed return paths: NotFound(); NotFound(); NotFound("An invoice has not been generated for this order yet."); File(pdf, "application/pdf", $"Invoice-{invoice.InvoiceNumber}.pdf", enableRangeProcessing: true)
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(); NotFound(); NotFound("An invoice has not been generated for this order yet."); File(pdf, "application/pdf", $"Invoice-{invoice.InvoiceNumber}.pdf", enableRangeProcessing: true)
- **Dependencies/calls:** FirstOrDefaultAsync, NotFound
- **Endpoint:** HTTP attribute [HttpGet("{orderNumber}/invoice/pdf"), EnableRateLimiting("tracking-reads")]; controller route [Route("api/orders")]
- **Data/external effects:** document/stream generation or response
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Effective access guard in the method body:** Calls `MayViewOrder`; permits the owning customer, Admin, or a valid tracking-token holder. For legacy orders without a tracking-token hash, the helper also treats the opaque order number as the capability. Inaccessible/missing orders return 404.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

