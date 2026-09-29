namespace OMStationary.Api.Services;

public static class OrderStateMachine
{
    private static readonly IReadOnlyDictionary<string, string[]> Transitions = new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
    {
        ["Placed"] = ["Confirmed", "Cancelled"],
        ["Pending"] = ["Confirmed", "Accepted", "Cancelled"],
        ["Confirmed"] = ["Accepted", "Preparing", "Cancelled"],
        ["Accepted"] = ["Preparing", "Cancelled"],
        ["Preparing"] = ["Ready for Pickup", "Out for Delivery", "Cancelled"],
        ["Ready for Pickup"] = ["Picked Up", "Out for Delivery", "Cancelled"],
        ["Picked Up"] = ["RefundPending"],
        ["Out for Delivery"] = ["Delivered", "Delivery Failed", "Cancelled"],
        ["Delivery Failed"] = ["Confirmed", "Cancelled"],
        ["Delivered"] = ["RefundPending"], ["Cancelled"] = [], ["RefundPending"] = ["Refunded"], ["Refunded"] = []
    };

    public static bool CanTransition(string current, string next) =>
        Transitions.TryGetValue(current, out var allowed) && allowed.Contains(next, StringComparer.OrdinalIgnoreCase);

    public static string[] Statuses => Transitions.SelectMany(x => new[] { x.Key }.Concat(x.Value)).Distinct(StringComparer.OrdinalIgnoreCase).ToArray();
}
