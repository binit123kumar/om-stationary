# DeliveryQuoteRequest

- **Identity:** `class DeliveryQuoteRequest` in `backend/OMStationary.Api/Dtos/OrderRequests.cs`.
- **Source implementation:** [`OrderRequests.cs`](../../../../../backend/OMStationary.Api/Dtos/OrderRequests.cs).
- **Purpose (simple Hinglish):** Yeh `DeliveryQuoteRequest` API data-transfer contract hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** [Required] public string FulfillmentMethod { get; set; } = "Delivery";; [Required, StringLength(80)] public string City { get; set; } = "";; [Required, RegularExpression(@"^\d{6}$")] public string Pincode { get; set; } = "";; [StringLength(40)] public string CouponCode { get; set; } = "";; [Range(-90, 90)] public double? Latitude { get; set; }; [Range(-180, 180)] public double? Longitude { get; set; }; [Required, MinLength(1), MaxLength(30)] public List<CreateOrderItemRequest> Items { get; set; } = [];
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

