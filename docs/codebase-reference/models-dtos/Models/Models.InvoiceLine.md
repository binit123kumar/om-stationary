# InvoiceLine

- **Identity:** `class InvoiceLine` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `InvoiceLine` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int InvoiceId { get; set; }; public string ProductName { get; set; } = "";; public string Sku { get; set; } = "";; public int Quantity { get; set; }; public decimal UnitPrice { get; set; }; public decimal Discount { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<InvoiceLine>().HasOne<Invoice>().WithMany(x => x.Items).HasForeignKey(x => x.InvoiceId).OnDelete(DeleteBehavior.Cascade); | modelBuilder.Entity<InvoiceLine>().Property(x => x.UnitPrice).HasPrecision(18, 2); | modelBuilder.Entity<InvoiceLine>().Property(x => x.Discount).HasPrecision(18, 2); | modelBuilder.Entity<InvoiceLine>().Property(x => x.ProductName).HasMaxLength(200).IsRequired(); | modelBuilder.Entity<InvoiceLine>().Property(x => x.Sku).HasMaxLength(80).IsRequired();
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
