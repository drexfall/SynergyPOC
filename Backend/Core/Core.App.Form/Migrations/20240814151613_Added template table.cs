using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Core.App.Form.Migrations
{
    /// <inheritdoc />
    public partial class Addedtemplatetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormTemplate");

            migrationBuilder.RenameColumn(
                name: "DataJson",
                table: "Template",
                newName: "Html");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Html",
                table: "Template",
                newName: "DataJson");

            migrationBuilder.CreateTable(
                name: "FormTemplate",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TemplateId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EnableIndexPage = table.Column<bool>(type: "boolean", nullable: false),
                    FormType = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    LastModifiedBy = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormTemplate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FormTemplate_Template_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Template",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FormTemplate_TemplateId",
                table: "FormTemplate",
                column: "TemplateId");
        }
    }
}
