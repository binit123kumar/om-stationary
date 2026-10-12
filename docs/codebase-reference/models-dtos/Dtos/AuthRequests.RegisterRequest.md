# RegisterRequest

- **Identity:** `class RegisterRequest` in `backend/OMStationary.Api/Dtos/AuthRequests.cs`.
- **Purpose (simple Hinglish):** Yeh `RegisterRequest` API data-transfer contract hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** [Required, EmailAddress, StringLength(254)] public string Email { get; set; } = "";; [Required, Phone, StringLength(20)] public string Phone { get; set; } = "";; [Required, StringLength(120)] public string FullName { get; set; } = "";; [Required, MinLength(8), StringLength(128)] public string Password { get; set; } = "";
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
