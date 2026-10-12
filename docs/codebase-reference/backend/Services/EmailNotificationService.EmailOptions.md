# EmailOptions

- **Identity:** `class EmailOptions` in `backend/OMStationary.Api/Services/EmailNotificationService.cs`.
- **Purpose (simple Hinglish):** Yeh `EmailOptions` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public bool Enabled { get; set; }; public string Provider { get; set; } = "SMTP";; public string SmtpHost { get; set; } = "";; public int SmtpPort { get; set; } = 587;; public bool EnableSsl { get; set; } = true;; public string SmtpUser { get; set; } = "";; public string SmtpPassword { get; set; } = "";; public string FromAddress { get; set; } = "";; public string FromName { get; set; } = "OM Stationary";; public bool NotifyNewOrder { get; set; } = true;; public bool NotifyOrderStatus { get; set; } = true;; public bool NotifyPayment { get; set; } = true;; public bool IsConfigured =>
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
