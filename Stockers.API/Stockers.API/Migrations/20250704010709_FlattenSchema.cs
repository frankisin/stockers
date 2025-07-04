using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Stockers.API.Migrations
{
    /// <inheritdoc />
    public partial class FlattenSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_cart",
                table: "cartitems");

            migrationBuilder.DropForeignKey(
                name: "fk_product",
                table: "cartitems");

            migrationBuilder.DropForeignKey(
                name: "FK_carts_users_userid",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceItems_Products_ProductID",
                table: "InvoiceItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_carts_userid",
                table: "carts");

            migrationBuilder.DropIndex(
                name: "IX_cartitems_cartid",
                table: "cartitems");

            migrationBuilder.DropIndex(
                name: "IX_cartitems_productid",
                table: "cartitems");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "products");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "products",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "userid",
                table: "carts",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "cartitems",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "productid",
                table: "cartitems",
                newName: "ProductID");

            migrationBuilder.RenameColumn(
                name: "cartid",
                table: "cartitems",
                newName: "CartID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_products",
                table: "products",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceItems_products_ProductID",
                table: "InvoiceItems",
                column: "ProductID",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceItems_products_ProductID",
                table: "InvoiceItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_products",
                table: "products");

            migrationBuilder.RenameTable(
                name: "products",
                newName: "Products");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Products",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "carts",
                newName: "userid");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "cartitems",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "ProductID",
                table: "cartitems",
                newName: "productid");

            migrationBuilder.RenameColumn(
                name: "CartID",
                table: "cartitems",
                newName: "cartid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "ID");

            migrationBuilder.CreateIndex(
                name: "IX_carts_userid",
                table: "carts",
                column: "userid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_cartitems_cartid",
                table: "cartitems",
                column: "cartid");

            migrationBuilder.CreateIndex(
                name: "IX_cartitems_productid",
                table: "cartitems",
                column: "productid");

            migrationBuilder.AddForeignKey(
                name: "fk_cart",
                table: "cartitems",
                column: "cartid",
                principalTable: "carts",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_product",
                table: "cartitems",
                column: "productid",
                principalTable: "Products",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_carts_users_userid",
                table: "carts",
                column: "userid",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceItems_Products_ProductID",
                table: "InvoiceItems",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
