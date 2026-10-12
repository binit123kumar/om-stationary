# ApplicationUser

- **Identity:** `class ApplicationUser` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `ApplicationUser` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public Guid Id { get; set; } = Guid.NewGuid();; public string Email { get; set; } = "";; public string Phone { get; set; } = "";; public string PasswordHash { get; set; } = "";; public string Role { get; set; } = "Customer";; public int? RoleId { get; set; }; public bool IsActive { get; set; } = true;; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<ApplicationUser>().HasIndex(x => x.Email).IsUnique(); | modelBuilder.Entity<ApplicationUser>().HasIndex(x => x.Phone).IsUnique().HasFilter("[Phone] <> ''"); | modelBuilder.Entity<ApplicationUser>().HasOne<AppRole>().WithMany().HasForeignKey(x => x.RoleId).OnDelete(DeleteBehavior.SetNull); | modelBuilder.Entity<ApplicationUser>().Property(x => x.Email).HasMaxLength(254).IsRequired(); | modelBuilder.Entity<ApplicationUser>().Property(x => x.Phone).HasMaxLength(20).IsRequired(); | modelBuilder.Entity<ApplicationUser>().Property(x => x.PasswordHash).HasMaxLength(512).IsRequired(); | modelBuilder.Entity<ApplicationUser>().Property(x => x.Role).HasMaxLength(32).IsRequired();
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
