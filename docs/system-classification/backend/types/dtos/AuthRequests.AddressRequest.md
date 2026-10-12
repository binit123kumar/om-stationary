# AddressRequest

- **Identity:** `class AddressRequest` in `backend/OMStationary.Api/Dtos/AuthRequests.cs`.
- **Source implementation:** [`AuthRequests.cs`](../../../../../backend/OMStationary.Api/Dtos/AuthRequests.cs).
- **Purpose (simple Hinglish):** Yeh `AddressRequest` API data-transfer contract hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** [Required, StringLength(40)] public string Label { get; set; } = "Home";; [Required, StringLength(120)] public string RecipientName { get; set; } = "";; [Required, Phone, StringLength(20)] public string Phone { get; set; } = "";; [Required, StringLength(300)] public string Line1 { get; set; } = "";; [StringLength(300)] public string Line2 { get; set; } = "";; [Required, StringLength(80)] public string City { get; set; } = "";; [Required, StringLength(80)] public string State { get; set; } = "";; [Required, RegularExpression(@"^\d{6}$")] public string Pincode { get; set; } = "";; [Range(-90, 90)] public double? Latitude { get; set; }; [Range(-180, 180)] public double? Longitude { get; set; }; public bool IsDefault { get; set; }
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

