using Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.Migrations;

public class FormDB : DbContext
{
    public FormDB(DbContextOptions<FormDB> options)
        : base(options)
    {
    }

    public DbSet<FormModel> Todos => Set<FormModel>();
}