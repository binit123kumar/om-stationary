# DeliveryOperationsController.CreatePartner

- **Identity:** `DeliveryOperationsController.CreatePartner` in `backend/OMStationary.Api/Controllers/DeliveryOperationsController.cs`.
- **Purpose (simple Hinglish):** Request ya input se naya record/resource create karna hai; validation, persistence aur result source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> CreatePartner(DeliveryPartnerRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: AnyAsync, Conflict, Where, Select, FirstOrDefaultAsync, Add, SaveChangesAsync | Observed return paths: Conflict(new { detail = "Email or mobile number is already used." }); Problem("Delivery partner accounts are not configured.", statusCode: 503); Created($"/api/delivery/management/partners/{partner.Id}", new { partner.Id, partner.Name, partner.Email, partner.Mobile, partner.Status })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: Conflict(new { detail = "Email or mobile number is already used." }); Problem("Delivery partner accounts are not configured.", statusCode: 503); Created($"/api/delivery/management/partners/{partner.Id}", new { partner.Id, partner.Name, partner.Email, partner.Mobile, partner.Status })
- **Dependencies/calls:** AnyAsync, Conflict, Where, Select, FirstOrDefaultAsync, Add, SaveChangesAsync
- **Endpoint:** HTTP attribute [Authorize(Roles = "Admin"), HttpPost("management/partners")]; controller route [ApiController, Route("api/delivery")]
- **Data/external effects:** Add row(s) in Users, persist EF changes via SaveChanges
- **Security:** [Authorize(Roles = "Admin"), HttpPost("management/partners")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

