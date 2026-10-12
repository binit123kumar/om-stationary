# Notification

- **Identity:** `class Notification` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `Notification` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public Guid? UserId { get; set; }; public int? OrderId { get; set; }; public string Channel { get; set; } = "InApp";; public string Event { get; set; } = "";; public string Title { get; set; } = "";; public string Message { get; set; } = "";; public bool IsRead { get; set; }; public string Status { get; set; } = "Pending";; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;; public DateTime? SentAt { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<Notification>().HasIndex(x => new { x.UserId, x.CreatedAt }); | modelBuilder.Entity<Notification>().HasIndex(x => x.OrderId); | modelBuilder.Entity<Notification>().Property(x => x.Event).HasMaxLength(120).IsRequired(); | modelBuilder.Entity<Notification>().Property(x => x.Channel).HasMaxLength(24).IsRequired(); | modelBuilder.Entity<Notification>().Property(x => x.Status).HasMaxLength(24).IsRequired(); | modelBuilder.Entity<Notification>().Property(x => x.Title).HasMaxLength(160); | modelBuilder.Entity<Notification>().Property(x => x.Message).HasMaxLength(600);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
