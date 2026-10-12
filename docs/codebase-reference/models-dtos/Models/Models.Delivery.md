# Delivery

- **Identity:** `class Delivery` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `Delivery` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int OrderId { get; set; }; public string PartnerName { get; set; } = "Local Delivery";; public string Status { get; set; } = "Pending";; public string PickupAddress { get; set; } = "";; public string DropAddress { get; set; } = "";; public string TrackingCode { get; set; } = "";; public decimal Charge { get; set; }; public int? DeliveryPartnerId { get; set; }; public string Instructions { get; set; } = "";; public DateTime? AssignedAt { get; set; }; public DateTime? CompletedAt { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<Delivery>().HasIndex(x => x.OrderId).IsUnique(); | modelBuilder.Entity<Delivery>().HasIndex(x => x.DeliveryPartnerId); | modelBuilder.Entity<Delivery>().HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId).OnDelete(DeleteBehavior.Cascade); | modelBuilder.Entity<Delivery>().HasOne<DeliveryPartner>().WithMany().HasForeignKey(x => x.DeliveryPartnerId).OnDelete(DeleteBehavior.SetNull); | modelBuilder.Entity<Delivery>().Property(x => x.Charge).HasPrecision(18, 2);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
