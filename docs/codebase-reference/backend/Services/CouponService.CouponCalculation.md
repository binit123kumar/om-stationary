# CouponCalculation

- **Identity:** `record CouponCalculation` in `backend/OMStationary.Api/Services/CouponService.cs`.
- **Purpose (simple Hinglish):** Yeh coupon validation/calculation ka result carry karta hai: validity, reason, coupon ID/code, aur discount.
- **Positional record values:** `bool Valid`, `string? Reason`, `int CouponId`, `string Code`, `decimal Discount`.
- **Routes/security attributes:** None declared.
- **Declared properties:** Compiler-generated positional record properties: `Valid`, `Reason`, `CouponId`, `Code`, `Discount`.
- **Named callable methods:** None; `Calculate` and `TryRedeem` belong to `CouponService`.
- **Dependencies/data effects:** Immutable value record; no persistence or external side effect.
- **Test evidence:** NOT TESTED; no dedicated test method for this result record was identified.
- **Maintenance:** Keep consumers aligned with coupon validation and discount calculation outcomes.
