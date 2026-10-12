# Nested record parser note — CouponCalculation.Calculate

- **Identity:** `CouponCalculation` is a positional result record, not a declaring type for `Calculate`.
- **Parser limitation:** The scanner associated the following `CouponService` class body with this preceding semicolon-terminated record, creating this duplicate callable entry.
- **Actual method report:** `CouponService.CouponService.Calculate.md` documents `CouponService.Calculate`.
- **Test evidence:** No test result is claimed by this parser note.
