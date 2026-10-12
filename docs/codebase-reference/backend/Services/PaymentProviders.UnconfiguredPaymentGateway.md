# UnconfiguredPaymentGateway

- **Identity:** `class UnconfiguredPaymentGateway` in `backend/OMStationary.Api/Services/PaymentProviders.cs`.
- **Purpose (simple Hinglish):** Yeh `UnconfiguredPaymentGateway` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** IConfiguration configuration
- **Routes/security attributes:** None declared.
- **Declared properties:** public string Name => configuration["Payments:Provider"] ?? "None";; public bool IsConfigured => configuration.GetValue<bool>("Payments:Enabled") && !string.Equals(Name, "None", StringComparison.OrdinalIgnoreCase);
- **Named callable methods:** CreateOrder, CheckStatus, VerifyCallback
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
