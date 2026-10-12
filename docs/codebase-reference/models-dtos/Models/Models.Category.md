# Category

- **Identity:** `class Category` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `Category` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public string Name { get; set; } = "";; public bool IsActive { get; set; } = true;
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<Category>().HasIndex(x => x.Name).IsUnique(); | modelBuilder.Entity<Category>().Property(x => x.Name).HasMaxLength(80).IsRequired();
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
