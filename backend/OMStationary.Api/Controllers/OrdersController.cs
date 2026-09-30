using System.Security.Cryptography;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Dtos;
using OMStationary.Api.Models;
using OMStationary.Api.Services;

namespace OMStationary.Api.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController(OmDbContext db, IConfiguration configuration, FulfillmentSelectionService fulfillment,
    ICodPaymentProvider codPayments, CouponService coupons, IPaymentGateway gateway, InvoiceService invoices,
    NotificationService notifications) : ControllerBase
{
    private bool IsAdmin()
    {
        if (User.Identity?.IsAuthenticated == true && User.IsInRole("Admin")) return true;
        var key = configuration["Admin:AccessKey"];
        var supplied = Request.Headers["X-Admin-Key"].ToString();
        return !string.IsNullOrWhiteSpace(key) && CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(supplied), Encoding.UTF8.GetBytes(key));
    }

    private IActionResult AdminRequired() => Problem("Admin authorization is required.", statusCode: 401);

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        if (!IsAdmin()) return AdminRequired();
        return Ok(await db.Orders.AsNoTracking().Include(x => x.Items).OrderByDescending(x => x.CreatedAt).Select(x => new
        {
            x.Id, x.OrderNumber, x.CustomerName, x.CustomerPhone, x.DeliveryAddress, x.City, x.Pincode,
            x.Status, x.PaymentMethod, x.PaymentStatus, x.Subtotal, x.DeliveryCharge, x.DiscountAmount, x.TaxAmount, x.CouponCode, x.TotalAmount,
            x.SourceType, x.CreatedAt, x.RequestedDeliveryDate,
            nextStatuses = OrderStateMachine.NextStatuses(x.Status),
            Items = x.Items.Select(i => new { i.ProductName, i.Quantity, i.UnitPrice })
        }).ToListAsync());
    }

    // The admin UI builds its action buttons from this, so it can only ever offer transitions the
    // state machine actually permits. The controller still re-validates on every PATCH.
    [HttpGet("status-workflow")]
    public IActionResult StatusWorkflow()
    {
        if (!IsAdmin()) return AdminRequired();
        return Ok(new
        {
            all = OrderStateMachine.Statuses,
            next = OrderStateMachine.Statuses.ToDictionary(
                status => status,
                status => OrderStateMachine.NextStatuses(status),
                StringComparer.OrdinalIgnoreCase)
        });
    }

    [HttpGet("{orderNumber}"), EnableRateLimiting("tracking-reads")]
    public async Task<IActionResult> Get(string orderNumber)
    {
        var order = await db.Orders.AsNoTracking().Include(x => x.Items).Include(x => x.StatusHistory)
            .FirstOrDefaultAsync(x => x.OrderNumber == orderNumber);
        if (order is null) return NotFound();
        var userId = User.Identity?.IsAuthenticated == true ? User.FindFirstValue(ClaimTypes.NameIdentifier) : null;
        var isOwner = Guid.TryParse(userId, out var parsedUserId) && order.CustomerUserId == parsedUserId;
        var isAdmin = User.Identity?.IsAuthenticated == true && User.IsInRole("Admin");
        var trackingToken = Request.Headers["X-Tracking-Token"].ToString();
        var trackingMatches = !string.IsNullOrWhiteSpace(order.TrackingTokenHash) &&
            CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(order.TrackingTokenHash),
                Encoding.UTF8.GetBytes(Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(trackingToken)))));
        var legacyOpaqueOrderNumber = string.IsNullOrWhiteSpace(order.TrackingTokenHash) &&
            System.Text.RegularExpressions.Regex.IsMatch(order.OrderNumber, @"^OM\d{17}[A-F0-9]{16}$", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
        if (!isOwner && !isAdmin && !trackingMatches && !legacyOpaqueOrderNumber) return NotFound();
        return Ok(new
        {
            order.OrderNumber, order.Status, order.PaymentMethod, order.PaymentStatus,
            order.RequestedDeliveryDate,
            order.Subtotal, order.DeliveryCharge, order.DiscountAmount, order.TaxAmount, order.CouponCode, order.TotalAmount, order.CreatedAt,
            fulfillmentMethod = order.SourceType == "OMStationaryPickup" ? "Pickup" : "Delivery",
            Items = order.Items.Select(i => new { i.ProductName, i.Quantity, i.UnitPrice }),
            History = order.StatusHistory.OrderBy(h => h.CreatedAt).Select(h => new { h.Status, h.CreatedAt })
        });
    }

    // The invoice is visible to exactly the same people who may track the order: the owning
    // customer, an admin, or anyone holding the order's tracking token.
    [HttpGet("{orderNumber}/invoice"), EnableRateLimiting("tracking-reads")]
    public async Task<IActionResult> GetInvoice(string orderNumber)
    {
        var order = await db.Orders.AsNoTracking().FirstOrDefaultAsync(x => x.OrderNumber == orderNumber);
        if (order is null) return NotFound();
        var userId = User.Identity?.IsAuthenticated == true ? User.FindFirstValue(ClaimTypes.NameIdentifier) : null;
        var isOwner = Guid.TryParse(userId, out var parsedUserId) && order.CustomerUserId == parsedUserId;
        var isAdmin = User.Identity?.IsAuthenticated == true && User.IsInRole("Admin");
        var trackingToken = Request.Headers["X-Tracking-Token"].ToString();
        var trackingMatches = !string.IsNullOrWhiteSpace(order.TrackingTokenHash) &&
            CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(order.TrackingTokenHash),
                Encoding.UTF8.GetBytes(Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(trackingToken)))));
        if (!isOwner && !isAdmin && !trackingMatches) return NotFound();

        var invoice = await db.Invoices.AsNoTracking().Include(x => x.Items)
            .FirstOrDefaultAsync(x => x.OrderId == order.Id);
        if (invoice is null) return NotFound("An invoice has not been generated for this order yet.");
        var businessName = configuration["Billing:BusinessName"] ?? "OM Stationary";
        var businessAddress = configuration["Billing:BusinessAddress"] ?? configuration["OmStationary:Address"] ?? "";
        var taxNumber = configuration["Billing:TaxRegistration"] ?? "";
        return Ok(new
        {
            invoice.InvoiceNumber,
            invoice.InvoiceDate,
            invoice.PaymentStatus,
            invoice.PaymentMethod,
            invoice.FulfillmentMethod,
            billedTo = new { order.CustomerName, order.CustomerPhone, order.CustomerEmail, order.BillingAddress, order.DeliveryAddress },
            seller = new { businessName, businessAddress, taxNumber },
            lines = invoice.Items.Select(l => new { l.ProductName, l.Sku, l.Quantity, l.UnitPrice,
                lineTotal = l.UnitPrice * l.Quantity }),
            invoice.Subtotal,
            invoice.Discount,
            invoice.DeliveryCharge,
            invoice.TaxAmount,
            invoice.GrandTotal,
            order.OrderNumber,
            order.Status
        });
    }

    [HttpPost, EnableRateLimiting("order-writes")]
    public async Task<IActionResult> Create([FromBody] CreateOrderRequest request, CancellationToken cancellationToken)
    {
        var isCod = request.PaymentMethod.Equals("COD", StringComparison.OrdinalIgnoreCase);
        var isUpi = request.PaymentMethod.Equals("UPI", StringComparison.OrdinalIgnoreCase) ||
                    request.PaymentMethod.Equals("Paytm UPI", StringComparison.OrdinalIgnoreCase) ||
                    request.PaymentMethod.Equals("Online", StringComparison.OrdinalIgnoreCase);
        if (!isCod && !isUpi) return BadRequest("Choose Cash on Delivery or Paytm UPI.");
        if (isUpi && !gateway.IsConfigured) return Problem("Paytm UPI is not configured for this store yet. Choose Cash on Delivery.", statusCode: 503);

        var method = request.FulfillmentMethod.Trim();
        if (!method.Equals("Pickup", StringComparison.OrdinalIgnoreCase) &&
            !method.Equals("Delivery", StringComparison.OrdinalIgnoreCase))
            return BadRequest("Choose Pickup or Delivery.");

        var pickupAddress = configuration["OmStationary:Address"]?.Trim() ?? "";
        var pickupConfigured = !string.IsNullOrWhiteSpace(pickupAddress) &&
                               !pickupAddress.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase);
        PartnerShop? fulfillmentShop = null;
        decimal deliveryCharge = 0;
        var destination = "";

        if (method.Equals("Pickup", StringComparison.OrdinalIgnoreCase))
        {
            if (!pickupConfigured) return Problem("OM Stationary pickup address is not configured.", statusCode: 503);
            if (request.RequestedPickupDate is null || request.RequestedPickupDate <= DateTime.UtcNow)
                return BadRequest("Choose a future pickup date and time.");
            destination = $"OM Stationary Pickup: {pickupAddress}";
        }
        else
        {
            var enabled = configuration.GetValue<bool>("Delivery:Enabled");
            var cities = configuration.GetSection("Delivery:ServiceableCities").Get<string[]>() ?? [];
            if (!enabled) return Problem("Delivery is not configured yet. Choose pickup or contact support.", statusCode: 503);
            if (string.IsNullOrWhiteSpace(request.AddressLine) || string.IsNullOrWhiteSpace(request.City) ||
                string.IsNullOrWhiteSpace(request.State) || string.IsNullOrWhiteSpace(request.Pincode))
                return BadRequest("Enter the complete delivery address.");
            if (!cities.Contains(request.City.Trim(), StringComparer.OrdinalIgnoreCase))
                return BadRequest("Delivery is not available in this city yet.");
            var pincodes = configuration.GetSection("Delivery:ServiceablePincodes").Get<string[]>() ?? [];
            if (!System.Text.RegularExpressions.Regex.IsMatch(request.Pincode.Trim(), @"^\d{6}$") ||
                !pincodes.Contains(request.Pincode.Trim(), StringComparer.Ordinal))
                return BadRequest("Delivery is not available for this PIN code yet.");
            if (request.Latitude is null || request.Longitude is null)
                return BadRequest("Share your location to validate delivery distance.");

            var fee = configuration.GetValue<decimal?>("Delivery:Charge");
            if (fee is null || fee < 0) return Problem("Delivery charges are not configured.", statusCode: 503);
            deliveryCharge = fee.Value;
            destination = string.Join(", ", new[] { request.AddressLine.Trim(), request.Landmark.Trim(),
                request.City.Trim(), request.State.Trim(), request.Pincode.Trim() }.Where(x => x.Length > 0));
        }

        var ids = request.Items.Select(i => i.ProductId).Distinct().ToArray();
        if (ids.Length != request.Items.Count) return BadRequest("Add each product once and update its quantity in the cart.");
        if (request.Items.Any(x => x.Quantity <= 0)) return BadRequest("Each product quantity must be at least 1.");
        var products = await db.Products.AsNoTracking().Where(p => p.IsActive && ids.Contains(p.Id)).ToDictionaryAsync(p => p.Id);
        if (products.Count != ids.Length) return BadRequest("One or more products are no longer available.");

        FulfillmentCandidate? candidate = null;
        if (method.Equals("Delivery", StringComparison.OrdinalIgnoreCase))
        {
            candidate = await fulfillment.SelectAsync(new FulfillmentRequest(request.Latitude!.Value, request.Longitude!.Value,
                request.Items.Select(x => new RequestedProduct(x.ProductId, x.Quantity)).ToArray()), cancellationToken);
            if (candidate is null)
                return Problem("OM Stationary does not have all items and quantities available for delivery right now.", statusCode: 409);
            fulfillmentShop = candidate.Shop;
        }

        // Stock pre-check for both pickup and first-party delivery. The authoritative, concurrency-safe
        // deduction happens later inside the transaction; this only gives the customer a clear message.
        if (fulfillmentShop is null)
        {
            var shortages = request.Items
                .Where(item => products[item.ProductId].Stock < item.Quantity)
                .Select(item => $"only {products[item.ProductId].Stock} left of {products[item.ProductId].Name}")
                .ToArray();
            if (shortages.Length > 0)
                return Conflict(new { detail = $"Not enough stock: {string.Join("; ", shortages)}." });
        }

        var order = new Order
        {
            OrderNumber = "OM" + DateTime.UtcNow.ToString("yyyyMMddHHmmssfff") + Guid.NewGuid().ToString("N")[..16].ToUpperInvariant(),
            CustomerName = request.CustomerName.Trim(),
            CustomerPhone = request.CustomerPhone.Trim(),
            CustomerEmail = request.CustomerEmail.Trim(),
            BillingAddress = request.BillingAddress.Trim(),
            DeliveryAddress = destination,
            City = method.Equals("Pickup", StringComparison.OrdinalIgnoreCase) ? "" : request.City.Trim(),
            Pincode = method.Equals("Pickup", StringComparison.OrdinalIgnoreCase) ? "" : request.Pincode.Trim(),
            RequestedDeliveryDate = request.RequestedPickupDate,
            DeliveryCharge = deliveryCharge,
            PaymentMethod = isCod ? "COD" : "Paytm UPI",
            PaymentStatus = "Pending",
            Status = isCod ? (method.Equals("Pickup", StringComparison.OrdinalIgnoreCase) ? "Placed" : "Pending") : "Pending",
            SourceType = method.Equals("Pickup", StringComparison.OrdinalIgnoreCase) ? "OMStationaryPickup" : "OMStationaryDelivery",
            SourceReference = fulfillmentShop?.Name ?? "OM Stationary",
            CustomerUserId = Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var customerId) ? customerId : null,
            PartnerShopId = fulfillmentShop?.Id,
            TrackingTokenHash = "",
            CreatedAt = DateTime.UtcNow
        };
        foreach (var item in request.Items)
        {
            var product = products[item.ProductId];
            order.Items.Add(new OrderItem { ProductId = product.Id, ProductName = product.Name,
                Sku = product.Sku, Quantity = item.Quantity,
                UnitPrice = candidate?.UnitPrices.GetValueOrDefault(product.Id) ?? product.Price });
        }
        order.Subtotal = order.Items.Sum(i => i.UnitPrice * i.Quantity);
        var coupon = string.IsNullOrWhiteSpace(request.CouponCode) ? null : await coupons.Calculate(request.CouponCode, order.Subtotal, cancellationToken);
        if (coupon is { Valid: false }) return BadRequest(new { detail = coupon.Reason });
        order.CouponCode = coupon?.Code ?? "";
        order.DiscountAmount = coupon?.Discount ?? 0;
        var taxPercent = configuration.GetValue<decimal>("Tax:RatePercent");
        order.TaxAmount = TaxCalculator.Calculate(order.Subtotal - order.DiscountAmount, taxPercent);
        order.TotalAmount = order.Subtotal + order.DeliveryCharge - order.DiscountAmount + order.TaxAmount;
        if (request.QuotedTotal is not null && request.QuotedTotal.Value != order.TotalAmount)
            return Conflict(new { detail = "Prices or stock changed. Please review your updated order total before placing it.", total = order.TotalAmount });
        if (method.Equals("Delivery", StringComparison.OrdinalIgnoreCase) && request.QuotedTotal is null)
            return BadRequest("Refresh the delivery quote before placing the order.");

        await using var transaction = await db.Database.BeginTransactionAsync();
        if (coupon is not null && await coupons.TryRedeem(coupon, cancellationToken) != 1)
            return Conflict(new { detail = "Coupon usage limit was reached. Remove the coupon and try again." });
        var trackingToken = TokenService.NewRefreshToken();
        order.TrackingTokenHash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(trackingToken)));
        order.StatusHistory.Add(new OrderStatusHistory { Status = order.Status, Note = "Order placed" });
        db.Orders.Add(order);
        await db.SaveChangesAsync();
        notifications.AddForOrder(order, order.Status);
        db.Payments.Add(isCod ? codPayments.CreatePendingPayment(order.Id, order.TotalAmount) :
            new Payment { OrderId = order.Id, Provider = "Paytm", Status = "Pending", Amount = order.TotalAmount, CreatedAt = DateTime.UtcNow });
        await invoices.CreateOnceAsync(order, cancellationToken);
        // Decrement the inventory the order is actually fulfilled from: OM Stationary's own product
        // stock (pickup orders and first-party delivery), or the supplying partner shop's stock.
        foreach (var item in request.Items)
        {
            if (fulfillmentShop is not null)
            {
                var changed = await db.ShopProducts.Where(x => x.PartnerShopId == fulfillmentShop.Id && x.ProductId == item.ProductId &&
                        x.IsAvailable && x.Stock >= item.Quantity)
                    .ExecuteUpdateAsync(update => update.SetProperty(x => x.Stock, x => x.Stock - item.Quantity), cancellationToken);
                if (changed != 1) return Conflict(new { detail = "Stock changed during checkout. Please request a new quote." });
            }
            else
            {
                var changed = await db.Products.Where(x => x.Id == item.ProductId && x.IsActive && x.Stock >= item.Quantity)
                    .ExecuteUpdateAsync(update => update.SetProperty(x => x.Stock, x => x.Stock - item.Quantity), cancellationToken);
                if (changed != 1) return Conflict(new { detail = "Stock changed during checkout. Please refresh your cart and try again." });
            }
        }
        if (candidate is not null)
        {
            var delivery = new Delivery
            {
                OrderId = order.Id,
                PartnerName = "Unassigned",
                Status = "Pending",
                PickupAddress = candidate.PickupAddress,
                DropAddress = destination,
                Charge = deliveryCharge
            };
            db.Deliveries.Add(delivery);
            await db.SaveChangesAsync();
            db.DeliveryStatusHistory.Add(new DeliveryStatusHistory { DeliveryId = delivery.Id, Status = "Pending" });
        }
        await db.SaveChangesAsync();
        await transaction.CommitAsync();
        GatewayPaymentIntent? paymentIntent = null;
        if (isUpi)
        {
            try
            {
                paymentIntent = await gateway.CreateOrder(order.TotalAmount, order.OrderNumber, cancellationToken);
                if (paymentIntent.Configured)
                {
                    var payment = await db.Payments.FirstAsync(x => x.OrderId == order.Id && x.Provider == "Paytm", cancellationToken);
                    payment.ProviderReference = paymentIntent.ProviderOrderId;
                    payment.QrData = paymentIntent.QrData;
                    payment.QrImageBase64 = paymentIntent.QrImageBase64;
                    await db.SaveChangesAsync(cancellationToken);
                }
            }
            catch (HttpRequestException)
            {
                paymentIntent = new(false, "Paytm", null, null, "ProviderError", "Payment QR could not be created. You can retry from the order page.");
            }
            catch (TaskCanceledException) when (!cancellationToken.IsCancellationRequested)
            {
                paymentIntent = new(false, "Paytm", null, null, "ProviderTimeout", "Paytm did not respond in time. You can retry from the order page.");
            }
            catch (System.Text.Json.JsonException)
            {
                paymentIntent = new(false, "Paytm", null, null, "ProviderError", "Paytm returned an unreadable response. You can retry from the order page.");
            }
        }
        return CreatedAtAction(nameof(Get), new { orderNumber = order.OrderNumber }, new
        {
            order.OrderNumber, order.Status, order.Subtotal, order.DeliveryCharge, order.DiscountAmount, order.TaxAmount, order.CouponCode, order.TotalAmount,
            order.PaymentMethod, order.PaymentStatus,
            fulfillmentMethod = order.SourceType == "OMStationaryPickup" ? "Pickup" : "Delivery",
            order.RequestedDeliveryDate, trackingToken,
            invoiceNumber = db.Invoices.Where(x => x.OrderId == order.Id).Select(x => x.InvoiceNumber).FirstOrDefault(),
            payment = paymentIntent is null ? null : new { paymentIntent.Configured, paymentIntent.Provider, paymentIntent.Status, paymentIntent.Detail,
                paymentIntent.QrData, paymentIntent.QrImageBase64 },
            Items = order.Items.Select(i => new { i.ProductName, i.Quantity, i.UnitPrice })
        });
    }

    [HttpPatch("{id:int}/status"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> Status(int id, [FromBody] UpdateOrderStatusRequest request)
    {
        if (!IsAdmin()) return AdminRequired();
        var allowed = OrderStateMachine.Statuses;
        if (!allowed.Contains(request.Status, StringComparer.OrdinalIgnoreCase)) return BadRequest("Unsupported order status.");
        var canonicalStatus = allowed.First(x => x.Equals(request.Status, StringComparison.OrdinalIgnoreCase));
        var order = await db.Orders.FindAsync(id);
        if (order is null) return NotFound();
        if (order.Status == canonicalStatus) return Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus });
        if (!OrderStateMachine.CanTransition(order.Status, canonicalStatus))
            return BadRequest(new { detail = $"Order cannot transition from {order.Status} to {canonicalStatus}." });
        if (canonicalStatus == "RefundPending" && order.PaymentStatus != "Paid") return BadRequest("A refund can only be requested for a paid order.");
        order.Status = canonicalStatus;
        if (canonicalStatus == "RefundPending") db.Refunds.Add(new Refund { OrderId = order.Id, Amount = order.TotalAmount, Status = "Pending" });
        if (canonicalStatus == "Refunded")
        {
            var refund = await db.Refunds.FirstOrDefaultAsync(x => x.OrderId == order.Id && x.Status == "Pending");
            if (refund is null) return BadRequest("No pending refund exists for this order.");
            refund.Status = "Refunded";
            order.PaymentStatus = "Refunded";
        }
        var actor = Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var actorId) ? actorId : (Guid?)null;
        db.OrderStatusHistory.Add(new OrderStatusHistory { OrderId = order.Id, Status = canonicalStatus, ChangedByUserId = actor });
        // The notification belongs to the customer who placed the order, not the staff member
        // who changed the status. AddForOrder falls back to order.CustomerUserId.
        notifications.AddForOrder(order, canonicalStatus);
        if (actor is not null) db.AuditLogs.Add(new AuditLog { UserId = actor, Action = "OrderStatusChanged", EntityType = "Order", EntityId = order.Id.ToString() });
        var delivery = await db.Deliveries.FirstOrDefaultAsync(x => x.OrderId == order.Id);
        if (delivery is not null)
        {
            delivery.Status = canonicalStatus switch
            {
                "Confirmed" or "Accepted" => "Accepted", "Preparing" => "Preparing", "Ready for Pickup" => "Ready for Pickup",
                "Picked Up" => "Picked Up", "Out for Delivery" => "Out for Delivery", "Delivered" => "Delivered",
                "Cancelled" => "Cancelled", _ => delivery.Status
            };
            if (delivery.Status != "Pending") db.DeliveryStatusHistory.Add(new DeliveryStatusHistory { DeliveryId = delivery.Id, Status = delivery.Status, ChangedByUserId = actor });
            if (canonicalStatus == "Delivered") delivery.CompletedAt = DateTime.UtcNow;
        }
        await db.SaveChangesAsync();
        return Ok(new { order.Id, order.OrderNumber, order.Status, order.PaymentStatus });
    }

    [HttpPatch("{id:int}/payment"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> PaymentStatus(int id, [FromBody] UpdatePaymentStatusRequest request)
    {
        if (!IsAdmin()) return AdminRequired();
        if (!request.Status.Equals("Paid", StringComparison.OrdinalIgnoreCase)) return BadRequest("Only a manually confirmed COD payment can be marked Paid.");
        var order = await db.Orders.FindAsync(id);
        if (order is null) return NotFound();
        if (!order.PaymentMethod.Equals("COD", StringComparison.OrdinalIgnoreCase)) return BadRequest("This payment method cannot be marked as COD collected.");
        if (!new[] { "Delivered", "Picked Up" }.Contains(order.Status, StringComparer.OrdinalIgnoreCase))
            return BadRequest("Confirm cash only after the order has been delivered or collected.");
        if (order.PaymentStatus.Equals("Paid", StringComparison.OrdinalIgnoreCase)) return Ok(new { order.Id, order.OrderNumber, order.PaymentStatus });
        order.PaymentStatus = "Paid";
        notifications.AddForOrder(order, "PaymentSuccess", message: "Payment received. Thank you for shopping with OM Stationary.");
        if (Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var paymentActor))
            db.AuditLogs.Add(new AuditLog { UserId = paymentActor, Action = "CODPaymentConfirmed", EntityType = "Order", EntityId = order.Id.ToString() });
        var payment = await db.Payments.FirstOrDefaultAsync(x => x.OrderId == order.Id && x.Provider == "COD");
        if (payment is not null) { payment.Status = "Paid"; payment.PaidAt = DateTime.UtcNow; }
        var invoice = await db.Invoices.FirstOrDefaultAsync(x => x.OrderId == order.Id);
        if (invoice is not null) invoice.PaymentStatus = "Paid";
        await db.Settlements.Where(x => x.OrderId == order.Id && x.Status == "PendingPayment")
            .ExecuteUpdateAsync(x => x.SetProperty(s => s.Status, "Payable"));
        await db.SaveChangesAsync();
        return Ok(new { order.Id, order.OrderNumber, order.PaymentStatus });
    }

    [HttpPost("{id:int}/delivery"), EnableRateLimiting("order-writes")]
    public async Task<IActionResult> AssignDelivery(int id, [FromBody] AssignDeliveryRequest request)
    {
        if (!IsAdmin()) return AdminRequired();
        var order = await db.Orders.FindAsync(id);
        if (order is null) return NotFound();
        var delivery = await db.Deliveries.FirstOrDefaultAsync(x => x.OrderId == id);
        if (delivery is null) return BadRequest("This order does not have a delivery record.");
        DeliveryPartner? selectedPartner = null;
        if (request.DeliveryPartnerId is int deliveryPartnerId)
        {
            selectedPartner = await db.DeliveryPartners.FirstOrDefaultAsync(x => x.Id == deliveryPartnerId && x.Status == "Active" && x.IsAvailable);
            if (selectedPartner is null) return Conflict(new { detail = "The selected delivery partner is not available." });
            delivery.DeliveryPartnerId = selectedPartner.Id;
            delivery.PartnerName = selectedPartner.Name;
            selectedPartner.IsAvailable = false;
        }
        else
        {
            if (string.IsNullOrWhiteSpace(request.PartnerName)) return BadRequest("Select an active delivery partner.");
            delivery.DeliveryPartnerId = null;
            delivery.PartnerName = request.PartnerName.Trim();
        }
        delivery.TrackingCode = request.TrackingCode.Trim();
        delivery.Status = "Assigned";
        delivery.AssignedAt = DateTime.UtcNow;
        if (order.Status is "Pending" or "Placed") order.Status = "Confirmed";
        db.OrderStatusHistory.Add(new OrderStatusHistory { OrderId = order.Id, Status = order.Status, Note = "Delivery assigned" });
        db.DeliveryStatusHistory.Add(new DeliveryStatusHistory { DeliveryId = delivery.Id, Status = "Assigned" });
        if (Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var deliveryActor))
            db.AuditLogs.Add(new AuditLog { UserId = deliveryActor, Action = "DeliveryAssigned", EntityType = "Delivery", EntityId = delivery.Id.ToString() });
        await db.SaveChangesAsync();
        return Ok(new { order.OrderNumber, order.Status, AssignedPartner = selectedPartner?.Name ?? delivery.PartnerName, delivery.TrackingCode, DeliveryStatus = delivery.Status });
    }
}
