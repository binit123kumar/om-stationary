# RequestedProduct

- **Identity:** `record RequestedProduct` in `backend/OMStationary.Api/Services/FulfillmentSelection.cs`.
- **Source implementation:** [`FulfillmentSelection.cs`](../../../../../backend/OMStationary.Api/Services/FulfillmentSelection.cs).
- **Purpose (simple Hinglish):** Fulfillment request mein ek product ID aur uski requested quantity ko represent karta hai.
- **Positional record values:** `int ProductId`, `int Quantity`.
- **Routes/security attributes:** None declared.
- **Declared properties:** Compiler-generated positional properties `ProductId`, `Quantity`.
- **Named callable methods:** None.
- **Dependencies/data effects:** Immutable value record used as an item in `FulfillmentRequest`; no persistence or external side effect.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep callers and input validation aligned with the fulfillment item contract.

