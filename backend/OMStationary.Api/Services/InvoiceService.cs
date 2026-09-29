using System.Globalization;
using System.Text;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

public sealed class InvoiceService(OmDbContext db, IConfiguration configuration)
{
    public async Task<Invoice> CreateOnceAsync(Order order, CancellationToken cancellationToken = default)
    {
        var existing = await db.Invoices.Include(x => x.Items).FirstOrDefaultAsync(x => x.OrderId == order.Id, cancellationToken);
        if (existing is not null) return existing;

        var invoice = new Invoice
        {
            InvoiceNumber = "PENDING-" + Guid.NewGuid().ToString("N"),
            OrderId = order.Id,
            OrderNumber = order.OrderNumber,
            CustomerId = order.CustomerUserId,
            InvoiceDate = order.CreatedAt,
            Subtotal = order.Subtotal,
            Discount = order.DiscountAmount,
            DeliveryCharge = order.DeliveryCharge,
            TaxAmount = order.TaxAmount,
            GrandTotal = order.TotalAmount,
            PaymentMethod = order.PaymentMethod,
            PaymentStatus = order.PaymentStatus,
            FulfillmentMethod = order.SourceType == "OMStationaryPickup" ? "Pickup" : "Delivery",
            BillingAddress = string.IsNullOrWhiteSpace(order.BillingAddress) ? "Not provided" : order.BillingAddress,
            ShippingAddress = string.IsNullOrWhiteSpace(order.DeliveryAddress) ? "Not provided" : order.DeliveryAddress,
            CustomerName = order.CustomerName,
            CustomerPhone = order.CustomerPhone,
            CustomerEmail = order.CustomerEmail,
            DocumentReference = $"/api/invoices/orders/{order.OrderNumber}/pdf"
        };
        foreach (var item in order.Items)
            invoice.Items.Add(new InvoiceLine
            {
                ProductName = item.ProductName,
                Sku = item.Sku,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice,
                Discount = 0m
            });

        db.Invoices.Add(invoice);
        await db.SaveChangesAsync(cancellationToken);
        invoice.InvoiceNumber = $"OM-INV-{order.CreatedAt:yyyy}-{invoice.Id:D7}";
        await db.SaveChangesAsync(cancellationToken);
        return invoice;
    }

    public async Task<byte[]> RenderAsync(Invoice invoice, CancellationToken cancellationToken = default)
    {
        invoice.PdfGenerationCount++;
        await db.SaveChangesAsync(cancellationToken);
        return InvoicePdf.Render(invoice,
            configuration["Billing:BusinessName"] ?? "OM Stationary",
            configuration["Billing:BusinessAddress"] ?? "",
            configuration["Billing:PlusCode"] ?? "",
            configuration["Billing:Phone"] ?? "",
            configuration["Billing:Email"] ?? "",
            configuration["Billing:TaxRegistration"] ?? "");
    }
}

internal static class InvoicePdf
{
    private sealed class Page
    {
        public StringBuilder Content { get; } = new();
        public float Y { get; set; } = 790;
    }

    public static byte[] Render(Invoice invoice, string business, string address, string plusCode, string phone, string email, string taxRegistration)
    {
        var pages = new List<Page> { new() };
        var page = pages[0];
        Text(page, 48, page.Y, 24, business, "0.08 0.22 0.40 rg");
        Text(page, 48, page.Y - 23, 10, "Stationery and office essentials", "0.35 0.40 0.48 rg");
        Text(page, 48, page.Y - 43, 9, address, "0.20 0.25 0.32 rg");
        Text(page, 48, page.Y - 57, 9, string.Join("  |  ", new[] { plusCode, phone, email }.Where(x => !string.IsNullOrWhiteSpace(x))), "0.35 0.40 0.48 rg");
        if (!string.IsNullOrWhiteSpace(taxRegistration)) Text(page, 48, page.Y - 71, 9, "GSTIN: " + taxRegistration, "0.35 0.40 0.48 rg");
        Line(page, 48, page.Y - 84, 547);
        page.Y -= 112;
        Text(page, 48, page.Y, 19, "TAX INVOICE", "0.08 0.22 0.40 rg");
        Text(page, 355, page.Y + 2, 10, "Invoice No: " + invoice.InvoiceNumber);
        Text(page, 355, page.Y - 13, 9, "Order ID: " + invoice.OrderNumber);
        Text(page, 48, page.Y - 20, 9, "Invoice date: " + invoice.InvoiceDate.ToString("dd MMM yyyy, hh:mm tt", CultureInfo.InvariantCulture));
        page.Y -= 45;
        Line(page, 48, page.Y, 547);
        page.Y -= 17;
        Text(page, 48, page.Y, 10, "BILL TO", "0.08 0.22 0.40 rg");
        Text(page, 315, page.Y, 10, "FULFILLMENT", "0.08 0.22 0.40 rg");
        page.Y -= 15;
        Text(page, 48, page.Y, 10, invoice.CustomerName);
        Text(page, 315, page.Y, 9, invoice.FulfillmentMethod);
        page.Y -= 14;
        Text(page, 48, page.Y, 9, "Mobile: " + invoice.CustomerPhone + (string.IsNullOrWhiteSpace(invoice.CustomerEmail) ? "" : "  Email: " + invoice.CustomerEmail));
        Text(page, 315, page.Y, 9, "Ship to: " + invoice.ShippingAddress);
        page.Y -= 14;
        Text(page, 48, page.Y, 9, "Billing address: " + invoice.BillingAddress);
        page.Y -= 22;
        Line(page, 48, page.Y, 547);
        page.Y -= 17;
        Text(page, 48, page.Y, 9, "ITEM", "0.08 0.22 0.40 rg");
        Text(page, 302, page.Y, 9, "SKU", "0.08 0.22 0.40 rg");
        Text(page, 394, page.Y, 9, "QTY", "0.08 0.22 0.40 rg");
        Text(page, 435, page.Y, 9, "UNIT PRICE", "0.08 0.22 0.40 rg");
        Text(page, 510, page.Y, 9, "AMOUNT", "0.08 0.22 0.40 rg");
        page.Y -= 10;
        Line(page, 48, page.Y, 547);
        page.Y -= 18;
        foreach (var item in invoice.Items)
        {
            if (page.Y < 115)
            {
                page = new Page(); pages.Add(page);
                Text(page, 48, page.Y, 9, "OM Stationary | Invoice " + invoice.InvoiceNumber, "0.35 0.40 0.48 rg");
                page.Y -= 24;
            }
            Text(page, 48, page.Y, 9, item.ProductName);
            Text(page, 302, page.Y, 8, string.IsNullOrWhiteSpace(item.Sku) ? "-" : item.Sku);
            Text(page, 400, page.Y, 9, item.Quantity.ToString(CultureInfo.InvariantCulture));
            Text(page, 435, page.Y, 9, Money(item.UnitPrice));
            Text(page, 510, page.Y, 9, Money(item.UnitPrice * item.Quantity));
            page.Y -= 16;
        }

        page.Y -= 3;
        Line(page, 342, page.Y, 547);
        page.Y -= 17;
        Total(page, "Subtotal", invoice.Subtotal);
        Total(page, "Discount", -invoice.Discount);
        Total(page, "Delivery charge", invoice.DeliveryCharge);
        Total(page, "Tax", invoice.TaxAmount);
        page.Y -= 3;
        Line(page, 342, page.Y, 547);
        page.Y -= 19;
        Text(page, 342, page.Y, 12, "GRAND TOTAL", "0.08 0.22 0.40 rg");
        Text(page, 485, page.Y, 12, Money(invoice.GrandTotal), "0.08 0.22 0.40 rg");
        page.Y -= 23;
        Text(page, 48, page.Y, 9, "Payment: " + invoice.PaymentMethod + "  |  Status: " + invoice.PaymentStatus);
        page.Y -= 22;
        Text(page, 48, page.Y, 9, "Thank you for shopping with OM Stationary.", "0.35 0.40 0.48 rg");
        Text(page, 48, 24, 8, "Computer-generated invoice. Keep this bill for your records.", "0.45 0.48 0.52 rg");
        return BuildPdf(pages);
    }

