# FirstPartyFulfillmentProvider

- **Identity:** `class FirstPartyFulfillmentProvider` in `backend/OMStationary.Api/Services/FulfillmentSelection.cs`.
- **Source implementation:** [`FulfillmentSelection.cs`](../../../../../backend/OMStationary.Api/Services/FulfillmentSelection.cs).
- **Purpose (simple Hinglish):** Yeh `FirstPartyFulfillmentProvider` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** OmDbContext db, IConfiguration configuration
- **Routes/security attributes:** None declared.
- **Declared properties:** public string Name => "OMStationary";; public bool IsEnabled => true;
- **Named callable methods:** FindCandidates, EstimateMinutes
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

