# ShopProduct

- **Identity:** `class ShopProduct` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `ShopProduct` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public int PartnerShopId { get; set; }; public int ProductId { get; set; }; public decimal SellingPrice { get; set; }; public int Stock { get; set; }; public bool IsAvailable { get; set; } = true;
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<ShopProduct>().HasIndex(x => new { x.PartnerShopId, x.ProductId }).IsUnique(); | modelBuilder.Entity<ShopProduct>().HasOne<PartnerShop>().WithMany().HasForeignKey(x => x.PartnerShopId).OnDelete(DeleteBehavior.Cascade); | modelBuilder.Entity<ShopProduct>().HasOne<Product>().WithMany().HasForeignKey(x => x.ProductId).OnDelete(DeleteBehavior.Restrict); | modelBuilder.Entity<ShopProduct>().Property(x => x.SellingPrice).HasPrecision(18, 2);
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
