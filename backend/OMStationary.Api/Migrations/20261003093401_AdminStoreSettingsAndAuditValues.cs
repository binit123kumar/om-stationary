using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OMStationary.Api.Migrations
{
    /// <inheritdoc />
    public partial class AdminStoreSettingsAndAuditValues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NewValue",
                table: "AuditLogs",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OldValue",
                table: "AuditLogs",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StoreSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoreName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    StoreAddress = table.Column<string>(type: "nvarchar(600)", maxLength: 600, nullable: true),
                    StorePhone = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    StoreEmail = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: true),
                    StoreHours = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TaxRatePercent = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TaxRegistration = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: true),
                    UdyamRegistration = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: true),
                    InvoicePrefix = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: true),
                    PickupAddress = table.Column<string>(type: "nvarchar(600)", maxLength: 600, nullable: true),
                    PickupHours = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    PickupAvailable = table.Column<bool>(type: "bit", nullable: true),
                    DeliveryEnabled = table.Column<bool>(type: "bit", nullable: true),
                    DeliveryCities = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    DeliveryCharge = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    DeliveryMaxRadiusKm = table.Column<double>(type: "float", nullable: true),
                    PaymentProvider = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    PaymentEnabled = table.Column<bool>(type: "bit", nullable: true),
                    UpdatedByUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreSettings", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StoreSettings_UpdatedAt",
                table: "StoreSettings",
                column: "UpdatedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StoreSettings");

            migrationBuilder.DropColumn(
                name: "NewValue",
                table: "AuditLogs");

            migrationBuilder.DropColumn(
                name: "OldValue",
                table: "AuditLogs");
        }
    }
}
