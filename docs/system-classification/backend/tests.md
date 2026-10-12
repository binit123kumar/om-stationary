# Backend test source inventory

The API test project has two source files and 14 xUnit `[Fact]` methods. This is a static inventory only: the tests were **NOT RUN** for this documentation task, so no pass/fail result is asserted.

| Test class | Declared test methods | Source |
|---|---|---|
| `NotificationDeliveryTests` | `Email_WhenSmtpIsNotConfigured_DoesNotClaimSuccess`; `Sms_WhenProviderIsPlaceholder_DoesNotCallProviderOrClaimSuccess`; `Sms_TwilioAcceptsRequest_ReturnsAcceptedAndUsesInternationalPhone`; `Sms_WhenProviderRejectsRequest_DoesNotClaimAcceptance` | [`NotificationDeliveryTests.cs`](../../../backend/OMStationary.Api.Tests/NotificationDeliveryTests.cs) |
| `OrderStateMachineTests` | `NextStatuses_ValidTransitions_ReturnsCorrectStatuses`; `NextStatuses_ActuallyTerminalStatuses_ReturnEmpty`; `CanTransition_PreventsSkippingRequiredOrderStates`; `CanTransition_CancellationIsNotAllowedAfterHandover`; `Statuses_ContainsAllExpectedStatuses` | [`OrderStateMachineTests.cs`](../../../backend/OMStationary.Api.Tests/OrderStateMachineTests.cs) |
| `NotificationServiceTests` | `MessageFor_KnownEvent_ReturnsCorrectMessage`; `MessageFor_UnknownEvent_ReturnsNull` | [`OrderStateMachineTests.cs`](../../../backend/OMStationary.Api.Tests/OrderStateMachineTests.cs) |
| `WhatsAppOptionsTests` | `IsConfigured_AllFieldsSet_ReturnsTrue`; `IsConfigured_MissingFields_ReturnsFalse`; `Normalise_ValidPhone_ReturnsInternationalFormat` | [`OrderStateMachineTests.cs`](../../../backend/OMStationary.Api.Tests/OrderStateMachineTests.cs) |

`NotificationDeliveryTests` also declares `RecordingHandler.SendAsync`, a test helper rather than an `[Fact]`. The class/method names above come from source attributes and declarations; assertions and test outcomes should be read from the linked test files.

