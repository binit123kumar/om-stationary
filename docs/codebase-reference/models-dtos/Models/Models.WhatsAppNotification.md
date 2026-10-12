# WhatsAppNotification

- **Identity:** `class WhatsAppNotification` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `WhatsAppNotification` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int? OrderId { get; set; }; public Order? Order { get; set; }; public string NotificationType { get; set; } = "";; public string Recipient { get; set; } = "";; public string Message { get; set; } = "";; public string? ProviderMessageId { get; set; }; public string Status { get; set; } = WhatsAppNotificationStatuses.Pending;; public string? ErrorMessage { get; set; }; public int Attempts { get; set; }; public DateTime CreatedAt { get; set; } = DateTime.UtcNow;; public DateTime? SentAt { get; set; }; public DateTime? DeliveredAt { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<WhatsAppNotification>().HasIndex(x => x.CreatedAt); | modelBuilder.Entity<WhatsAppNotification>().HasIndex(x => x.Status); | modelBuilder.Entity<WhatsAppNotification>().HasIndex(x => x.NotificationType); | modelBuilder.Entity<WhatsAppNotification>().Property(x => x.NotificationType).HasMaxLength(40).IsRequired(); | modelBuilder.Entity<WhatsAppNotification>().Property(x => x.Recipient).HasMaxLength(24).IsRequired(); | modelBuilder.Entity<WhatsAppNotification>().Property(x => x.Status).HasMaxLength(24).IsRequired(); | modelBuilder.Entity<WhatsAppNotification>().Property(x => x.ProviderMessageId).HasMaxLength(200); | modelBuilder.Entity<WhatsAppNotification>().Property(x => x.Message).HasMaxLength(4000); | modelBuilder.Entity<WhatsAppNotification>().Property(x => x.ErrorMessage).HasMaxLength(600);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
