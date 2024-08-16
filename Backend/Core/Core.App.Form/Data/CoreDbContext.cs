using Core.App.Form.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.App.Form.Data;

public class CoreDbContext(DbContextOptions<CoreDbContext> options) : DbContext(options)
{
    public DbSet<Models.Form> Form => Set<Models.Form>();
    public DbSet<Template> Template => Set<Template>();
}