# TaxCalculator.Calculate

- **Identity:** `TaxCalculator.Calculate` in `backend/OMStationary.Api/Services/TaxCalculator.cs`.
- **Purpose (simple Hinglish):** Calculation/formatting helper hai; exact inputs aur returned value niche/source signature se milte hain.
- **Inputs:** `public static decimal Calculate(decimal taxableAmount, decimal ratePercent)`
- **Flow:** Branch checks: ratePercent < 0 || ratePercent > 100) throw new InvalidOperationException("Tax:RatePercent must be between 0 and 100." | Observed return paths: Math.Round(Math.Max(0m, taxableAmount) * ratePercent / 100m, 2, MidpointRounding.AwayFromZero)
- **Output:** Declared return type `static decimal`; observed returns: Math.Round(Math.Max(0m, taxableAmount) * ratePercent / 100m, 2, MidpointRounding.AwayFromZero)
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** Uses explicit HTTP/error/exception branches visible in return paths.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

