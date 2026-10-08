using System.Net;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using OMStationary.Api.Services;

namespace OMStationary.Api.Tests;

public sealed class NotificationDeliveryTests
{
    [Fact]
    public async Task Email_WhenSmtpIsNotConfigured_DoesNotClaimSuccess()
    {
        var service = new EmailNotificationService(
            Options.Create(new EmailOptions()),
            NullLogger<EmailNotificationService>.Instance);

        var result = await service.SendAsync("audit@example.invalid", "test", "test");

        Assert.False(result.Attempted);
        Assert.False(result.Success);
        Assert.Equal("NotConfigured", result.Status);
    }

    [Fact]
    public async Task Sms_WhenProviderIsPlaceholder_DoesNotCallProviderOrClaimSuccess()
    {
        var handler = new RecordingHandler();
        using var http = new HttpClient(handler);
        var service = new SmsNotificationService(
            http,
            Options.Create(new SmsOptions
            {
                Enabled = true,
                Provider = "Your SMS Provider",
                AccountSid = "test-account",
                ApiKey = "test-key",
                SenderId = "+14155552671"
            }),
            NullLogger<SmsNotificationService>.Instance);

        var result = await service.SendAsync("9525594357", "test");

        Assert.False(result.Attempted);
        Assert.False(result.Success);
        Assert.Equal("NotConfigured", result.Status);
        Assert.Equal(0, handler.CallCount);
    }

    [Fact]
    public async Task Sms_TwilioAcceptsRequest_ReturnsAcceptedAndUsesInternationalPhone()
    {
        var handler = new RecordingHandler();
        using var http = new HttpClient(handler);
        var service = new SmsNotificationService(
            http,
            Options.Create(new SmsOptions
            {
                Enabled = true,
                Provider = "Twilio",
                AccountSid = "AC00000000000000000000000000000000",
                ApiKey = "test-token",
                SenderId = "+14155552671"
            }),
            NullLogger<SmsNotificationService>.Instance);

        var result = await service.SendAsync("09525594357", "order test");

        Assert.True(result.Attempted);
        Assert.True(result.Success);
        Assert.Equal("Accepted", result.Status);
        Assert.Equal(1, handler.CallCount);
        Assert.Equal(HttpMethod.Post, handler.Method);
        Assert.Contains("To=%2B919525594357", handler.FormBody);
        Assert.Equal("Basic", handler.AuthorizationScheme);
    }

    [Fact]
    public async Task Sms_WhenProviderRejectsRequest_DoesNotClaimAcceptance()
    {
        var handler = new RecordingHandler { ResponseStatus = HttpStatusCode.ServiceUnavailable };
        using var http = new HttpClient(handler);
        var service = new SmsNotificationService(
            http,
            Options.Create(new SmsOptions
            {
                Enabled = true,
                Provider = "Twilio",
                AccountSid = "AC00000000000000000000000000000000",
                ApiKey = "test-token",
                SenderId = "+14155552671"
            }),
            NullLogger<SmsNotificationService>.Instance);

        var result = await service.SendAsync("9525594357", "order test");

        Assert.True(result.Attempted);
        Assert.False(result.Success);
        Assert.Equal("Failed", result.Status);
    }

    private sealed class RecordingHandler : HttpMessageHandler
    {
        public HttpStatusCode ResponseStatus { get; set; } = HttpStatusCode.Created;
        public int CallCount { get; private set; }
        public HttpMethod? Method { get; private set; }
        public string FormBody { get; private set; } = "";
        public string? AuthorizationScheme { get; private set; }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            CallCount++;
            Method = request.Method;
            FormBody = await request.Content!.ReadAsStringAsync(cancellationToken);
            AuthorizationScheme = request.Headers.Authorization?.Scheme;
            return new HttpResponseMessage(ResponseStatus)
            {
                Content = new StringContent("{\"sid\":\"SM00000000000000000000000000000000\",\"status\":\"queued\"}")
            };
        }
    }
}
