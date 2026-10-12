# Program.Seed

- **Identity:** Local function in `backend/OMStationary.Api/Program.cs`, declared in Development product seeding.
- **Purpose (simple Hinglish):** Seed product ke input fields se ek `Product` object banata hai aur slug/category/default metadata set karta hai.
- **Inputs:** Product name, category, brand, SKU, price, MRP, stock, image URL, description; optional unit defaulting to `"Piece"`.
- **Flow:** Sets `Slug` through `Slugify`; resolves category ID from the previously loaded category dictionary; sets prices, stock threshold 5, image, short description (maximum 120 characters), full description and shared creation/update timestamp.
- **Output:** `Product` entity; caller passes the resulting objects to `db.Products.AddRange` and persists them.
- **Dependencies/calls:** `Slugify`, category dictionary `GetValueOrDefault`, `DateTime.UtcNow`-derived caller value.
- **Endpoint/data effect:** Not an endpoint. It constructs an entity only; surrounding Development-only startup code persists the seeded products.
- **Security/error handling:** Development-only call site. No local authorization or exception handler.
- **Test evidence:** NOT TESTED; no direct test or application startup was run.
- **Maintenance:** Keep seeded values consistent with product DTO/model constraints and the slug/SKU uniqueness indexes.

