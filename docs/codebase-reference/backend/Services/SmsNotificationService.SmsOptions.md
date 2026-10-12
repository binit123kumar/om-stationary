# SmsOptions

- **Identity:** `class SmsOptions` in `backend/OMStationary.Api/Services/SmsNotificationService.cs`.
- **Purpose (simple Hinglish):** Yeh `SmsOptions` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public bool Enabled { get; set; }; public string Provider { get; set; } = "Twilio";; public string AccountSid { get; set; } = "";; public string ApiKey { get; set; } = "";; public string SenderId { get; set; } = "OMSTAT";; public string DefaultCountryCode { get; set; } = "91";; public bool NotifyNewOrder { get; set; } = true;; public bool NotifyOrderStatus { get; set; } = true;; public bool NotifyPayment { get; set; } = true;; public bool IsConfigured =>
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
