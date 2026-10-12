# CouponsController.Create

- **Identity:** `CouponsController.Create` in `backend/OMStationary.Api/Controllers/CouponsController.cs`.
- **Purpose (simple Hinglish):** Request ya input se naya record/resource create karna hai; validation, persistence aur result source flow mein defined hain.
- **Inputs:** `public async Task<IActionResult> Create(CouponCreateRequest request)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: BadRequest, AnyAsync, Conflict, Add, SaveChangesAsync | Observed return paths: BadRequest("Discount type must be Percentage or Fixed."); BadRequest("Percentage discount cannot exceed 100."); BadRequest("Coupon expiry must be after its start and in the future."); Conflict(new { detail = "Coupon code already exists." }); Created($"/api/coupons/{coupon.Id}", new { coupon.Id, coupon.Code, coupon.DiscountType, coupon.DiscountValue, coupon.IsActive })
- **Output:** Declared return type `async Task<IActionResult>`; observed returns: BadRequest("Discount type must be Percentage or Fixed."); BadRequest("Percentage discount cannot exceed 100."); BadRequest("Coupon expiry must be after its start and in the future."); Conflict(new { detail = "Coupon code already exists." }); Created($"/api/coupons/{coupon.Id}", new { coupon.Id, coupon.Code, coupon.DiscountType, coupon.DiscountValue, coupon.IsActive })
- **Dependencies/calls:** BadRequest, AnyAsync, Conflict, Add, SaveChangesAsync
- **Endpoint:** HTTP attribute [Authorize(Roles = "Admin"), HttpPost]; controller route [ApiController, Route("api/coupons")]
- **Data/external effects:** Add row(s) in Coupons, persist EF changes via SaveChanges
- **Security:** [Authorize(Roles = "Admin"), HttpPost]
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

