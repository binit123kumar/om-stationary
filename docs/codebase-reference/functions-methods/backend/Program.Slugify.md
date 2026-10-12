# Program.Slugify

- **Identity:** Local method ``Slugify`` in ``backend/OMStationary.Api/Program.cs`` (top-level startup code).
- **Purpose (simple Hinglish):** Product name ko URL-safe lowercase slug mein badalta hai; empty slug par unique product fallback banata hai.
- **Inputs:** ``string value``.
- **Flow:** Lowercase invariant aur trim; non-alphanumeric runs ko hyphen se replace; leading/trailing hyphen trim. Agar result empty ho to ``product-{Guid:N}`` ka first 20-character fragment return karta hai; otherwise slug ko maximum 160 characters tak truncate karta hai.
- **Output:** ``string`` slug.
- **Dependencies/calls:** ``Regex.Replace``, ``Guid.NewGuid``, ``Math.Min``.
- **Endpoint:** Not an endpoint; invoked as startup/seed helper where referenced in Program.cs.
- **Data/external effects:** No persistent or external side effect in this helper.
- **Security/error handling:** No local authorization or exception-handling branch. Input is transformed, not validated as a product record.
- **Test evidence:** NOT TESTED; no test or execution result for this helper was collected.
- **Maintenance:** Keep slug normalization and maximum length aligned with Product.Slug mapping and uniqueness handling.

