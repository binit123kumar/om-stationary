# AdminCouponsController.CouponState

- **Identity:** `AdminCouponsController.CouponState` in `backend/OMStationary.Api/Controllers/AdminCatalogueController.cs`.
- **Purpose (simple Hinglish):** `CouponState` operation ka source-defined flow hai; inputs, calls, output aur side effects neeche listed hain.
- **Inputs:** `internal static string CouponState(Coupon coupon, DateTime now)`
- **Flow:** Branch checks: !coupon.IsActive; coupon.UsageCount >= coupon.UsageLimit; now < coupon.StartsAt; now > coupon.ExpiresAt | Observed return paths: "Inactive"; "Limit reached"; "Scheduled"; "Expired"; "Active"
- **Output:** Declared return type `static string`; observed returns: "Inactive"; "Limit reached"; "Scheduled"; "Expired"; "Active"
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** No HTTP verb attribute on this method in source; likely a helper/non-action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** [ApiController, Authorize(Roles = "Admin"), Route("api/admin/coupons")]
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

