# FulfillmentRequest

- **Identity:** `record FulfillmentRequest` in `backend/OMStationary.Api/Services/FulfillmentSelection.cs`.
- **Purpose (simple Hinglish):** Customer coordinates aur requested items ko fulfillment-provider lookup tak carry karta hai.
- **Positional record values:** `double Latitude`, `double Longitude`, `IReadOnlyCollection<RequestedProduct> Items`.
- **Routes/security attributes:** None declared.
- **Declared properties:** Compiler-generated positional properties `Latitude`, `Longitude`, `Items`.
- **Named callable methods:** None.
- **Dependencies/data effects:** Immutable value record passed to `IFulfillmentProvider.FindCandidates`; no persistence or external side effect.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep coordinate conventions and item quantity bounds aligned with provider logic and API input validation.
