# RefreshToken

- **Identity:** `class RefreshToken` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `RefreshToken` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public Guid Id { get; set; } = Guid.NewGuid();; public Guid UserId { get; set; }; public string TokenHash { get; set; } = "";; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;; public DateTime ExpiresAt { get; set; }; public DateTime? RevokedAt { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<RefreshToken>().HasIndex(x => x.TokenHash).IsUnique(); | modelBuilder.Entity<RefreshToken>().HasIndex(x => new { x.UserId, x.ExpiresAt }); | modelBuilder.Entity<RefreshToken>().HasOne<ApplicationUser>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade); | modelBuilder.Entity<RefreshToken>().Property(x => x.TokenHash).HasMaxLength(64).IsRequired();
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
