# PartnerController.SetApproval

- **Identity:** `PartnerController.SetApproval` in `backend/OMStationary.Api/Controllers/PartnerController.cs`.
- **Source implementation:** [`PartnerController.cs`](../../../../backend/OMStationary.Api/Controllers/PartnerController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> SetApproval(int id, [FromBody] ShopApprovalRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: FirstOrDefaultAsync, NotFound, Add, SaveChangesAsync, Ok | Observed return paths: NotFound(); Ok(new { shop.Id, shop.Name, shop.IsApproved, shop.IsActive })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(); Ok(new { shop.Id, shop.Name, shop.IsApproved, shop.IsActive })
- **Dependencies/calls:** FirstOrDefaultAsync, NotFound, Add, SaveChangesAsync, Ok
- **Endpoint:** HTTP attribute [Authorize(Roles = "Admin"), HttpPut("shops/{id:int}/approval"), EnableRateLimiting("order-writes")]; controller route [ApiController, Route("api/partner")]
- **Data/external effects:** Add row(s) in AuditLogs, persist EF changes via SaveChanges
- **Security:** [Authorize(Roles = "Admin"), HttpPut("shops/{id:int}/approval"), EnableRateLimiting("order-writes")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


