using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class SetsandRowsMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RowModel_SetModel_SetId",
                table: "RowModel");

            migrationBuilder.DropForeignKey(
                name: "FK_SetModel_AspNetUsers_UserId",
                table: "SetModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SetModel",
                table: "SetModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RowModel",
                table: "RowModel");

            migrationBuilder.RenameTable(
                name: "SetModel",
                newName: "Sets");

            migrationBuilder.RenameTable(
                name: "RowModel",
                newName: "Rows");

            migrationBuilder.RenameIndex(
                name: "IX_SetModel_UserId",
                table: "Sets",
                newName: "IX_Sets_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_RowModel_SetId",
                table: "Rows",
                newName: "IX_Rows_SetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sets",
                table: "Sets",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rows",
                table: "Rows",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rows_Sets_SetId",
                table: "Rows",
                column: "SetId",
                principalTable: "Sets",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sets_AspNetUsers_UserId",
                table: "Sets",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rows_Sets_SetId",
                table: "Rows");

            migrationBuilder.DropForeignKey(
                name: "FK_Sets_AspNetUsers_UserId",
                table: "Sets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sets",
                table: "Sets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Rows",
                table: "Rows");

            migrationBuilder.RenameTable(
                name: "Sets",
                newName: "SetModel");

            migrationBuilder.RenameTable(
                name: "Rows",
                newName: "RowModel");

            migrationBuilder.RenameIndex(
                name: "IX_Sets_UserId",
                table: "SetModel",
                newName: "IX_SetModel_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Rows_SetId",
                table: "RowModel",
                newName: "IX_RowModel_SetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SetModel",
                table: "SetModel",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RowModel",
                table: "RowModel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RowModel_SetModel_SetId",
                table: "RowModel",
                column: "SetId",
                principalTable: "SetModel",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SetModel_AspNetUsers_UserId",
                table: "SetModel",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
