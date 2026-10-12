# InvoiceService.CreateOnceAsync

- **Identity:** `InvoiceService.CreateOnceAsync` in `backend/OMStationary.Api/Services/InvoiceService.cs`.
- **Source implementation:** [`InvoiceService.cs`](../../../../../backend/OMStationary.Api/Services/InvoiceService.cs).
- **Purpose (simple Hinglish):** `CreateOnceAsync` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public async Task<Invoice> CreateOnceAsync(Order order, CancellationToken cancellationToken = default)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Include, FirstOrDefaultAsync, Add, SaveChangesAsync | Observed return paths: existing; invoice
- **Output:** Declared return type `async Task<Invoice>`; observed returns: existing; invoice
- **Dependencies/calls:** Include, FirstOrDefaultAsync, Add, SaveChangesAsync
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** Add row(s) in Invoices, persist EF changes via SaveChanges, document/stream generation or response
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


