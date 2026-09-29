namespace OMStationary.Api.Services;

public static class TaxCalculator
{
    public static decimal Calculate(decimal taxableAmount, decimal ratePercent)
    {
        if (ratePercent < 0 || ratePercent > 100) throw new InvalidOperationException("Tax:RatePercent must be between 0 and 100.");
        return Math.Round(Math.Max(0m, taxableAmount) * ratePercent / 100m, 2, MidpointRounding.AwayFromZero);
    }
}
