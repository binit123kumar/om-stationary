# GeoDistance.Kilometers

- **Identity:** `GeoDistance.Kilometers` in `backend/OMStationary.Api/Services/GeoDistance.cs`.
- **Purpose (simple Hinglish):** Calculation/formatting helper hai; exact inputs aur returned value niche/source signature se milte hain.
- **Inputs:** `public static double Kilometers(double latitude1, double longitude1, double latitude2, double longitude2)`
- **Flow:** Observed return paths: earthRadiusKm * 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a))
- **Output:** Declared return type `static double`; observed returns: earthRadiusKm * 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a))
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

