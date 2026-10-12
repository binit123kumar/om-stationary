# OrderStatusHistory

- **Identity:** `class OrderStatusHistory` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `OrderStatusHistory` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int OrderId { get; set; }; public string Status { get; set; } = "";; public string? Note { get; set; }; public Guid? ChangedByUserId { get; set; }; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<OrderStatusHistory>().HasOne<Order>().WithMany(x => x.StatusHistory).HasForeignKey(x => x.OrderId).OnDelete(DeleteBehavior.Cascade); | modelBuilder.Entity<OrderStatusHistory>().Property(x => x.Status).HasMaxLength(32).IsRequired(); | modelBuilder.Entity<OrderStatusHistory>().Property(x => x.Note).HasMaxLength(400);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
