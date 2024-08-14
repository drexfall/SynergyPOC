using System.ComponentModel.DataAnnotations;

namespace Core.App.Form.Models;

public class BaseModel
{
    [Key] public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public Guid CreatedBy { get; set; }
    public Guid LastModifiedBy { get; set; }
    public bool IsDeleted { get; set; } = false;
}