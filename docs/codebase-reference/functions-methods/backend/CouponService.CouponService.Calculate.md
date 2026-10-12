# CouponService.Calculate

- **Identity:** `CouponService.Calculate` in `backend/OMStationary.Api/Services/CouponService.cs`.
- **Purpose (simple Hinglish):** Coupon code, subtotal, active dates, usage limit aur discount rules check karke eligible discount calculate karta hai.
- **Inputs:** `public async Task<CouponCalculation> Calculate(string code, decimal subtotal, CancellationToken cancellationToken = default)`
- **Flow:** Queries the normalized code; returns invalid results for missing/inactive coupon, dates, usage cap, minimum subtotal, or unsupported/invalid discount configuration; computes the eligible amount and returns a valid calculation. A cancellation token is passed to the EF query.
- **Output:** Declared return type `Task<CouponCalculation>`; returns validity, reason, coupon ID, normalized code and discount.
- **Dependencies/calls:** FirstOrDefaultAsync
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.
