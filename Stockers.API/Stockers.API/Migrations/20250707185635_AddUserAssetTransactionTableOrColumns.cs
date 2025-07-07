using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Stockers.API.Migrations
{
    /// <inheritdoc />
    public partial class AddUserAssetTransactionTableOrColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InvoiceID",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ProductID",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Transactions",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "TransactionType",
                table: "Transactions",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "TransactionDate",
                table: "Transactions",
                newName: "Timestamp");

            migrationBuilder.RenameColumn(
                name: "QuantityChange",
                table: "Transactions",
                newName: "UserId");

            migrationBuilder.AddColumn<string>(
                name: "AssetSymbol",
                table: "Transactions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "PricePerShare",
                table: "Transactions",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Quantity",
                table: "Transactions",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetSymbol",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "PricePerShare",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Transactions",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Transactions",
                newName: "QuantityChange");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Transactions",
                newName: "TransactionType");

            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "Transactions",
                newName: "TransactionDate");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceID",
                table: "Transactions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductID",
                table: "Transactions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
