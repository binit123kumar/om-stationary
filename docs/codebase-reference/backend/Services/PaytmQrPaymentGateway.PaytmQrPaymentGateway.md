# PaytmQrPaymentGateway

- **Identity:** `class PaytmQrPaymentGateway` in `backend/OMStationary.Api/Services/PaytmQrPaymentGateway.cs`.
- **Purpose (simple Hinglish):** Yeh `PaytmQrPaymentGateway` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** HttpClient http, IConfiguration configuration
- **Routes/security attributes:** None declared.
- **Declared properties:** public string Name => "Paytm";; public bool IsConfigured => configuration.GetValue<bool>("Payments:Enabled") &&
- **Named callable methods:** CreateOrder, CheckStatus, VerifyCallback
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
