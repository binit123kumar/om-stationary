# Coupon

- **Identity:** `class Coupon` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `Coupon` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public string Code { get; set; } = "";; public string DiscountType { get; set; } = "Percentage";; public decimal DiscountValue { get; set; }; public decimal MinimumOrderValue { get; set; }; public decimal? MaximumDiscount { get; set; }; public int UsageLimit { get; set; }; public int UsageCount { get; set; }; public DateTime StartsAt { get; set; }; public DateTime ExpiresAt { get; set; }; public bool IsActive { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<Coupon>().HasIndex(x => x.Code).IsUnique(); | modelBuilder.Entity<Coupon>().Property(x => x.DiscountValue).HasPrecision(18, 2); | modelBuilder.Entity<Coupon>().Property(x => x.MinimumOrderValue).HasPrecision(18, 2); | modelBuilder.Entity<Coupon>().Property(x => x.MaximumDiscount).HasPrecision(18, 2);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
