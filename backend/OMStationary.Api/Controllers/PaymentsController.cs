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
public sealed class PaymentsController(OmDbContext db, IConfiguration configuration, IPaymentGateway gateway,
    NotificationService notifications) : ControllerBase
{
    /// <summary>
    /// Single source of truth for what the storefront may offer at checkout. The UI renders both
    /// payment choices from this response and never decides on its own that a payment succeeded.
    /// </summary>
    [HttpGet("options")]
    public IActionResult Options()
    {
        static string Configured(string? value)
        {
            var clean = value?.Trim() ?? "";
            return clean.Length == 0 || clean.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase) ? "" : clean;
        }
        var vpa = Configured(configuration["Payments:Upi:Vpa"]);
        return Ok(new
        {
            cashOnDelivery = true,
            onlineUpi = gateway.IsConfigured,
            onlineProvider = gateway.IsConfigured ? gateway.Name : null,
            // A blank VPA must be reported as unconfigured, never replaced with a placeholder the
            // customer could scan.
            upiVpa = vpa,
            upiPayeeName = Configured(configuration["Payments:Upi:PayeeName"]),
            verificationAvailable = gateway.IsConfigured,
            taxRatePercent = configuration.GetValue<decimal>("Tax:RatePercent")
        });
    }

    [HttpPost("orders/{orderNumber}/intent"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> CreateIntent(string orderNumber, CancellationToken cancellationToken)
    {
        var order = await db.Orders.Include(x => x.Items).FirstOrDefaultAsync(x => x.OrderNumber == orderNumber, cancellationToken);
        if (order is null || !CanAccess(order)) return NotFound();
        if (!order.PaymentMethod.Equals("Paytm UPI", StringComparison.OrdinalIgnoreCase)) return BadRequest("This order does not use online UPI payment.");
        if (order.PaymentStatus == "Paid") return Ok(new { status = "Paid", order.OrderNumber });
        if (!gateway.IsConfigured) return Problem("Paytm UPI is not configured yet.", statusCode: 503);
        var payment = await db.Payments.FirstOrDefaultAsync(x => x.OrderId == order.Id && x.Provider == "Paytm", cancellationToken);
        if (payment is null) return Problem("Payment record is missing for this order.", statusCode: 409);
        if (!string.IsNullOrWhiteSpace(payment.QrImageBase64))
            return Ok(new { configured = true, provider = payment.Provider, status = payment.Status, qrData = payment.QrData, qrImageBase64 = payment.QrImageBase64 });
        var intent = await gateway.CreateOrder(order.TotalAmount, order.OrderNumber, cancellationToken);
        if (!intent.Configured) return Problem(intent.Detail ?? "Paytm could not create a payment QR.", statusCode: 503);
        payment.ProviderReference = intent.ProviderOrderId;
        payment.QrData = intent.QrData;
        payment.QrImageBase64 = intent.QrImageBase64;
        payment.Status = "Pending";
        notifications.AddForOrder(order, "PaymentPending");
        await db.SaveChangesAsync(cancellationToken);
        return Ok(new { configured = true, provider = intent.Provider, status = intent.Status, qrData = intent.QrData, qrImageBase64 = intent.QrImageBase64 });
    }

    [HttpPost("orders/{orderNumber}/status"), EnableRateLimiting("tracking-reads")]
    public async Task<IActionResult> CheckOrderStatus(string orderNumber, CancellationToken cancellationToken)
    {
        var order = await db.Orders.FirstOrDefaultAsync(x => x.OrderNumber == orderNumber, cancellationToken);
        if (order is null || !CanAccess(order)) return NotFound();
        if (!order.PaymentMethod.Equals("Paytm UPI", StringComparison.OrdinalIgnoreCase)) return BadRequest("Payment verification is only available for Paytm UPI orders.");
        if (order.PaymentStatus == "Paid") return Ok(new { status = "Paid", order.Status, order.PaymentStatus });

        var gatewayStatus = await gateway.CheckStatus(order.OrderNumber, cancellationToken);
        var payment = await db.Payments.FirstOrDefaultAsync(x => x.OrderId == order.Id && x.Provider == "Paytm", cancellationToken);
        if (payment is null) return Problem("Payment record is missing for this order.", statusCode: 409);
        if (!gatewayStatus.Verified) return Ok(new { status = payment.Status, paymentStatus = order.PaymentStatus, verified = false, detail = gatewayStatus.Detail });

        var amountMatches = decimal.TryParse(gatewayStatus.Amount, NumberStyles.Number, CultureInfo.InvariantCulture, out var verifiedAmount) &&
                            verifiedAmount == order.TotalAmount && payment.Amount == order.TotalAmount;
        if (gatewayStatus.Paid && !amountMatches)
        {
            payment.Status = "ReviewRequired";
            await db.SaveChangesAsync(cancellationToken);
            return Ok(new { status = "ReviewRequired", paymentStatus = order.PaymentStatus, verified = true, detail = "Paytm amount did not match the saved order total." });
        }

        var previousPaymentStatus = payment.Status;
        payment.Status = gatewayStatus.Paid ? "Paid" : gatewayStatus.Status is "TXN_FAILURE" ? "Failed" : "Pending";
        if (!string.IsNullOrWhiteSpace(gatewayStatus.ProviderReference)) payment.ProviderReference = gatewayStatus.ProviderReference;
        if (gatewayStatus.Paid)
        {
            payment.PaidAt ??= DateTime.UtcNow;
            order.PaymentStatus = "Paid";
            if (order.Status is "Pending" or "Placed")
            {
                order.Status = "Confirmed";
                db.OrderStatusHistory.Add(new OrderStatusHistory { OrderId = order.Id, Status = "Confirmed", Note = "Paytm status API verified payment." });
                notifications.AddForOrder(order, "Confirmed");
            }
            var invoice = await db.Invoices.FirstOrDefaultAsync(x => x.OrderId == order.Id, cancellationToken);
            if (invoice is not null) invoice.PaymentStatus = "Paid";
            // Idempotent: only tell the customer once.
            if (previousPaymentStatus != "Paid") notifications.AddForOrder(order, "PaymentSuccess");
        }
        else if (payment.Status == "Failed" && previousPaymentStatus != "Failed")
        {
            notifications.AddForOrder(order, "PaymentFailed");
        }
        await db.SaveChangesAsync(cancellationToken);
        return Ok(new { status = payment.Status, order.Status, order.PaymentStatus, verified = true,
            invoiceNumber = await db.Invoices.Where(x => x.OrderId == order.Id).Select(x => x.InvoiceNumber).FirstOrDefaultAsync(cancellationToken) });
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

