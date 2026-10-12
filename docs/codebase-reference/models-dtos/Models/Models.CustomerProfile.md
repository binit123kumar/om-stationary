# CustomerProfile

- **Identity:** `class CustomerProfile` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `CustomerProfile` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public Guid UserId { get; set; }; public string FullName { get; set; } = "";; public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<CustomerProfile>().HasIndex(x => x.UserId).IsUnique(); | modelBuilder.Entity<CustomerProfile>().HasOne<ApplicationUser>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
