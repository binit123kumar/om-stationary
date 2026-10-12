# IPaymentGateway

- **Identity:** `interface IPaymentGateway` in `backend/OMStationary.Api/Services/PaymentProviders.cs`.
- **Purpose (simple Hinglish):** Online gateway payment create, status-check aur callback verification ka contract define karta hai.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Contract members:** Inherits `IPaymentProvider`; `CreateOrder(amount, orderNumber, cancellationToken)`, `CheckStatus(orderNumber, cancellationToken)`, `VerifyCallback(payload, signature)`.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
