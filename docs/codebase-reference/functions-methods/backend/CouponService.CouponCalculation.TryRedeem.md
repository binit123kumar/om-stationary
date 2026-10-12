# Nested record parser note — CouponCalculation.TryRedeem

- **Identity:** `CouponCalculation` is a positional result record, not a declaring type for `TryRedeem`.
- **Parser limitation:** The scanner associated the following `CouponService` class body with this preceding semicolon-terminated record, creating this duplicate callable entry.
- **Actual method report:** `CouponService.CouponService.TryRedeem.md` documents `CouponService.TryRedeem`.
- **Test evidence:** No test result is claimed by this parser note.
