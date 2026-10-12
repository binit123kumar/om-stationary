# CouponWriteRequest

- **Identity:** `class CouponWriteRequest` in `backend/OMStationary.Api/Controllers/AdminCatalogueController.cs`.
- **Purpose (simple Hinglish):** Yeh `CouponWriteRequest` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public string DiscountType { get; set; } = "Percentage";; public decimal DiscountValue { get; set; }; public decimal MinimumOrderValue { get; set; }; public decimal? MaximumDiscount { get; set; }; public int UsageLimit { get; set; } = 100;; public DateTime StartsAt { get; set; }; public DateTime ExpiresAt { get; set; }; public bool IsActive { get; set; } = true;
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
