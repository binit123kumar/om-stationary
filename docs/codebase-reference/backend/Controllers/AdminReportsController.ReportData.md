# ReportData

- **Identity:** `class ReportData` in `backend/OMStationary.Api/Controllers/AdminReportsController.cs`.
- **Purpose (simple Hinglish):** Yeh `ReportData` HTTP controller or controller support type hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public DateTime From { get; set; }; public DateTime To { get; set; }; public List<MetricRow> SalesRows { get; set; } = [];; public List<StatusAmount> Orders { get; set; } = [];; public List<CustomerAmount> Customers { get; set; } = [];; public List<ProductAmount> Products { get; set; } = [];; public List<InventoryRow> Inventory { get; set; } = [];; public List<MethodStatusAmount> Payments { get; set; } = [];; public List<SourceStatus> Delivery { get; set; } = [];
- **Named callable methods:** None.
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
