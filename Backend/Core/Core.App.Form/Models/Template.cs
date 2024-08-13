namespace Core.App.Form.Models;

public class Template: BaseModel
{
    
    public string Name { get; set; }
    public string DisplayName { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    
    public string Json { get; set; } = "{}";
    public string DataJson { get; set; } = "{}";
    
}