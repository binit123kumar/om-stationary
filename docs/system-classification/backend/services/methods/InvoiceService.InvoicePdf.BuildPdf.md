# InvoicePdf.BuildPdf

- **Identity:** `InvoicePdf.BuildPdf` in `backend/OMStationary.Api/Services/InvoiceService.cs`.
- **Source implementation:** [`InvoiceService.cs`](../../../../../backend/OMStationary.Api/Services/InvoiceService.cs).
- **Purpose (simple Hinglish):** `BuildPdf` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `private static byte[] BuildPdf(IReadOnlyList<Page> pages)`
- **Flow:** Calls/framework operations identified: Add, Select, Skip | Observed return paths: output.ToArray()
- **Output:** Declared return type `static byte[]`; observed returns: output.ToArray()
- **Dependencies/calls:** Add, Select, Skip
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** document/stream generation or response
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


