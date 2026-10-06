using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OMStationary.Api.Data;
using OMStationary.Api.Models;
using OMStationary.Api.Services;
using Xunit;

namespace OMStationary.Api.Tests;

public class OrderStateMachineTests
{
    [Fact]
    public void NextStatuses_ValidTransitions_ReturnsCorrectStatuses()
    {
        // Test valid transitions
        Assert.Contains("Confirmed", OrderStateMachine.NextStatuses("Pending"));
        Assert.Contains("Preparing", OrderStateMachine.NextStatuses("Confirmed"));
        Assert.Contains("Ready for Pickup", OrderStateMachine.NextStatuses("Preparing"));
        Assert.Contains("Out for Delivery", OrderStateMachine.NextStatuses("Ready for Pickup"));
        Assert.Contains("Delivered", OrderStateMachine.NextStatuses("Out for Delivery"));
    }

    [Fact]
    public void NextStatuses_ActuallyTerminalStatuses_ReturnEmpty()
    {
        // Delivered orders can still enter the refund flow. Cancelled and Refunded are terminal.
        Assert.Empty(OrderStateMachine.NextStatuses("Cancelled"));
        Assert.Empty(OrderStateMachine.NextStatuses("Refunded"));
        Assert.Equal(new[] { "RefundPending" }, OrderStateMachine.NextStatuses("Delivered"));
        Assert.Equal(new[] { "Refunded" }, OrderStateMachine.NextStatuses("RefundPending"));
    }

    [Fact]
    public void CanTransition_PreventsSkippingRequiredOrderStates()
    {
        Assert.False(OrderStateMachine.CanTransition("Placed", "Delivered"));
        Assert.True(OrderStateMachine.CanTransition("Placed", "Confirmed"));
        Assert.True(OrderStateMachine.CanTransition("Confirmed", "Preparing"));
        Assert.True(OrderStateMachine.CanTransition("Preparing", "Ready for Pickup"));
        Assert.True(OrderStateMachine.CanTransition("Ready for Pickup", "Out for Delivery"));
        Assert.True(OrderStateMachine.CanTransition("Out for Delivery", "Delivered"));
        Assert.True(OrderStateMachine.CanTransition("Ready for Pickup", "Picked Up"));
        Assert.True(OrderStateMachine.CanTransition("Picked Up", "Delivered"));
        Assert.False(OrderStateMachine.CanTransition("Picked Up", "Out for Delivery"));
    }

    [Fact]
    public void CanTransition_CancellationIsNotAllowedAfterHandover()
    {
        Assert.True(OrderStateMachine.CanTransition("Placed", "Cancelled"));
        Assert.False(OrderStateMachine.CanTransition("Picked Up", "Cancelled"));
        Assert.False(OrderStateMachine.CanTransition("Delivered", "Cancelled"));
    }

    [Fact]
    public void Statuses_ContainsAllExpectedStatuses()
    {
        // Verify all expected statuses exist
        var expectedStatuses = new[]
        {
            "Pending", "Placed", "Confirmed", "Accepted", "Preparing",
            "Ready for Pickup", "Picked Up", "Out for Delivery",
            "Delivered", "Cancelled", "Delivery Failed", "RefundPending", "Refunded"
        };

        foreach (var status in expectedStatuses)
        {
            Assert.Contains(status, OrderStateMachine.Statuses);
        }
    }
}

public class NotificationServiceTests
{
    [Fact]
    public void MessageFor_KnownEvent_ReturnsCorrectMessage()
    {
        // Test known event messages
        Assert.Equal("We have received your order.", NotificationService.MessageFor("Placed"));
        Assert.Equal("Your order has been confirmed by OM Stationary.", NotificationService.MessageFor("Confirmed"));
        Assert.Equal("Your order is being prepared.", NotificationService.MessageFor("Preparing"));
        Assert.Equal("Your order has been delivered.", NotificationService.MessageFor("Delivered"));
    }

    [Fact]
    public void MessageFor_UnknownEvent_ReturnsNull()
    {
        // Unknown event should return null
        Assert.Null(NotificationService.MessageFor("UnknownEvent"));
    }
}

public class WhatsAppOptionsTests
{
    [Fact]
    public void IsConfigured_AllFieldsSet_ReturnsTrue()
    {
        var options = new WhatsAppOptions
        {
            Enabled = true,
            Provider = "WhatsApp Business Cloud API",
            AdminNumber = "919525594357",
            PhoneNumberId = "123456789",
            BusinessAccountId = "987654321",
            AccessToken = "test_token",
            ApiVersion = "v21.0"
        };

        Assert.True(options.IsConfigured);
    }

    [Fact]
    public void IsConfigured_MissingFields_ReturnsFalse()
    {
        var options = new WhatsAppOptions
        {
            Enabled = true,
            Provider = "WhatsApp Business Cloud API",
            AdminNumber = "",
            PhoneNumberId = "",
            BusinessAccountId = "",
            AccessToken = "",
            ApiVersion = ""
        };

        Assert.False(options.IsConfigured);
    }

    [Fact]
    public void Normalise_ValidPhone_ReturnsInternationalFormat()
    {
        // Test phone number normalization
        Assert.Equal("919525594357", WhatsAppOptions.Normalise("9525594357"));
        Assert.Equal("919525594357", WhatsAppOptions.Normalise("919525594357"));
        Assert.Equal("919525594357", WhatsAppOptions.Normalise("+919525594357"));
        Assert.Equal("919525594357", WhatsAppOptions.Normalise("09525594357"));
        Assert.Equal("919525594357", WhatsAppOptions.Normalise("0091 95255 94357"));
    }
}
