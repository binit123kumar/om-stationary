using Microsoft.AspNetCore.Mvc;

namespace OMStationary.Api.Controllers;

[ApiController]
[Route("api/locations")]
public class LocationsController(IConfiguration configuration) : ControllerBase
{
    [HttpGet("om-stationary")]
    public IActionResult OmStationaryPickup()
    {
        var location = configuration.GetSection("OmStationary");
        var address = location["Address"]?.Trim() ?? "";
        static string ConfiguredValue(string? value)
        {
            var clean = value?.Trim() ?? "";
            return clean.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase) ? "" : clean;
        }
        var latitude = location["Latitude"]?.Trim() ?? "";
        var longitude = location["Longitude"]?.Trim() ?? "";
        var hasCoordinates = double.TryParse(latitude, System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out _) &&
                             double.TryParse(longitude, System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out _);
        var configured = !string.IsNullOrWhiteSpace(address) && !address.StartsWith("[PUT ", StringComparison.OrdinalIgnoreCase);
        return Ok(new
        {
            name = "OM Stationary",
            address = configured ? address : "",
            phone = ConfiguredValue(location["Phone"]),
            email = ConfiguredValue(location["Email"]),
            hours = ConfiguredValue(location["Hours"]),
            opensAt = ConfiguredValue(location["OpensAt"]),
            closesAt = ConfiguredValue(location["ClosesAt"]),
            latitude = hasCoordinates ? latitude : "",
            longitude = hasCoordinates ? longitude : "",
            pickupAvailable = configured
        });
    }
}
