# OrdersController.RupeesInWords

- **Identity:** `OrdersController.RupeesInWords` in `backend/OMStationary.Api/Controllers/OrdersController.cs`.
- **Purpose (simple Hinglish):** Calculation/formatting helper hai; exact inputs aur returned value niche/source signature se milte hain.
- **Inputs:** `private static string RupeesInWords(long value)`
- **Flow:** Branch checks: value < 20; value < 100) return $"{TensWords[value / 10]}{(value % 10 > 0 ? " " + AmountWords[value % 10] : ""; value < 1000) return $"{(value / 100 == 1 ? "One Hundred" : AmountWords[value / 100] + " Hundred")}{(value % 100 > 0 ? " " + RupeesInWords(value % 100) : ""; value < 100000) return $"{Thousand(value / 1000)}{(value % 1000 > 0 ? " " + RupeesInWords(value % 1000) : ""; value < 10000000) return $"{Lakh(value / 100000)}{(value % 100000 > 0 ? " " + IndianGroup(value % 100000) : "" | Observed return paths: AmountWords[value]; $"{TensWords[value / 10]}{(value % 10 > 0 ? " " + AmountWords[value % 10] : "")}"; $"{(value / 100 == 1 ? "One Hundred" : AmountWords[value / 100] + " Hundred")}{(value % 100 > 0 ? " " + RupeesInWords(value % 100) : "")}"; $"{Thousand(value / 1000)}{(value % 1000 > 0 ? " " + RupeesInWords(value % 1000) : "")}"; $"{Lakh(value / 100000)}{(value % 100000 > 0 ? " " + IndianGroup(value % 100000) : "")}"; $"{Crore(value / 10000000)}{(value % 10000000 > 0 ? " " + IndianGroup(value % 10000000) : "")}"
- **Output:** Declared return type `static string`; observed returns: AmountWords[value]; $"{TensWords[value / 10]}{(value % 10 > 0 ? " " + AmountWords[value % 10] : "")}"; $"{(value / 100 == 1 ? "One Hundred" : AmountWords[value / 100] + " Hundred")}{(value % 100 > 0 ? " " + RupeesInWords(value % 100) : "")}"; $"{Thousand(value / 1000)}{(value % 1000 > 0 ? " " + RupeesInWords(value % 1000) : "")}"; $"{Lakh(value / 100000)}{(value % 100000 > 0 ? " " + IndianGroup(value % 100000) : "")}"; $"{Crore(value / 10000000)}{(value % 10000000 > 0 ? " " + IndianGroup(value % 10000000) : "")}"
- **Dependencies/calls:** No recognized framework/service call token; inspect source for indirect dependencies.
- **Endpoint:** No HTTP verb attribute on this method in source; likely a helper/non-action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** No explicit action/controller authorization attribute; check global auth configuration in Program.cs.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

