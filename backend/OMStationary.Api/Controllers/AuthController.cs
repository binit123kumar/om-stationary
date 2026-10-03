using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(OmDbContext db, TokenService tokens, IWhatsAppNotificationService whatsapp) : ControllerBase
{
    private readonly PasswordHasher<ApplicationUser> _passwords = new();

    [HttpPost("register"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var phone = request.Phone.Trim();
        if (await db.Users.AnyAsync(x => x.Email == email || x.Phone == phone))
            return Conflict(new { detail = "An account already exists for this email or mobile number." });
        var roleId = await db.Roles.Where(x => x.Name == "Customer").Select(x => (int?)x.Id).FirstOrDefaultAsync();
        if (roleId is null) return Problem("Customer registration is not configured.", statusCode: 503);
        var user = new ApplicationUser { Email = email, Phone = phone, Role = "Customer", RoleId = roleId };
        user.PasswordHash = _passwords.HashPassword(user, request.Password);
        db.Users.Add(user);
        db.CustomerProfiles.Add(new CustomerProfile { UserId = user.Id, FullName = request.FullName.Trim() });
        await db.SaveChangesAsync();
        // Admin heads-up about a new customer. Only the name and contact details the customer just
        // supplied are sent, and the alert is best-effort: registration must succeed regardless.
        try { await whatsapp.NotifyNewCustomerAsync(request.FullName.Trim(), user.Email, user.Phone); } catch (Exception) { /* logged as a failed attempt */ }
        return await CreateSession(user);
    }

    [HttpPost("login"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        // The storefront labels this field "Email or mobile", so both are accepted. The lookup is a
        // single OR query on a normalised value and the password is still verified with the stored
        // hash, so nothing about the existing authentication policy is relaxed.
        var identifier = request.Email.Trim().ToLowerInvariant();
        var phone = request.Email.Trim();
        var looksLikeEmail = identifier.Contains('@') && identifier.Contains('.');
        var looksLikePhone = System.Text.RegularExpressions.Regex.IsMatch(phone, @"^[6-9]\d{9}$");
        if (!looksLikeEmail && !looksLikePhone)
            return BadRequest(new { detail = "Enter a valid email address or 10 digit mobile number." });
        var user = await db.Users.FirstOrDefaultAsync(x => x.IsActive &&
            (x.Email == identifier || x.Phone == phone));
        if (user is null || _passwords.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            return Unauthorized(new { detail = "Email or mobile number, and password are incorrect." });
        return await CreateSession(user);
    }

    [HttpPost("refresh"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> Refresh(RefreshRequest request)
    {
        var hash = TokenService.HashToken(request.RefreshToken);
        var stored = await db.RefreshTokens.FirstOrDefaultAsync(x => x.TokenHash == hash && x.RevokedAt == null && x.ExpiresAt > DateTime.UtcNow);
        if (stored is null) return Unauthorized(new { detail = "Refresh token is invalid or expired." });
        var user = await db.Users.FirstOrDefaultAsync(x => x.Id == stored.UserId && x.IsActive);
        if (user is null) return Unauthorized();
        stored.RevokedAt = DateTime.UtcNow;
        return await CreateSession(user);
    }

    [Authorize, HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshRequest? request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userId, out var id)) return Unauthorized();
        var now = DateTime.UtcNow;
        var tokensToRevoke = db.RefreshTokens.Where(x => x.UserId == id && x.RevokedAt == null);
        if (!string.IsNullOrWhiteSpace(request?.RefreshToken))
        {
            var hash = TokenService.HashToken(request.RefreshToken);
            tokensToRevoke = tokensToRevoke.Where(x => x.TokenHash == hash);
        }
        await tokensToRevoke.ExecuteUpdateAsync(x => x.SetProperty(t => t.RevokedAt, now));
        return NoContent();
    }

    [Authorize, HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        if (!Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id)) return Unauthorized();
        var user = await db.Users.AsNoTracking().Where(x => x.Id == id && x.IsActive)
            .Select(x => new { x.Id, x.Email, x.Phone, x.Role, FullName = db.CustomerProfiles.Where(p => p.UserId == x.Id).Select(p => p.FullName).FirstOrDefault() })
            .FirstOrDefaultAsync();
        return user is null ? Unauthorized() : Ok(user);
    }

    private async Task<IActionResult> CreateSession(ApplicationUser user)
    {
        var refresh = TokenService.NewRefreshToken();
        db.RefreshTokens.Add(new RefreshToken
        {
            UserId = user.Id, TokenHash = TokenService.HashToken(refresh), ExpiresAt = DateTime.UtcNow.AddDays(30)
        });
        await db.SaveChangesAsync();
        var name = await db.CustomerProfiles.Where(x => x.UserId == user.Id).Select(x => x.FullName).FirstOrDefaultAsync();
        return Ok(new
        {
            accessToken = tokens.CreateAccessToken(user), refreshToken = refresh,
            user = new { user.Id, user.Email, user.Phone, user.Role, fullName = name }
        });
    }
}

