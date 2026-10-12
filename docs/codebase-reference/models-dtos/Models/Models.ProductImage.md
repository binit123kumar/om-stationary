# ProductImage

- **Identity:** `class ProductImage` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `ProductImage` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int ProductId { get; set; }; public string Url { get; set; } = "";; public int SortOrder { get; set; }
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<ProductImage>().HasOne<Product>().WithMany("Images").HasForeignKey(x => x.ProductId).OnDelete(DeleteBehavior.Cascade); | modelBuilder.Entity<ProductImage>().Property(x => x.Url).HasMaxLength(600).IsRequired();
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
