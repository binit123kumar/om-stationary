using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

public sealed record GatewayPaymentIntent(bool Configured, string? Provider, string? ProviderOrderId, string? RedirectUrl, string Status, string? Detail,
    string? QrData = null, string? QrImageBase64 = null);
public sealed record GatewayPaymentStatus(bool Verified, bool Paid, string Status, string? ProviderReference, string? Amount, string? Detail);

public interface IPaymentProvider
{
    string Name { get; }
    bool IsConfigured { get; }
}

public interface ICodPaymentProvider : IPaymentProvider
{
    Payment CreatePendingPayment(int orderId, decimal amount);
}

public interface IPaymentGateway : IPaymentProvider
{
    Task<GatewayPaymentIntent> CreateOrder(decimal amount, string orderNumber, CancellationToken cancellationToken);
    Task<GatewayPaymentStatus> CheckStatus(string orderNumber, CancellationToken cancellationToken);
    bool VerifyCallback(string payload, string signature);
}

public sealed class CodPaymentProvider : ICodPaymentProvider
{
    public string Name => "COD";
    public bool IsConfigured => true;
    public Payment CreatePendingPayment(int orderId, decimal amount) => new()
    {
        OrderId = orderId, Provider = Name, Status = "Pending", Amount = amount, CreatedAt = DateTime.UtcNow
    };
}

// No gateway credentials/provider were supplied. This implementation always fails closed and never invents a success.
public sealed class UnconfiguredPaymentGateway(IConfiguration configuration) : IPaymentGateway
{
    public string Name => configuration["Payments:Provider"] ?? "None";
    public bool IsConfigured => configuration.GetValue<bool>("Payments:Enabled") && !string.Equals(Name, "None", StringComparison.OrdinalIgnoreCase);
    public Task<GatewayPaymentIntent> CreateOrder(decimal amount, string orderNumber, CancellationToken cancellationToken) =>
        Task.FromResult(new GatewayPaymentIntent(false, Name, null, null, "NotConfigured", "Online payment is not configured."));
    public Task<GatewayPaymentStatus> CheckStatus(string orderNumber, CancellationToken cancellationToken) =>
        Task.FromResult(new GatewayPaymentStatus(false, false, "NotConfigured", null, null, "Online payment is not configured."));
    public bool VerifyCallback(string payload, string signature) => false;
}

