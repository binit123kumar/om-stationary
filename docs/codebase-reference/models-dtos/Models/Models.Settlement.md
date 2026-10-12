# Settlement

- **Identity:** `class Settlement` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `Settlement` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int OrderId { get; set; }; public int PartnerShopId { get; set; }; public decimal PartnerAmount { get; set; }; public decimal CommissionAmount { get; set; }; public decimal DeliveryAmount { get; set; }; public string Status { get; set; } = "Pending";; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<Settlement>().HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId).OnDelete(DeleteBehavior.Restrict); | modelBuilder.Entity<Settlement>().HasOne<PartnerShop>().WithMany().HasForeignKey(x => x.PartnerShopId).OnDelete(DeleteBehavior.Restrict); | modelBuilder.Entity<Settlement>().Property(x => x.PartnerAmount).HasPrecision(18, 2); | modelBuilder.Entity<Settlement>().Property(x => x.CommissionAmount).HasPrecision(18, 2); | modelBuilder.Entity<Settlement>().Property(x => x.DeliveryAmount).HasPrecision(18, 2);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
