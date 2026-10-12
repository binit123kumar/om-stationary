# EffectiveStoreSettings

- **Identity:** `record EffectiveStoreSettings` in `backend/OMStationary.Api/Services/StoreSettingsService.cs`.
- **Purpose (simple Hinglish):** Yeh `EffectiveStoreSettings` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public string BusinessName { get; init; } = "";; public string BusinessAddress { get; init; } = "";; public string Phone { get; init; } = "";; public string Email { get; init; } = "";; public string PlusCode { get; init; } = "";; public string Tagline { get; init; } = "";; public decimal TaxRatePercent { get; init; }; public string TaxRegistration { get; init; } = "";; public string UdyamRegistration { get; init; } = "";; public string InvoicePrefix { get; init; } = "";; public string PickupAddress { get; init; } = "";; public string PickupHours { get; init; } = "";; public string PickupOpensAt { get; init; } = "";; public string PickupClosesAt { get; init; } = "";; public bool PickupAvailable { get; init; }; public double PickupLatitude { get; init; }; public double PickupLongitude { get; init; }; public bool DeliveryEnabled { get; init; }; public string[] DeliveryCities { get; init; } = [];; public decimal DeliveryCharge { get; init; }; public double DeliveryMaxRadiusKm { get; init; }; public string PaymentProvider { get; init; } = "";; public bool PaymentEnabled { get; init; }; public string PaymentEnvironment { get; init; } = "";; public bool GatewayConfigured { get; init; }; public DateTime? UpdatedAt { get; init; }
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
