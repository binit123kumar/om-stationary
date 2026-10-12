# ICodPaymentProvider

- **Identity:** `interface ICodPaymentProvider` in `backend/OMStationary.Api/Services/PaymentProviders.cs`.
- **Source implementation:** [`PaymentProviders.cs`](../../../../../backend/OMStationary.Api/Services/PaymentProviders.cs).
- **Purpose (simple Hinglish):** COD provider contract; base provider identity/configuration ke saath pending payment entity banata hai.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Contract members:** Inherits `IPaymentProvider`; `Payment CreatePendingPayment(int orderId, decimal amount)`.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

