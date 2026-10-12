# InvoicePdf.Render

- **Identity:** `InvoicePdf.Render` in `backend/OMStationary.Api/Services/InvoiceService.cs`.
- **Purpose (simple Hinglish):** `Render` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `public static byte[] Render(Invoice invoice, string business, string address, string plusCode, string phone, string email,
        string gstinLine, string udyamLine, decimal taxRatePercent, string paymentProvider, string transactionId)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: Where, Add, Calculate | Observed return paths: BuildPdf(pages)
- **Output:** Declared return type `static byte[]`; observed returns: BuildPdf(pages)
- **Dependencies/calls:** Where, Add, Calculate
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** document/stream generation or response
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

