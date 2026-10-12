# InvoicePdf

- **Identity:** `class InvoicePdf` in `backend/OMStationary.Api/Services/InvoiceService.cs`.
- **Purpose (simple Hinglish):** Yeh `InvoicePdf` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public StringBuilder Content { get; } = new();; public float Y { get; set; } = 790;
- **Named callable methods:** Render, Money, Total, Text, Line, BuildPdf
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
