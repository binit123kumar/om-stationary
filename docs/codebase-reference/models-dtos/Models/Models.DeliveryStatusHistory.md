# DeliveryStatusHistory

- **Identity:** `class DeliveryStatusHistory` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `DeliveryStatusHistory` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int DeliveryId { get; set; }; public string Status { get; set; } = "";; public Guid? ChangedByUserId { get; set; }; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<DeliveryStatusHistory>().HasOne<Delivery>().WithMany().HasForeignKey(x => x.DeliveryId).OnDelete(DeleteBehavior.Cascade);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
