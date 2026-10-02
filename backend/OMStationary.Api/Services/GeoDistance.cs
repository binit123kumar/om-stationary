namespace OMStationary.Api.Services;

public static class GeoDistance
{
    public static double Kilometers(double latitude1, double longitude1, double latitude2, double longitude2)
    {
        const double earthRadiusKm = 6371.0088;
        static double Radians(double degrees) => degrees * Math.PI / 180d;
        var dLatitude = Radians(latitude2 - latitude1);
        var dLongitude = Radians(longitude2 - longitude1);
        var a = Math.Pow(Math.Sin(dLatitude / 2), 2) +
                Math.Cos(Radians(latitude1)) * Math.Cos(Radians(latitude2)) * Math.Pow(Math.Sin(dLongitude / 2), 2);
        return earthRadiusKm * 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
    }
}

