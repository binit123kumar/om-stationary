# WhatsAppOptionsTests.Normalise_ValidPhone_ReturnsInternationalFormat

- **Identity:** `WhatsAppOptionsTests.Normalise_ValidPhone_ReturnsInternationalFormat` in `backend/OMStationary.Api.Tests/OrderStateMachineTests.cs` (source line 126 ).
- **Purpose (simple Hinglish ):** Yeh test method source me diye gaye assertions se behavior verify karne ke liye hai; pass/fail result yahan claim nahi kiya gaya.
- **Inputs:** `public void Normalise_ValidPhone_ReturnsInternationalFormat( )`
- **Flow:** Calls/framework operations identified: Normalise
- **Output:** Declared return type `void`; observed returns: No return expression parsed (void/iterator/body parser limitation possible ).
- **Dependencies/calls:** Normalise
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** Assertion evidence (test source; execution not performed ): Assert.Equal("919525594357", WhatsAppOptions.Normalise("9525594357" ) ); Assert.Equal("919525594357", WhatsAppOptions.Normalise("919525594357" ) ); Assert.Equal("919525594357", WhatsAppOptions.Normalise("+919525594357" ) ); Assert.Equal("919525594357", WhatsAppOptions.Normalise("09525594357" ) ); Assert.Equal("919525594357", WhatsAppOptions.Normalise("0091 95255 94357" ) )
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


