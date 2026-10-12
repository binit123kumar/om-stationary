# FulfillmentCandidate

- **Identity:** `record FulfillmentCandidate` in `backend/OMStationary.Api/Services/FulfillmentSelection.cs`.
- **Purpose (simple Hinglish):** Eligible stock source ka partner, prices, subtotal, delivery fee, distance, estimate aur pickup address represent karta hai.
- **Positional record values:** `PartnerShop? Shop`, `Dictionary<int, decimal> UnitPrices`, `decimal Subtotal`, `decimal DeliveryFee`, `double DistanceKm`, `int EstimatedDeliveryMinutes`, `string PickupAddress`.
- **Routes/security attributes:** None declared.
- **Declared properties:** Positional properties above plus computed `Total => Subtotal + DeliveryFee`.
- **Named callable methods:** Computed property `Total`.
- **Dependencies/data effects:** In-memory candidate value; partner may be null for first-party stock. No persistence or external effect.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep pricing and delivery values consistent with the provider's candidate selection and downstream order/settlement calculations.
