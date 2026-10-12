# ShopInventoryRequest

- **Identity:** `class ShopInventoryRequest` in `backend/OMStationary.Api/Dtos/OrderRequests.cs`.
- **Source implementation:** [`OrderRequests.cs`](../../../../../backend/OMStationary.Api/Dtos/OrderRequests.cs).
- **Purpose (simple Hinglish):** Yeh `ShopInventoryRequest` API data-transfer contract hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** [Range(1, int.MaxValue)] public int ProductId { get; set; }; [Range(typeof(decimal), "0", "99999999")] public decimal SellingPrice { get; set; }; [Range(0, 1000000)] public int Stock { get; set; }; public bool IsAvailable { get; set; } = true;
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

