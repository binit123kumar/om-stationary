# CreateOrderRequest

- **Identity:** `class CreateOrderRequest` in `backend/OMStationary.Api/Dtos/OrderRequests.cs`.
- **Purpose (simple Hinglish):** Yeh `CreateOrderRequest` API data-transfer contract hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** [Required, StringLength(120)] public string CustomerName { get; set; } = "";; [Required, Phone, StringLength(20)] public string CustomerPhone { get; set; } = "";; [EmailAddress, StringLength(254)] public string? CustomerEmail { get; set; }; [StringLength(600)] public string BillingAddress { get; set; } = "";; [Required, StringLength(20)] public string FulfillmentMethod { get; set; } = "Pickup";; [Required, StringLength(20)] public string PaymentMethod { get; set; } = "COD";; public decimal? QuotedTotal { get; set; }; [StringLength(40)] public string CouponCode { get; set; } = "";; public DateTime? RequestedPickupDate { get; set; }; [StringLength(300)] public string AddressLine { get; set; } = "";; [StringLength(100)] public string Landmark { get; set; } = "";; [StringLength(80)] public string City { get; set; } = "";; [StringLength(80)] public string State { get; set; } = "";; [StringLength(12)] public string Pincode { get; set; } = "";; [Range(-90, 90)] public double? Latitude { get; set; }; [Range(-180, 180)] public double? Longitude { get; set; }; [Required, MinLength(1), MaxLength(30)] public List<CreateOrderItemRequest> Items { get; set; } = [];
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
