# StoreSettingsWriteRequest

- **Identity:** `class StoreSettingsWriteRequest` in `backend/OMStationary.Api/Controllers/AdminSettingsController.cs`.
- **Purpose (simple Hinglish):** Yeh `StoreSettingsWriteRequest` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public string? StoreName { get; set; }; public string? StoreAddress { get; set; }; public string? StorePhone { get; set; }; public string? StoreEmail { get; set; }; public string? StoreHours { get; set; }; public decimal? TaxRatePercent { get; set; }; public string? TaxRegistration { get; set; }; public string? UdyamRegistration { get; set; }; public string? InvoicePrefix { get; set; }; public string? PickupAddress { get; set; }; public string? PickupHours { get; set; }; public bool? PickupAvailable { get; set; }; public bool? DeliveryEnabled { get; set; }; public List<string>? DeliveryCities { get; set; }; public decimal? DeliveryCharge { get; set; }; public double? DeliveryMaxRadiusKm { get; set; }
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
