# ProductWriteRequest

- **Identity:** `class ProductWriteRequest` in `backend/OMStationary.Api/Dtos/CatalogRequests.cs`.
- **Purpose (simple Hinglish):** Yeh `ProductWriteRequest` API data-transfer contract hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public string Name { get; set; } = "";; public string? Slug { get; set; }; public string ShortDescription { get; set; } = "";; public string Description { get; set; } = "";; public string Sku { get; set; } = "";; public string Brand { get; set; } = "";; public string Unit { get; set; } = "Piece";; public string Category { get; set; } = "";; public int? CategoryId { get; set; }; public decimal Price { get; set; }; public decimal MRP { get; set; }; public int Stock { get; set; }; public int LowStockThreshold { get; set; } = 5;; public string ImageUrl { get; set; } = "";; public List<string>? ImageUrls { get; set; }; public bool IsActive { get; set; } = true;
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
