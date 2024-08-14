using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Core.App.Form.Models;

public class FormTemplate : BaseModel
{
    public string FormType { get; set; }
    
    [ForeignKey("Template")] 
    public Guid TemplateId { get; set; }
    public Template Template { get; set; }
    
    public bool EnableIndexPage { get; set; }

}
public sealed record FormTemplateQueryResponse([property: JsonPropertyName("results")] IList<FormTemplate> FormTemplates);