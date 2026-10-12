# AppRole

- **Identity:** `class AppRole` in `backend/OMStationary.Api/Models/Models.cs`.
- **Purpose (simple Hinglish):** Yeh `AppRole` domain data model hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public int Id { get; set; }; public string Name { get; set; } = "";
- **Named callable methods:** None.
- **Direct EF configuration:** modelBuilder.Entity<AppRole>().HasIndex(x => x.Name).IsUnique(); | modelBuilder.Entity<AppRole>().Property(x => x.Name).HasMaxLength(32).IsRequired();
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.
