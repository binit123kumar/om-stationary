# AuditLog

- **Identity:** `class AuditLog` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `AuditLog` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public long Id { get; set; }; public Guid? UserId { get; set; }; public string Action { get; set; } = "";; public string EntityType { get; set; } = "";; public string EntityId { get; set; } = "";; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;; public string? OldValue { get; set; }; public string? NewValue { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<AuditLog>().Property(x => x.OldValue).HasMaxLength(500); | modelBuilder.Entity<AuditLog>().Property(x => x.NewValue).HasMaxLength(500);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
