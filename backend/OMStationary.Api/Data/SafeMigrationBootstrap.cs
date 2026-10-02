using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace OMStationary.Api.Data;

public static class SafeMigrationBootstrap
{
    private const string LegacyBaseline = "20260929022303_InitialMvpSchema";

    public static async Task ApplyAsync(OmDbContext db, CancellationToken cancellationToken = default)
    {
        if (await db.Database.CanConnectAsync(cancellationToken))
        {
            var connection = db.Database.GetDbConnection();
            await db.Database.OpenConnectionAsync(cancellationToken);
            bool historyExists;
            bool hasBaseline;
            bool hasAnyHistory;
            bool anyLegacyTables;
            bool completeLegacySchema;
            try
            {
                historyExists = await ScalarBool(connection, null,
                    "SELECT CASE WHEN OBJECT_ID(N'dbo.__EFMigrationsHistory', N'U') IS NULL THEN 0 ELSE 1 END", cancellationToken);
                hasBaseline = historyExists && await ScalarBool(connection, null,
                    $"SELECT CASE WHEN EXISTS (SELECT 1 FROM dbo.__EFMigrationsHistory WHERE MigrationId = N'{LegacyBaseline}') THEN 1 ELSE 0 END", cancellationToken);
                hasAnyHistory = historyExists && await ScalarBool(connection, null,
                    "SELECT CASE WHEN EXISTS (SELECT 1 FROM dbo.__EFMigrationsHistory) THEN 1 ELSE 0 END", cancellationToken);
                anyLegacyTables = await ScalarBool(connection, null, @"
SELECT CASE WHEN OBJECT_ID(N'dbo.Products', N'U') IS NOT NULL OR OBJECT_ID(N'dbo.PartnerShops', N'U') IS NOT NULL OR
OBJECT_ID(N'dbo.ShopProducts', N'U') IS NOT NULL OR OBJECT_ID(N'dbo.Orders', N'U') IS NOT NULL OR
OBJECT_ID(N'dbo.OrderItems', N'U') IS NOT NULL OR OBJECT_ID(N'dbo.Deliveries', N'U') IS NOT NULL OR
OBJECT_ID(N'dbo.PlatformConnectors', N'U') IS NOT NULL THEN 1 ELSE 0 END", cancellationToken);
                completeLegacySchema = await ScalarBool(connection, null, LegacySchemaCheck, cancellationToken);
            }
            finally { await db.Database.CloseConnectionAsync(); }

            if (anyLegacyTables && !hasBaseline)
            {
                // A database with other migration history is not safe to infer or baseline.
                if (hasAnyHistory)
                    throw new InvalidOperationException("The database contains migration history but is missing the known legacy baseline. No migration was applied; review the migration history before continuing.");
                if (!completeLegacySchema)
                    throw new InvalidOperationException("Legacy tables were found, but their schema does not match the known EnsureCreated model. No migration was applied. Back up the database and review the schema before baselining.");

                await using var transaction = await db.Database.BeginTransactionAsync(cancellationToken);
                await using var command = connection.CreateCommand();
                command.Transaction = transaction.GetDbTransaction();
                command.CommandText = $@"
IF OBJECT_ID(N'dbo.__EFMigrationsHistory', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY,
        [ProductVersion] nvarchar(32) NOT NULL
    );
END;
IF NOT EXISTS (SELECT 1 FROM [dbo].[__EFMigrationsHistory])
    INSERT INTO [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'{LegacyBaseline}', N'10.0.0');";
                await command.ExecuteNonQueryAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);
            }
        }

        // Fresh databases run the legacy baseline followed by additive MVP changes. Existing EnsureCreated
        // databases are baselined only after every legacy table/column above passes its shape check.
        await db.Database.MigrateAsync(cancellationToken);
    }

    private static async Task<bool> ScalarBool(DbConnection connection, DbTransaction? transaction, string sql, CancellationToken cancellationToken)
    {
        await using var command = connection.CreateCommand();
        command.Transaction = transaction;
        command.CommandText = sql;
        return Convert.ToInt32(await command.ExecuteScalarAsync(cancellationToken)) == 1;
    }

