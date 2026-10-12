# Payment

- **Identity:** `class Payment` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `Payment` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int OrderId { get; set; }; public string Provider { get; set; } = "COD";; public string Status { get; set; } = "Pending";; public decimal Amount { get; set; }; public string? ProviderReference { get; set; }; public string? QrData { get; set; }; public string? QrImageBase64 { get; set; }; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;; public DateTime? PaidAt { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<Payment>().HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId).OnDelete(DeleteBehavior.Cascade); | modelBuilder.Entity<Payment>().Property(x => x.Amount).HasPrecision(18, 2); | modelBuilder.Entity<Payment>().Property(x => x.QrData).HasMaxLength(4000); | modelBuilder.Entity<Payment>().Property(x => x.QrImageBase64).HasMaxLength(1000000);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
