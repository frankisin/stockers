using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Stockers.API.Migrations
{
    /// <inheritdoc />
    public partial class AddStateAndPhoneNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "phoneNumber",
                table: "users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "state",
                table: "users",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "users");

            migrationBuilder.DropColumn(
                name: "state",
                table: "users");
        }
    }
}
