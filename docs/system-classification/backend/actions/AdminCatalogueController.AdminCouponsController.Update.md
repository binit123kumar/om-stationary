# AdminCouponsController.Update

- **Identity:** `AdminCouponsController.Update` in `backend/OMStationary.Api/Controllers/AdminCatalogueController.cs`.
- **Source implementation:** [`AdminCatalogueController.cs`](../../../../backend/OMStationary.Api/Controllers/AdminCatalogueController.cs).
- **Purpose (simple Hinglish):** Existing state ya collection ko source rules ke mutabik update karna hai; exact target/conditions source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Update(int id, [FromBody] CouponWriteRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: NotFound, BadRequest, Add, SaveChangesAsync, Ok | Observed return paths: NotFound(new { detail = "That coupon was not found." }); BadRequest(new { detail = "Discount type must be Percentage or Fixed." }); BadRequest(new { detail = "Percentage discount cannot exceed 100." }); BadRequest(new { detail = "Discount value must be greater than zero." }); BadRequest(new { detail = "Expiry must be after the start date." }); Ok(new
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: NotFound(new { detail = "That coupon was not found." }); BadRequest(new { detail = "Discount type must be Percentage or Fixed." }); BadRequest(new { detail = "Percentage discount cannot exceed 100." }); BadRequest(new { detail = "Discount value must be greater than zero." }); BadRequest(new { detail = "Expiry must be after the start date." }); Ok(new
- **Dependencies/calls:** NotFound, BadRequest, Add, SaveChangesAsync, Ok
- **Endpoint:** HTTP attribute [HttpPut("{id:int}")]; controller route [ApiController, Authorize(Roles = "Admin"), Route("api/admin/coupons")]
- **Data/external effects:** Add row(s) in AuditLogs, persist EF changes via SaveChanges
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/coupons")]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


