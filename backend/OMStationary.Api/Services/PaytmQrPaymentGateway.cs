using System.Globalization;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace OMStationary.Api.Services;

public sealed class PaytmQrPaymentGateway(HttpClient http, IConfiguration configuration) : IPaymentGateway
{
    private const string StagingBase = "https://securestage.paytmpayments.com";
    private const string ProductionBase = "https://secure.paytmpayments.com";
    private string Mid => configuration["Payments:Paytm:MerchantId"]?.Trim() ?? "";
    private string MerchantKey => configuration["Payments:Paytm:MerchantKey"] ?? "";
    private string PosId => configuration["Payments:Paytm:PosId"]?.Trim() ?? "";
    private string ClientId => configuration["Payments:Paytm:ClientId"]?.Trim() ?? "";
    private bool IsProduction => string.Equals(configuration["Payments:Paytm:Environment"], "Production", StringComparison.OrdinalIgnoreCase);
    private string BaseUrl => IsProduction ? ProductionBase : StagingBase;
    public string Name => "Paytm";
    public bool IsConfigured => configuration.GetValue<bool>("Payments:Enabled") &&
        string.Equals(configuration["Payments:Provider"], "Paytm", StringComparison.OrdinalIgnoreCase) &&
        !string.IsNullOrWhiteSpace(Mid) && !string.IsNullOrWhiteSpace(PosId) && Encoding.UTF8.GetByteCount(MerchantKey) == 16;

    public async Task<GatewayPaymentIntent> CreateOrder(decimal amount, string orderNumber, CancellationToken cancellationToken)
    {
        if (!IsConfigured) return new(false, Name, null, null, "NotConfigured", "Paytm dynamic QR credentials are not configured.");
        var body = new Dictionary<string, object?>
        {
            ["mid"] = Mid,
            ["orderId"] = orderNumber,
            ["amount"] = amount.ToString("0.00", CultureInfo.InvariantCulture),
            ["businessType"] = "UPI_QR_CODE",
            ["posId"] = PosId,
            ["orderDetails"] = "OM Stationary order " + orderNumber,
            ["imageRequired"] = true,
            ["displayName"] = "OM Stationary"
        };
        var bodyJson = JsonSerializer.Serialize(body);
        var signature = PaytmChecksum.Generate(bodyJson, MerchantKey);
        var head = new Dictionary<string, string>
        {
            ["version"] = "v1", ["channelId"] = "WEB", ["signature"] = signature
        };
        if (!string.IsNullOrWhiteSpace(ClientId)) head["clientId"] = ClientId;
        using var response = await http.PostAsJsonAsync(BaseUrl + "/paymentservices/qr/create", new { body, head }, cancellationToken);
        if (!response.IsSuccessStatusCode) return new(false, Name, null, null, "ProviderError", "Paytm could not create a payment QR. Try again.");
        using var document = JsonDocument.Parse(await response.Content.ReadAsStringAsync(cancellationToken));
        var root = document.RootElement;
        var responseBody = root.TryGetProperty("body", out var b) ? b : default;
        var responseHead = root.TryGetProperty("head", out var h) ? h : default;
        var responseSignature = responseHead.ValueKind == JsonValueKind.Object && responseHead.TryGetProperty("signature", out var sig) ? sig.GetString() : null;
        if (responseBody.ValueKind != JsonValueKind.Object || !PaytmChecksum.Verify(responseBody.GetRawText(), MerchantKey, responseSignature))
            return new(false, Name, null, null, "InvalidProviderResponse", "Paytm response verification failed.");
        var result = responseBody.TryGetProperty("resultInfo", out var info) ? info : default;
        var resultStatus = result.ValueKind == JsonValueKind.Object && result.TryGetProperty("resultStatus", out var status) ? status.GetString() : null;
        var resultCode = result.ValueKind == JsonValueKind.Object && result.TryGetProperty("resultCode", out var code) ? code.GetString() : null;
        if (!string.Equals(resultStatus, "SUCCESS", StringComparison.OrdinalIgnoreCase) || !string.Equals(resultCode, "QR_0001", StringComparison.OrdinalIgnoreCase))
            return new(false, Name, null, null, "ProviderError", "Paytm did not create a payment QR for this order.");
        var qrId = responseBody.TryGetProperty("qrCodeId", out var qr) ? qr.GetString() : null;
        var qrData = responseBody.TryGetProperty("qrData", out var data) ? data.GetString() : null;
        var image = responseBody.TryGetProperty("image", out var imageElement) ? imageElement.GetString() : null;
        if (string.IsNullOrWhiteSpace(qrId) || string.IsNullOrWhiteSpace(image))
            return new(false, Name, null, null, "InvalidProviderResponse", "Paytm returned an incomplete QR response.");
        return new(true, Name, qrId, null, "Pending", null, qrData, image);
    }

