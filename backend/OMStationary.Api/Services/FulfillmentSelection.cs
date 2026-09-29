using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

public sealed record RequestedProduct(int ProductId, int Quantity);
public sealed record FulfillmentRequest(double Latitude, double Longitude, IReadOnlyCollection<RequestedProduct> Items);
public sealed record FulfillmentCandidate(PartnerShop Shop, Dictionary<int, ShopProduct> Inventory, decimal Subtotal,
    decimal DeliveryFee, double DistanceKm, int EstimatedDeliveryMinutes)
{
    public decimal Total => Subtotal + DeliveryFee;
}

public interface IFulfillmentProvider
{
    string Name { get; }
    bool IsEnabled { get; }
    Task<IReadOnlyList<FulfillmentCandidate>> FindCandidates(FulfillmentRequest request, CancellationToken cancellationToken);
}

public interface ILocalShopFulfillmentProvider : IFulfillmentProvider { }
public interface IExternalPlatformFulfillmentProvider : IFulfillmentProvider { }

public sealed class LocalShopFulfillmentProvider(OmDbContext db, IConfiguration configuration) : ILocalShopFulfillmentProvider
{
    public string Name => "LocalShop";
    public bool IsEnabled => configuration.GetValue<bool>("Delivery:Enabled");

    public async Task<IReadOnlyList<FulfillmentCandidate>> FindCandidates(FulfillmentRequest request, CancellationToken cancellationToken)
    {
        if (!IsEnabled || request.Items.Count == 0) return [];
        var ids = request.Items.Select(x => x.ProductId).Distinct().ToArray();
        var products = await db.Products.AsNoTracking().Where(x => x.IsActive && ids.Contains(x.Id)).ToDictionaryAsync(x => x.Id, cancellationToken);
        if (products.Count != ids.Length) return [];
        var shops = await db.PartnerShops.AsNoTracking().Where(x => x.IsActive && x.IsApproved && x.SupportsDelivery)
            .ToListAsync(cancellationToken);
        var radius = configuration.GetValue<double?>("Delivery:MaxRadiusKm") ?? 20;
        var fee = configuration.GetValue<decimal?>("Delivery:Charge");
        if (fee is null || fee < 0) return [];
        var candidates = new List<FulfillmentCandidate>();
        foreach (var shop in shops)
        {
            if (shop.Latitude == 0 && shop.Longitude == 0) continue;
            var distance = GeoDistance.Kilometers(request.Latitude, request.Longitude, shop.Latitude, shop.Longitude);
            if (distance > radius) continue;
            var inventory = await db.ShopProducts.AsNoTracking().Where(x => x.PartnerShopId == shop.Id && x.IsAvailable && ids.Contains(x.ProductId))
                .ToDictionaryAsync(x => x.ProductId, cancellationToken);
            if (!request.Items.All(x => inventory.TryGetValue(x.ProductId, out var stock) && stock.Stock >= x.Quantity)) continue;
            var subtotal = request.Items.Sum(x => inventory[x.ProductId].SellingPrice * x.Quantity);
            candidates.Add(new FulfillmentCandidate(shop, inventory, subtotal, fee.Value, distance, shop.EstimatedDeliveryMinutes));
        }
        return candidates.OrderBy(x => x.Total).ThenBy(x => x.EstimatedDeliveryMinutes).ThenBy(x => x.DistanceKm).ThenBy(x => x.Shop.Id).ToArray();
    }
}

public sealed class DisabledExternalPlatformFulfillmentProvider(IConfiguration configuration) : IExternalPlatformFulfillmentProvider
{
    public string Name => "ExternalPlatforms";
    public bool IsEnabled => configuration.GetValue<bool>("Connectors:ExternalEnabled");
    public Task<IReadOnlyList<FulfillmentCandidate>> FindCandidates(FulfillmentRequest request, CancellationToken cancellationToken) =>
        Task.FromResult<IReadOnlyList<FulfillmentCandidate>>([]);
}

public sealed class FulfillmentSelectionService(IEnumerable<IFulfillmentProvider> providers)
{
    public async Task<FulfillmentCandidate?> SelectAsync(FulfillmentRequest request, CancellationToken cancellationToken = default)
    {
        foreach (var provider in providers.Where(x => x.IsEnabled).OrderBy(x => x is ILocalShopFulfillmentProvider ? 0 : 1))
        {
            var candidates = await provider.FindCandidates(request, cancellationToken);
            if (candidates.Count > 0) return candidates[0];
        }
        return null;
    }
}
