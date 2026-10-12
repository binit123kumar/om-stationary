# OrderStateMachineTests (test class)

- **Identity:** Test class `OrderStateMachineTests` in `backend/OMStationary.Api.Tests/OrderStateMachineTests.cs`.
- **Purpose (simple Hinglish):** Yeh class backend behavior ko xUnit methods se exercise/assert karne ke liye hai; execution result yahan available nahi hai.
- **Test methods/helpers identified:** NextStatuses_ValidTransitions_ReturnsCorrectStatuses, NextStatuses_ActuallyTerminalStatuses_ReturnEmpty, CanTransition_PreventsSkippingRequiredOrderStates, CanTransition_CancellationIsNotAllowedAfterHandover, Statuses_ContainsAllExpectedStatuses
- **Assertions used:** Assert.Contains(, Assert.Empty(, Assert.Equal(, Assert.False(, Assert.True(
- **Inputs/flow/output:** Per-method report ke Identity/Input/Flow/Output sections me actual source signatures aur assertions listed hain.
- **Test evidence:** Source assertions are evidence of intended checks only. **NOT TESTED**: no test run is claimed.
- **Maintenance:** Update the per-method reports when tests change; add integration coverage for API, EF, and external-provider behavior where required.