    private static string Money(decimal value) => "INR " + value.ToString("N2", CultureInfo.InvariantCulture);
    private static void Total(Page page, string label, decimal amount)
    {
        Text(page, 350, page.Y, 9, label);
        Text(page, 485, page.Y, 9, Money(amount));
        page.Y -= 15;
    }
    private static void Text(Page page, float x, float y, int size, string? value, string color = "0.15 0.18 0.22 rg")
    {
        var text = (value ?? "").Replace("₹", "INR ").Normalize(NormalizationForm.FormKC);
        text = new string(text.Select(c => c is >= ' ' and <= '~' ? c : '?').ToArray());
        text = text.Replace("\\", "\\\\").Replace("(", "\\(").Replace(")", "\\)");
        page.Content.Append("BT ").Append(color).Append(" /F1 ").Append(size).Append(" Tf ")
            .Append(x.ToString(CultureInfo.InvariantCulture)).Append(' ').Append(y.ToString(CultureInfo.InvariantCulture))
            .Append(" Td (").Append(text).Append(") Tj ET\n");
    }
    private static void Line(Page page, float x1, float y, float x2) => page.Content.Append("0.83 0.87 0.91 RG 0.7 w ")
        .Append(x1.ToString(CultureInfo.InvariantCulture)).Append(' ').Append(y.ToString(CultureInfo.InvariantCulture)).Append(" m ")
        .Append(x2.ToString(CultureInfo.InvariantCulture)).Append(' ').Append(y.ToString(CultureInfo.InvariantCulture)).Append(" l S\n");

    private static byte[] BuildPdf(IReadOnlyList<Page> pages)
    {
        var objects = new List<string> { "", "<< /Type /Catalog /Pages 2 0 R >>", "" };
        var pageIds = new List<int>();
        var fontId = 3 + pages.Count * 2;
        foreach (var page in pages)
        {
            var pageId = objects.Count; var contentId = pageId + 1; pageIds.Add(pageId);
            objects.Add($"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 {fontId} 0 R >> >> /Contents {contentId} 0 R >>");
            var bytes = Encoding.ASCII.GetBytes(page.Content.ToString());
            objects.Add($"<< /Length {bytes.Length} >>\nstream\n{Encoding.ASCII.GetString(bytes)}\nendstream");
        }
        objects.Add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
        objects[2] = "<< /Type /Pages /Kids [" + string.Join(" ", pageIds.Select(id => $"{id} 0 R")) + "] /Count " + pageIds.Count + " >>";
        using var output = new MemoryStream();
        void Write(string value) { var b = Encoding.ASCII.GetBytes(value); output.Write(b, 0, b.Length); }
        Write("%PDF-1.4\n");
        var offsets = new List<long> { 0 };
        for (var i = 1; i < objects.Count; i++) { offsets.Add(output.Position); Write($"{i} 0 obj\n{objects[i]}\nendobj\n"); }
        var xref = output.Position; Write($"xref\n0 {objects.Count}\n0000000000 65535 f \n");
        foreach (var offset in offsets.Skip(1)) Write(offset.ToString("D10", CultureInfo.InvariantCulture) + " 00000 n \n");
        Write($"trailer\n<< /Size {objects.Count} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF");
        return output.ToArray();
    }
}
