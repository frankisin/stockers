using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Stockers.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePortfolioValueToOhlc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalValue",
                table: "userportfoliovalue",
                newName: "Open");

            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "userportfoliovalue",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "assetpricehistory",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "assetpricehistory",
                newName: "Open");

            migrationBuilder.AddColumn<decimal>(
                name: "Close",
                table: "userportfoliovalue",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "High",
                table: "userportfoliovalue",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Low",
                table: "userportfoliovalue",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Close",
                table: "assetpricehistory",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "High",
                table: "assetpricehistory",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Low",
                table: "assetpricehistory",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<long>(
                name: "Volume",
                table: "assetpricehistory",
                type: "bigint",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Close",
                table: "userportfoliovalue");

            migrationBuilder.DropColumn(
                name: "High",
                table: "userportfoliovalue");

            migrationBuilder.DropColumn(
                name: "Low",
                table: "userportfoliovalue");

            migrationBuilder.DropColumn(
                name: "Close",
                table: "assetpricehistory");

            migrationBuilder.DropColumn(
                name: "High",
                table: "assetpricehistory");

            migrationBuilder.DropColumn(
                name: "Low",
                table: "assetpricehistory");

            migrationBuilder.DropColumn(
                name: "Volume",
                table: "assetpricehistory");

            migrationBuilder.RenameColumn(
                name: "Open",
                table: "userportfoliovalue",
                newName: "TotalValue");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "userportfoliovalue",
                newName: "Timestamp");

            migrationBuilder.RenameColumn(
                name: "Open",
                table: "assetpricehistory",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "assetpricehistory",
                newName: "Timestamp");
        }
    }
}
