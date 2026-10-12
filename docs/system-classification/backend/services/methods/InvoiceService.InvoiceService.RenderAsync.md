# InvoiceService.RenderAsync

- **Identity:** `InvoiceService.RenderAsync` in `backend/OMStationary.Api/Services/InvoiceService.cs`.
- **Source implementation:** [`InvoiceService.cs`](../../../../../backend/OMStationary.Api/Services/InvoiceService.cs).
- **Purpose (simple Hinglish):** `RenderAsync` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<byte[]> RenderAsync(Invoice invoice, CancellationToken cancellationToken = default)`
- **Flow:** Calls/framework operations identified: SaveChangesAsync, Where, OrderByDescending, Select, FirstOrDefaultAsync | Observed return paths: clean.Length == 0 || clean.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase) ? "" : clean; InvoicePdf.Render(invoice,
- **Output:** Declared return type `async Task<byte[]>`; observed returns: clean.Length == 0 || clean.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase) ? "" : clean; InvoicePdf.Render(invoice,
- **Dependencies/calls:** SaveChangesAsync, Where, OrderByDescending, Select, FirstOrDefaultAsync
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** persist EF changes via SaveChanges, document/stream generation or response
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


