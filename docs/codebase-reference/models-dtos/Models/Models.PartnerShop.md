# PartnerShop

- **Identity:** `class PartnerShop` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `PartnerShop` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public string Name { get; set; } = "";; public string OwnerName { get; set; } = "";; public string Address { get; set; } = "";; public string Phone { get; set; } = "";; public string Pincode { get; set; } = "";; public double Latitude { get; set; }; public double Longitude { get; set; }; public bool IsApproved { get; set; }; public bool IsActive { get; set; } = true;; public bool SupportsDelivery { get; set; } = true;; public int EstimatedDeliveryMinutes { get; set; } = 120;; public Guid? UserId { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<PartnerShop>().HasIndex(x => x.UserId).IsUnique().HasFilter("[UserId] IS NOT NULL"); | modelBuilder.Entity<PartnerShop>().HasOne<ApplicationUser>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.SetNull);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
