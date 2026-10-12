# IFulfillmentProvider

- **Identity:** `interface IFulfillmentProvider` in `backend/OMStationary.Api/Services/FulfillmentSelection.cs`.
- **Purpose (simple Hinglish):** Fulfillment source ka naam/enabled state aur requested-item candidates dhoondhne ka contract define karta hai.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Contract members:** `string Name`, `bool IsEnabled`, `FindCandidates(FulfillmentRequest request, CancellationToken cancellationToken)`.
- **Dependencies/data effects:** Implemented by `FirstPartyFulfillmentProvider`; returns candidate values without mutating order data.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
