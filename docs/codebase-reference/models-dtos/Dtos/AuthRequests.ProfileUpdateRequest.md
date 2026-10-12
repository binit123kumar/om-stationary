# ProfileUpdateRequest

- **Identity:** `class ProfileUpdateRequest` in `backend/OMStationary.Api/Dtos/AuthRequests.cs`.
- **Purpose (simple Hinglish):** Yeh `ProfileUpdateRequest` API data-transfer contract hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** [Required, StringLength(120)] public string FullName { get; set; } = "";; [Required, Phone, StringLength(20)] public string Phone { get; set; } = "";
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
