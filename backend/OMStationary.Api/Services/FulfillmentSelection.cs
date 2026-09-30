using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
using OMStationary.Api.Models;

namespace OMStationary.Api.Services;

public sealed record RequestedProduct(int ProductId, int Quantity);
public sealed record FulfillmentRequest(double Latitude, double Longitude, IReadOnlyCollection<RequestedProduct> Items);

// A fulfillment candidate describes where the goods come from. OM Stationary fulfils from its own
// warehouse stock (Shop is null). An approved PartnerShop may also supply the order, in which case
// Shop is set so the order can be attributed and settled against that partner later.
public sealed record FulfillmentCandidate(PartnerShop? Shop, Dictionary<int, decimal> UnitPrices, decimal Subtotal,
    decimal DeliveryFee, double DistanceKm, int EstimatedDeliveryMinutes, string PickupAddress)
{
    public decimal Total => Subtotal + DeliveryFee;
}

public interface IFulfillmentProvider
{
    string Name { get; }
    bool IsEnabled { get; }
    Task<IReadOnlyList<FulfillmentCandidate>> FindCandidates(FulfillmentRequest request, CancellationToken cancellationToken);
}

// OM Stationary sells its own stock. Orders are fulfilled from OM Stationary inventory first and only
// fall back to an approved partner shop acting on OM Stationary's behalf. Never an external marketplace.
public sealed class FirstPartyFulfillmentProvider(OmDbContext db, IConfiguration configuration) : IFulfillmentProvider
{
    public string Name => "OMStationary";
    public bool IsEnabled => true;

    private double StoreLatitude => configuration.GetValue<double?>("OmStationary:Latitude")
        ?? configuration.GetValue<double?>("Billing:Latitude") ?? 0;
    private double StoreLongitude => configuration.GetValue<double?>("OmStationary:Longitude")
        ?? configuration.GetValue<double?>("Billing:Longitude") ?? 0;
    private string PickupAddress => configuration.GetValue<string>("OmStationary:Address")
        ?? configuration.GetValue<string>("Shop:PickupAddress") ?? "OM Stationary";

    public async Task<IReadOnlyList<FulfillmentCandidate>> FindCandidates(FulfillmentRequest request, CancellationToken cancellationToken)
    {
        var ids = request.Items.Select(x => x.ProductId).Distinct().ToArray();
        var products = await db.Products.AsNoTracking().Where(x => x.IsActive && ids.Contains(x.Id)).ToDictionaryAsync(x => x.Id, cancellationToken);
        if (products.Count != ids.Length) return [];

        var radius = configuration.GetValue<double?>("Delivery:MaxRadiusKm") ?? 20;
        var fee = configuration.GetValue<decimal?>("Delivery:Charge") ?? 0m;
        var candidates = new List<FulfillmentCandidate>();

        // 1. OM Stationary's own stock. Distance is measured from the store to the drop point.
        if (request.Items.All(x => products[x.ProductId].Stock >= x.Quantity))
        {
            var prices = products.Values.ToDictionary(p => p.Id, p => p.Price);
            var subtotal = request.Items.Sum(x => prices[x.ProductId] * x.Quantity);
            var storeDistance = StoreLatitude == 0 && StoreLongitude == 0
                ? 0
                : GeoDistance.Kilometers(request.Latitude, request.Longitude, StoreLatitude, StoreLongitude);
            if (storeDistance <= radius)
                candidates.Add(new FulfillmentCandidate(null, prices, subtotal, fee, storeDistance,
                    EstimateMinutes(storeDistance), PickupAddress));
        }

        // 2. Approved partner shops that stock the requested items and sit inside the delivery radius.
        var shops = await db.PartnerShops.AsNoTracking().Where(x => x.IsActive && x.IsApproved && x.SupportsDelivery)
            .ToListAsync(cancellationToken);
        foreach (var shop in shops)
        {
            if (shop.Latitude == 0 && shop.Longitude == 0) continue;
            var distance = GeoDistance.Kilometers(request.Latitude, request.Longitude, shop.Latitude, shop.Longitude);
            if (distance > radius) continue;
            var inventory = await db.ShopProducts.AsNoTracking().Where(x => x.PartnerShopId == shop.Id && x.IsAvailable && ids.Contains(x.ProductId))
                .ToDictionaryAsync(x => x.ProductId, cancellationToken);
            if (!request.Items.All(x => inventory.TryGetValue(x.ProductId, out var stock) && stock.Stock >= x.Quantity)) continue;
            var prices = request.Items.DistinctBy(x => x.ProductId).ToDictionary(x => x.ProductId, x => inventory[x.ProductId].SellingPrice);
            var subtotal = request.Items.Sum(x => prices[x.ProductId] * x.Quantity);
            candidates.Add(new FulfillmentCandidate(shop, prices, subtotal, fee, distance,
                shop.EstimatedDeliveryMinutes, shop.Address));
        }

        // Own stock first, then cheapest.
        return candidates.OrderBy(x => x.Shop is not null)
            .ThenBy(x => x.Total).ThenBy(x => x.EstimatedDeliveryMinutes).ThenBy(x => x.DistanceKm)
            .ThenBy(x => x.Shop?.Id ?? 0).ToArray();
    }

    private static int EstimateMinutes(double distanceKm) => (int)Math.Round(20 + distanceKm * 4);
}

public sealed class FulfillmentSelectionService(IEnumerable<IFulfillmentProvider> providers)
{
    public async Task<FulfillmentCandidate?> SelectAsync(FulfillmentRequest request, CancellationToken cancellationToken = default)
    {
        foreach (var provider in providers.Where(x => x.IsEnabled))
        {
            var candidates = await provider.FindCandidates(request, cancellationToken);
            if (candidates.Count > 0) return candidates[0];
        }
        return null;
    }
}
