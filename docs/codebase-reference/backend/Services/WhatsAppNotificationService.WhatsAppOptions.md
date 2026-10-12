# WhatsAppOptions

- **Identity:** `class WhatsAppOptions` in `backend/OMStationary.Api/Services/WhatsAppNotificationService.cs`.
- **Purpose (simple Hinglish):** Yeh `WhatsAppOptions` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public bool Enabled { get; set; }; public string Provider { get; set; } = "Your API";; public string AdminNumber { get; set; } = "";; public string PhoneNumberId { get; set; } = "";; public string BusinessAccountId { get; set; } = "";; public string AccessToken { get; set; } = "";; public string ApiVersion { get; set; } = "v21.0";; public bool NotifyNewOrder { get; set; } = true;; public bool NotifyOrderStatus { get; set; } = true;; public bool NotifyPayment { get; set; } = true;; public bool NotifyLowStock { get; set; } = true;; public bool NotifyNewCustomer { get; set; } = true;
- **Named callable methods:** Allow, MissingSettings, Normalise, IsPhoneNumber
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
