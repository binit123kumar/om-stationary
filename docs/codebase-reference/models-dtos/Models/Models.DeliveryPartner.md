# DeliveryPartner

- **Identity:** `class DeliveryPartner` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `DeliveryPartner` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public Guid? UserId { get; set; }; public string Name { get; set; } = "";; public string Mobile { get; set; } = "";; public string Email { get; set; } = "";; public string VehicleType { get; set; } = "";; public string VehicleNumber { get; set; } = "";; public string Status { get; set; } = "Inactive";; public bool IsAvailable { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<DeliveryPartner>().HasIndex(x => x.UserId).IsUnique().HasFilter("[UserId] IS NOT NULL"); | modelBuilder.Entity<DeliveryPartner>().HasOne<ApplicationUser>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.SetNull);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
