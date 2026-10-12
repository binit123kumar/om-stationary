# Address

- **Identity:** `class Address` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `Address` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public Guid UserId { get; set; }; public string Label { get; set; } = "Home";; public string RecipientName { get; set; } = "";; public string Phone { get; set; } = "";; public string Line1 { get; set; } = "";; public string Line2 { get; set; } = "";; public string City { get; set; } = "";; public string State { get; set; } = "";; public string Pincode { get; set; } = "";; public double? Latitude { get; set; }; public double? Longitude { get; set; }; public bool IsDefault { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<Address>().HasOne<ApplicationUser>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
