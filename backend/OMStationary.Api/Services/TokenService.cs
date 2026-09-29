using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

public sealed class TokenService(IConfiguration configuration)
{
    public string CreateAccessToken(ApplicationUser user)
    {
        var now = DateTimeOffset.UtcNow;
        var header = Base64Url(JsonSerializer.SerializeToUtf8Bytes(new { alg = "HS256", typ = "JWT" }));
        var payload = Base64Url(JsonSerializer.SerializeToUtf8Bytes(new
        {
            iss = configuration["Jwt:Issuer"] ?? "OMStationary.Api",
            aud = configuration["Jwt:Audience"] ?? "OMStationary.Web",
            sub = user.Id.ToString(), email = user.Email, role = user.Role,
            iat = now.ToUnixTimeSeconds(), exp = now.AddMinutes(15).ToUnixTimeSeconds()
        }));
        var unsigned = $"{header}.{payload}";
        var signature = HMACSHA256.HashData(Encoding.UTF8.GetBytes(SigningKey()), Encoding.ASCII.GetBytes(unsigned));
        return $"{unsigned}.{Base64Url(signature)}";
    }

    public static string NewRefreshToken() => Base64Url(RandomNumberGenerator.GetBytes(48));
    public static string HashToken(string token) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
    public static byte[] DecodeBase64Url(string input)
    {
        var value = input.Replace('-', '+').Replace('_', '/');
        value += new string('=', (4 - value.Length % 4) % 4);
        return Convert.FromBase64String(value);
    }
    public static string Base64Url(byte[] bytes) => Convert.ToBase64String(bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

    public static bool SignatureMatches(string key, string unsigned, byte[] supplied)
    {
        var expected = HMACSHA256.HashData(Encoding.UTF8.GetBytes(key), Encoding.ASCII.GetBytes(unsigned));
        return supplied.Length == expected.Length && CryptographicOperations.FixedTimeEquals(expected, supplied);
    }

    private string SigningKey() => configuration["Jwt:SigningKey"] ?? throw new InvalidOperationException("JWT signing key is not configured.");
}
