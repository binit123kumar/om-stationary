using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OMStationary.Api.Migrations
{
    /// <inheritdoc />
    public partial class WhatsAppNotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WhatsAppNotifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: true),
                    NotificationType = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Recipient = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                    ProviderMessageId = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: false),
                    ErrorMessage = table.Column<string>(type: "nvarchar(600)", maxLength: 600, nullable: true),
                    Attempts = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SentAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeliveredAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WhatsAppNotifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WhatsAppNotifications_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_WhatsAppNotifications_CreatedAt",
                table: "WhatsAppNotifications",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_WhatsAppNotifications_NotificationType",
                table: "WhatsAppNotifications",
                column: "NotificationType");

            migrationBuilder.CreateIndex(
                name: "IX_WhatsAppNotifications_OrderId",
                table: "WhatsAppNotifications",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_WhatsAppNotifications_Status",
                table: "WhatsAppNotifications",
                column: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WhatsAppNotifications");
        }
    }
}
