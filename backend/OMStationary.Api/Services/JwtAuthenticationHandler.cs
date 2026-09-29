using System.Security.Claims;
using System.Text.Json;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace OMStationary.Api.Services;

public sealed class JwtAuthenticationHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder,
    IConfiguration configuration) : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
{
    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var header = Request.Headers.Authorization.ToString();
        if (string.IsNullOrWhiteSpace(header)) return Task.FromResult(AuthenticateResult.NoResult());
        if (!header.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase)) return Task.FromResult(AuthenticateResult.Fail("Bearer token required."));
        var token = header[7..].Trim();
        if (token.Length > 8192) return Task.FromResult(AuthenticateResult.Fail("Token is too large."));
        var parts = token.Split('.');
        if (parts.Length != 3) return Task.FromResult(AuthenticateResult.Fail("Malformed bearer token."));

        try
        {
            using var headerJson = JsonDocument.Parse(TokenService.DecodeBase64Url(parts[0]));
            using var payloadJson = JsonDocument.Parse(TokenService.DecodeBase64Url(parts[1]));
            var tokenHeader = headerJson.RootElement;
            var payload = payloadJson.RootElement;
            if (!tokenHeader.TryGetProperty("alg", out var alg) || alg.GetString() != "HS256")
                return Task.FromResult(AuthenticateResult.Fail("Unsupported token algorithm."));
            var key = configuration["Jwt:SigningKey"];
            if (string.IsNullOrWhiteSpace(key) || !TokenService.SignatureMatches(key, $"{parts[0]}.{parts[1]}", TokenService.DecodeBase64Url(parts[2])))
                return Task.FromResult(AuthenticateResult.Fail("Invalid token signature."));
            var issuer = configuration["Jwt:Issuer"] ?? "OMStationary.Api";
            var audience = configuration["Jwt:Audience"] ?? "OMStationary.Web";
            if (!payload.TryGetProperty("iss", out var iss) || iss.GetString() != issuer ||
                !payload.TryGetProperty("aud", out var aud) || aud.GetString() != audience ||
                !payload.TryGetProperty("sub", out var sub) || !Guid.TryParse(sub.GetString(), out _) ||
                !payload.TryGetProperty("role", out var role) || role.GetString() is not { Length: > 0 } roleValue ||
                !payload.TryGetProperty("exp", out var exp) || !exp.TryGetInt64(out var expiry))
                return Task.FromResult(AuthenticateResult.Fail("Invalid token claims."));
            if (DateTimeOffset.FromUnixTimeSeconds(expiry) < DateTimeOffset.UtcNow.AddSeconds(-30))
                return Task.FromResult(AuthenticateResult.Fail("Token has expired."));

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, sub.GetString()!),
                new(ClaimTypes.Role, roleValue)
            };
            if (payload.TryGetProperty("email", out var email) && email.ValueKind == JsonValueKind.String)
                claims.Add(new Claim(ClaimTypes.Email, email.GetString()!));
            var identity = new ClaimsIdentity(claims, Scheme.Name, ClaimTypes.Name, ClaimTypes.Role);
            var ticket = new AuthenticationTicket(new ClaimsPrincipal(identity), Scheme.Name);
            return Task.FromResult(AuthenticateResult.Success(ticket));
        }
        catch (Exception error) when (error is FormatException or JsonException or ArgumentOutOfRangeException or InvalidOperationException)
        {
            return Task.FromResult(AuthenticateResult.Fail("Malformed bearer token."));
        }
    }
}
