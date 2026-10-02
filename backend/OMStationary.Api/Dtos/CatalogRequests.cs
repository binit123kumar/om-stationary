namespace OMStationary.Api.Dtos;

// Request bodies for the OM Stationary admin catalogue. Prices and stock are only ever
// accepted from an authorized Admin; the public API never mutates these fields.
public sealed class ProductWriteRequest
{
    public string Name { get; set; } = "";
    public string? Slug { get; set; }
    public string ShortDescription { get; set; } = "";
    public string Description { get; set; } = "";
    public string Sku { get; set; } = "";
    public string Brand { get; set; } = "";
    public string Unit { get; set; } = "Piece";
    public string Category { get; set; } = "";
    public int? CategoryId { get; set; }
    public decimal Price { get; set; }
    public decimal MRP { get; set; }
    public int Stock { get; set; }
    public int LowStockThreshold { get; set; } = 5;
    public string ImageUrl { get; set; } = "";
    public List<string>? ImageUrls { get; set; }
    public bool IsActive { get; set; } = true;
}

public sealed class StockAdjustmentRequest
{
    public int Delta { get; set; }
    public string? Reason { get; set; }
}

public sealed class CategoryWriteRequest
{
    public string Name { get; set; } = "";
    public bool IsActive { get; set; } = true;
}

