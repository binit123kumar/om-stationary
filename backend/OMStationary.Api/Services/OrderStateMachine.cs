namespace OMStationary.Api.Services;

public static class OrderStateMachine
{
    // Pickup:   Placed -> Confirmed -> Preparing -> Ready for Pickup -> Picked Up -> Delivered
    // Delivery: Placed -> Confirmed -> Preparing -> Ready for Pickup -> Out for Delivery -> Delivered
    private static readonly IReadOnlyDictionary<string, string[]> Transitions = new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
    {
        ["Placed"] = ["Confirmed", "Cancelled"],
        ["Pending"] = ["Confirmed", "Accepted", "Cancelled"],
        ["Confirmed"] = ["Accepted", "Preparing", "Cancelled"],
        ["Accepted"] = ["Preparing", "Cancelled"],
        ["Preparing"] = ["Ready for Pickup", "Out for Delivery", "Cancelled"],
        ["Ready for Pickup"] = ["Picked Up", "Out for Delivery", "Cancelled"],
        // A pickup order completes when the customer collects it: Picked Up -> Delivered.
        ["Picked Up"] = ["Delivered", "RefundPending"],
        ["Out for Delivery"] = ["Delivered", "Delivery Failed", "Cancelled"],
        ["Delivery Failed"] = ["Confirmed", "Cancelled"],
        ["Delivered"] = ["RefundPending"], ["Cancelled"] = [], ["RefundPending"] = ["Refunded"], ["Refunded"] = []
    };

    public static bool CanTransition(string current, string next) =>
        Transitions.TryGetValue(current, out var allowed) && allowed.Contains(next, StringComparer.OrdinalIgnoreCase);

    public static string[] Statuses => Transitions.SelectMany(x => new[] { x.Key }.Concat(x.Value)).Distinct(StringComparer.OrdinalIgnoreCase).ToArray();

    /// <summary>
    /// The statuses an order may legally move to next. The admin UI renders exactly this list so it
    /// can never offer a transition the backend would reject.
    /// </summary>
    public static string[] NextStatuses(string current) =>
        Transitions.TryGetValue(current, out var allowed)
            ? allowed.Where(x => !x.Equals("Cancelled", StringComparison.OrdinalIgnoreCase)).ToArray()
            : [];
}
