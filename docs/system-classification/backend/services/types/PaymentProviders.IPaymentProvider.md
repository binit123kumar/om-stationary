# IPaymentProvider

- **Identity:** `interface IPaymentProvider` in `backend/OMStationary.Api/Services/PaymentProviders.cs`.
- **Source implementation:** [`PaymentProviders.cs`](../../../../../backend/OMStationary.Api/Services/PaymentProviders.cs).
- **Purpose (simple Hinglish):** Payment provider ki identity aur configured state batane wala base contract hai.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Contract members:** `string Name`, `bool IsConfigured`.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

