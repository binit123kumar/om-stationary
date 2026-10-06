using System.Globalization;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

[ApiController, Route("api/payments")]
public sealed class PaymentsController(OmDbContext db, IConfiguration configuration,
    NotificationService notifications, StoreSettingsService storeSettings) : ControllerBase
{
    /// <summary>
    /// Single source of truth for what the storefront may offer at checkout. The UI renders both
    /// payment choices from this response and never decides on its own that a payment succeeded.
    /// </summary>
    [HttpGet("options")]
    public async Task<IActionResult> Options(CancellationToken cancellationToken)
    {
        static string Configured(string? value)
        {
            var clean = value?.Trim() ?? "";
            return clean.Length == 0 || clean.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase) ? "" : clean;
        }
        var vpa = Configured(configuration["Payments:Upi:Vpa"]);
        var taxRate = await storeSettings.GetTaxRatePercentAsync(cancellationToken);
        return Ok(new
        {
            cashOnDelivery = true,
            onlineUpi = configuration.GetValue<bool>("Payments:Enabled") &&
                string.Equals(configuration["Payments:Provider"], "UPI", StringComparison.OrdinalIgnoreCase) && vpa.Length > 0,
            onlineProvider = "UPI",
            // A blank VPA must be reported as unconfigured, never replaced with a placeholder the
            // customer could scan.
            upiVpa = vpa,
            upiPayeeName = Configured(configuration["Payments:Upi:PayeeName"]),
            verificationAvailable = false,
            taxRatePercent = taxRate
        });
    }

    [HttpPost("orders/{orderNumber}/intent"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> CreateIntent(string orderNumber, CancellationToken cancellationToken)
    {
        var order = await db.Orders.Include(x => x.Items).FirstOrDefaultAsync(x => x.OrderNumber == orderNumber, cancellationToken);
        if (order is null || !CanAccess(order)) return NotFound();
        if (!order.PaymentMethod.Equals("UPI", StringComparison.OrdinalIgnoreCase)) return BadRequest("This order does not use UPI payment.");
        if (order.PaymentStatus == "Paid") return Ok(new { status = "Paid", order.OrderNumber });
        var vpa = configuration["Payments:Upi:Vpa"]?.Trim() ?? "";
        var payeeName = configuration["Payments:Upi:PayeeName"]?.Trim() ?? "OM Stationary";
        if (!configuration.GetValue<bool>("Payments:Enabled") ||
            !string.Equals(configuration["Payments:Provider"], "UPI", StringComparison.OrdinalIgnoreCase) || vpa.Length == 0)
            return Problem("UPI payment initiation is not configured. Your order remains pending.", statusCode: 503);
        var payment = await db.Payments.FirstOrDefaultAsync(x => x.OrderId == order.Id && x.Provider == "UPI", cancellationToken);
        if (payment is null) return Problem("Payment record is missing for this order.", statusCode: 409);
        var query = string.Join("&", new[]
        {
            "pa=" + Uri.EscapeDataString(vpa),
            "pn=" + Uri.EscapeDataString(payeeName),
            "am=" + Uri.EscapeDataString(order.TotalAmount.ToString("0.00", CultureInfo.InvariantCulture)),
            "cu=INR",
            "tn=" + Uri.EscapeDataString("Order " + order.OrderNumber)
        });
        var upiUri = "upi://pay?" + query;
        payment.Status = "Pending";
        payment.QrData = upiUri;
        notifications.AddForOrder(order, "PaymentPending");
        await db.SaveChangesAsync(cancellationToken);
        return Ok(new { configured = true, provider = "UPI", status = "Pending", amount = order.TotalAmount,
            orderNumber = order.OrderNumber, upiVpa = vpa, payeeName, upiUri, qrData = upiUri, verificationAvailable = false });
    }

    [HttpPost("orders/{orderNumber}/status"), EnableRateLimiting("tracking-reads")]
    public async Task<IActionResult> CheckOrderStatus(string orderNumber, CancellationToken cancellationToken)
    {
        var order = await db.Orders.FirstOrDefaultAsync(x => x.OrderNumber == orderNumber, cancellationToken);
        if (order is null || !CanAccess(order)) return NotFound();
        return Ok(new { status = order.PaymentStatus, orderStatus = order.Status, paymentStatus = order.PaymentStatus, verified = false,
            detail = "UPI payment verification is not available yet. Payment remains pending." });
    }

    private bool CanAccess(Order order)
    {
        if (User.Identity?.IsAuthenticated == true && User.IsInRole("Admin")) return true;
        if (Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) && order.CustomerUserId == id) return true;
        var supplied = Request.Headers["X-Tracking-Token"].ToString();
        if (string.IsNullOrWhiteSpace(order.TrackingTokenHash) || string.IsNullOrWhiteSpace(supplied)) return false;
        var hash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(supplied)));
        return CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(order.TrackingTokenHash), Encoding.UTF8.GetBytes(hash));
    }
}

