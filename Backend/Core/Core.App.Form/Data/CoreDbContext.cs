using Core.App.Form.Models;
using Microsoft.EntityFrameworkCore;

namespace Core.App.Form.Data;

public class CoreDbContext(DbContextOptions<CoreDbContext> options) : DbContext(options)
{
    public DbSet<FormModel> Form => Set<FormModel>();
    public DbSet<FormTemplateModel> FormTemplate => Set<FormTemplateModel>();
}