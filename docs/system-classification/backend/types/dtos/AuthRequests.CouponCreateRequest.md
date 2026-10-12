# CouponCreateRequest

- **Identity:** `class CouponCreateRequest` in `backend/OMStationary.Api/Dtos/AuthRequests.cs`.
- **Source implementation:** [`AuthRequests.cs`](../../../../../backend/OMStationary.Api/Dtos/AuthRequests.cs).
- **Purpose (simple Hinglish):** Yeh `CouponCreateRequest` API data-transfer contract hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** [Required, StringLength(40)] public string Code { get; set; } = "";; [Required, StringLength(20)] public string DiscountType { get; set; } = "Percentage";; [Range(typeof(decimal), "0.01", "1000000")] public decimal DiscountValue { get; set; }; [Range(typeof(decimal), "0", "1000000")] public decimal MinimumOrderValue { get; set; }; [Range(typeof(decimal), "0", "1000000")] public decimal? MaximumDiscount { get; set; }; [Range(1, 1000000)] public int UsageLimit { get; set; }; public DateTime StartsAt { get; set; }; public DateTime ExpiresAt { get; set; }; public bool IsActive { get; set; } = true;
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

