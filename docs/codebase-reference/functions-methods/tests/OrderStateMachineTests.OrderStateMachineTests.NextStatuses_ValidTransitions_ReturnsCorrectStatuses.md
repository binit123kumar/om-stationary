# OrderStateMachineTests.NextStatuses_ValidTransitions_ReturnsCorrectStatuses

- **Identity:** `OrderStateMachineTests.NextStatuses_ValidTransitions_ReturnsCorrectStatuses` in `backend/OMStationary.Api.Tests/OrderStateMachineTests.cs` (source line 10 ).
- **Purpose (simple Hinglish ):** Yeh test method source me diye gaye assertions se behavior verify karne ke liye hai; pass/fail result yahan claim nahi kiya gaya.
- **Inputs:** `public void NextStatuses_ValidTransitions_ReturnsCorrectStatuses( )`
- **Flow:** Calls/framework operations identified: NextStatuses
- **Output:** Declared return type `void`; observed returns: No return expression parsed (void/iterator/body parser limitation possible ).
- **Dependencies/calls:** NextStatuses
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** No local exception handler/explicit error response detected by source scan; framework-level handling may apply.
- **Test evidence:** Assertion evidence (test source; execution not performed ): Assert.Contains("Confirmed", OrderStateMachine.NextStatuses("Pending" ) ); Assert.Contains("Preparing", OrderStateMachine.NextStatuses("Confirmed" ) ); Assert.Contains("Ready for Pickup", OrderStateMachine.NextStatuses("Preparing" ) ); Assert.Contains("Out for Delivery", OrderStateMachine.NextStatuses("Ready for Pickup" ) ); Assert.Contains("Delivered", OrderStateMachine.NextStatuses("Out for Delivery" ) )
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.