    public async Task<GatewayPaymentStatus> CheckStatus(string orderNumber, CancellationToken cancellationToken)
    {
        if (!IsConfigured) return new(false, false, "NotConfigured", null, null, "Paytm is not configured.");
        var body = new Dictionary<string, string> { ["mid"] = Mid, ["orderId"] = orderNumber };
        var bodyJson = JsonSerializer.Serialize(body);
        var signature = PaytmChecksum.Generate(bodyJson, MerchantKey);
        using var response = await http.PostAsJsonAsync(BaseUrl + "/v3/order/status", new { body, head = new { signature } }, cancellationToken);
        if (!response.IsSuccessStatusCode) return new(false, false, "ProviderError", null, null, "Could not verify payment with Paytm yet.");
        using var document = JsonDocument.Parse(await response.Content.ReadAsStringAsync(cancellationToken));
        var root = document.RootElement;
        var responseBody = root.TryGetProperty("body", out var b) ? b : default;
        var responseHead = root.TryGetProperty("head", out var h) ? h : default;
        var responseSignature = responseHead.ValueKind == JsonValueKind.Object && responseHead.TryGetProperty("signature", out var sig) ? sig.GetString() : null;
        if (responseBody.ValueKind != JsonValueKind.Object || !PaytmChecksum.Verify(responseBody.GetRawText(), MerchantKey, responseSignature))
            return new(false, false, "InvalidProviderResponse", null, null, "Paytm status signature verification failed.");

        var returnedOrder = responseBody.TryGetProperty("orderId", out var oid) ? oid.GetString() : null;
        var returnedMid = responseBody.TryGetProperty("mid", out var mid) ? mid.GetString() : null;
        var amount = responseBody.TryGetProperty("txnAmount", out var txnAmount) ? txnAmount.GetString() : null;
        var txnId = responseBody.TryGetProperty("txnId", out var txn) ? txn.GetString() : null;
        var info = responseBody.TryGetProperty("resultInfo", out var ri) ? ri : default;
        var status = info.ValueKind == JsonValueKind.Object && info.TryGetProperty("resultStatus", out var rs) ? rs.GetString() : null;
        if (!string.Equals(returnedOrder, orderNumber, StringComparison.Ordinal) || !string.Equals(returnedMid, Mid, StringComparison.Ordinal))
            return new(false, false, "OrderMismatch", txnId, amount, "Paytm status did not match this order.");
        return new(true, string.Equals(status, "TXN_SUCCESS", StringComparison.OrdinalIgnoreCase), status ?? "Unknown", txnId, amount, null);
    }

    public bool VerifyCallback(string payload, string signature) => PaytmChecksum.Verify(payload, MerchantKey, signature);
}

internal static class PaytmChecksum
{
    private const string Iv = "@@@@&&&&####$$$$";
    private const string SaltAlphabet = "9876543210ZYXWVUTSRQPONMLKJIHGFEDCBAabcdefghijklmnopqrstuvwxyz!@#$&_";

    public static string Generate(string payload, string key)
    {
        ValidateKey(key);
        Span<byte> random = stackalloc byte[4];
        RandomNumberGenerator.Fill(random);
        var salt = new string(random.ToArray().Select(b => SaltAlphabet[b % SaltAlphabet.Length]).ToArray());
        var hash = Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(payload + "|" + salt))) + salt;
        using var aes = Aes.Create();
        aes.Key = Encoding.UTF8.GetBytes(key);
        aes.IV = Encoding.UTF8.GetBytes(Iv);
        aes.Mode = CipherMode.CBC;
        aes.Padding = PaddingMode.PKCS7;
        using var encryptor = aes.CreateEncryptor();
        return Convert.ToBase64String(encryptor.TransformFinalBlock(Encoding.UTF8.GetBytes(hash), 0, Encoding.UTF8.GetByteCount(hash)));
    }

    public static bool Verify(string payload, string key, string? signature)
    {
        if (string.IsNullOrWhiteSpace(signature) || Encoding.UTF8.GetByteCount(key) != 16) return false;
        try
        {
            using var aes = Aes.Create();
            aes.Key = Encoding.UTF8.GetBytes(key);
            aes.IV = Encoding.UTF8.GetBytes(Iv);
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;
            var encoded = Convert.FromBase64String(signature);
            using var decryptor = aes.CreateDecryptor();
            var hashAndSalt = Encoding.UTF8.GetString(decryptor.TransformFinalBlock(encoded, 0, encoded.Length));
            if (hashAndSalt.Length < 5) return false;
            var salt = hashAndSalt[^4..];
            var expected = Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(payload + "|" + salt))) + salt;
            return CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(expected), Encoding.UTF8.GetBytes(hashAndSalt));
        }
        catch (CryptographicException) { return false; }
        catch (FormatException) { return false; }
    }

    private static void ValidateKey(string key)
    {
        if (Encoding.UTF8.GetByteCount(key) != 16) throw new InvalidOperationException("Paytm MerchantKey must be exactly 16 UTF-8 bytes.");
    }
}
