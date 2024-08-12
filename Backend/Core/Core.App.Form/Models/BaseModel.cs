using System.ComponentModel.DataAnnotations;
namespace Core.App.Form.Models;

public class BaseModel
{
    
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    [DataType(DataType.DateTime)]
    public required DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public bool IsDeleted { get; set; } = false;
}