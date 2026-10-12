# Refund

- **Identity:** `class Refund` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `Refund` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int OrderId { get; set; }; public decimal Amount { get; set; }; public string Status { get; set; } = "Pending";; public string? ProviderReference { get; set; }; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<Refund>().HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId).OnDelete(DeleteBehavior.Cascade); | modelBuilder.Entity<Refund>().Property(x => x.Amount).HasPrecision(18, 2);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
