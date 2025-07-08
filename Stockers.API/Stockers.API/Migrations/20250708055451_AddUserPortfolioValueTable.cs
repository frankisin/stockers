using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Stockers.API.Migrations
{
    /// <inheritdoc />
    public partial class AddUserPortfolioValueTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PortfolioValue",
                table: "users",
                type: "numeric",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PortfolioValue",
                table: "users");
        }
    }
}
