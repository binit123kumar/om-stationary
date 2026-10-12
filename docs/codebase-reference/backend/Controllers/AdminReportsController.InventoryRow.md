# InventoryRow

- **Identity:** `class InventoryRow` in `backend/OMStationary.Api/Controllers/AdminReportsController.cs`.
- **Purpose (simple Hinglish):** Yeh `InventoryRow` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public string Name { get; set; } = "";; public string Sku { get; set; } = "";; public string Category { get; set; } = "";; public int Stock { get; set; }; public int Threshold { get; set; }; public bool Active { get; set; }; public decimal Price { get; set; }; public decimal StockValue { get; set; }; public DateTime UpdatedAt { get; set; }
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