    private const string LegacySchemaCheck = @"
SELECT CASE WHEN
OBJECT_ID(N'dbo.Products', N'U') IS NOT NULL AND OBJECT_ID(N'dbo.PartnerShops', N'U') IS NOT NULL AND
OBJECT_ID(N'dbo.ShopProducts', N'U') IS NOT NULL AND OBJECT_ID(N'dbo.Orders', N'U') IS NOT NULL AND
OBJECT_ID(N'dbo.OrderItems', N'U') IS NOT NULL AND OBJECT_ID(N'dbo.Deliveries', N'U') IS NOT NULL AND
OBJECT_ID(N'dbo.PlatformConnectors', N'U') IS NOT NULL AND
COL_LENGTH(N'dbo.Products', N'Id') IS NOT NULL AND COL_LENGTH(N'dbo.Products', N'Name') IS NOT NULL AND
COL_LENGTH(N'dbo.Products', N'Category') IS NOT NULL AND COL_LENGTH(N'dbo.Products', N'Price') IS NOT NULL AND
COL_LENGTH(N'dbo.Products', N'MRP') IS NOT NULL AND COL_LENGTH(N'dbo.Products', N'ImageUrl') IS NOT NULL AND
COL_LENGTH(N'dbo.Products', N'Description') IS NOT NULL AND COL_LENGTH(N'dbo.Products', N'IsActive') IS NOT NULL AND
COL_LENGTH(N'dbo.PartnerShops', N'Id') IS NOT NULL AND COL_LENGTH(N'dbo.PartnerShops', N'Name') IS NOT NULL AND
COL_LENGTH(N'dbo.PartnerShops', N'OwnerName') IS NOT NULL AND COL_LENGTH(N'dbo.PartnerShops', N'Address') IS NOT NULL AND
COL_LENGTH(N'dbo.PartnerShops', N'Phone') IS NOT NULL AND COL_LENGTH(N'dbo.PartnerShops', N'Pincode') IS NOT NULL AND
COL_LENGTH(N'dbo.PartnerShops', N'Latitude') IS NOT NULL AND COL_LENGTH(N'dbo.PartnerShops', N'Longitude') IS NOT NULL AND
COL_LENGTH(N'dbo.PartnerShops', N'IsApproved') IS NOT NULL AND COL_LENGTH(N'dbo.PartnerShops', N'IsActive') IS NOT NULL AND
COL_LENGTH(N'dbo.ShopProducts', N'Id') IS NOT NULL AND COL_LENGTH(N'dbo.ShopProducts', N'PartnerShopId') IS NOT NULL AND
COL_LENGTH(N'dbo.ShopProducts', N'ProductId') IS NOT NULL AND COL_LENGTH(N'dbo.ShopProducts', N'SellingPrice') IS NOT NULL AND
COL_LENGTH(N'dbo.ShopProducts', N'Stock') IS NOT NULL AND COL_LENGTH(N'dbo.ShopProducts', N'IsAvailable') IS NOT NULL AND
COL_LENGTH(N'dbo.Orders', N'Id') IS NOT NULL AND COL_LENGTH(N'dbo.Orders', N'OrderNumber') IS NOT NULL AND
COL_LENGTH(N'dbo.Orders', N'CustomerName') IS NOT NULL AND COL_LENGTH(N'dbo.Orders', N'CustomerPhone') IS NOT NULL AND
COL_LENGTH(N'dbo.Orders', N'DeliveryAddress') IS NOT NULL AND COL_LENGTH(N'dbo.Orders', N'City') IS NOT NULL AND
COL_LENGTH(N'dbo.Orders', N'Pincode') IS NOT NULL AND COL_LENGTH(N'dbo.Orders', N'RequestedDeliveryDate') IS NOT NULL AND
COL_LENGTH(N'dbo.Orders', N'Subtotal') IS NOT NULL AND COL_LENGTH(N'dbo.Orders', N'DeliveryCharge') IS NOT NULL AND
COL_LENGTH(N'dbo.Orders', N'TotalAmount') IS NOT NULL AND COL_LENGTH(N'dbo.Orders', N'PaymentMethod') IS NOT NULL AND
COL_LENGTH(N'dbo.Orders', N'PaymentStatus') IS NOT NULL AND COL_LENGTH(N'dbo.Orders', N'Status') IS NOT NULL AND
COL_LENGTH(N'dbo.Orders', N'SourceType') IS NOT NULL AND COL_LENGTH(N'dbo.Orders', N'SourceReference') IS NOT NULL AND
COL_LENGTH(N'dbo.Orders', N'CreatedAt') IS NOT NULL AND
COL_LENGTH(N'dbo.OrderItems', N'Id') IS NOT NULL AND COL_LENGTH(N'dbo.OrderItems', N'OrderId') IS NOT NULL AND
COL_LENGTH(N'dbo.OrderItems', N'ProductId') IS NOT NULL AND COL_LENGTH(N'dbo.OrderItems', N'ProductName') IS NOT NULL AND
COL_LENGTH(N'dbo.OrderItems', N'Quantity') IS NOT NULL AND COL_LENGTH(N'dbo.OrderItems', N'UnitPrice') IS NOT NULL AND
COL_LENGTH(N'dbo.Deliveries', N'Id') IS NOT NULL AND COL_LENGTH(N'dbo.Deliveries', N'OrderId') IS NOT NULL AND
COL_LENGTH(N'dbo.Deliveries', N'PartnerName') IS NOT NULL AND COL_LENGTH(N'dbo.Deliveries', N'Status') IS NOT NULL AND
COL_LENGTH(N'dbo.Deliveries', N'PickupAddress') IS NOT NULL AND COL_LENGTH(N'dbo.Deliveries', N'DropAddress') IS NOT NULL AND
COL_LENGTH(N'dbo.Deliveries', N'TrackingCode') IS NOT NULL AND COL_LENGTH(N'dbo.Deliveries', N'Charge') IS NOT NULL AND
COL_LENGTH(N'dbo.PlatformConnectors', N'Id') IS NOT NULL AND COL_LENGTH(N'dbo.PlatformConnectors', N'Name') IS NOT NULL AND
COL_LENGTH(N'dbo.PlatformConnectors', N'Type') IS NOT NULL AND COL_LENGTH(N'dbo.PlatformConnectors', N'Enabled') IS NOT NULL AND
COL_LENGTH(N'dbo.PlatformConnectors', N'OrderApiAvailable') IS NOT NULL AND COL_LENGTH(N'dbo.PlatformConnectors', N'BaseUrl') IS NOT NULL AND
COL_LENGTH(N'dbo.PlatformConnectors', N'Status') IS NOT NULL
THEN 1 ELSE 0 END";
}

