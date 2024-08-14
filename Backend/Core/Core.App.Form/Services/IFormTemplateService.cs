using Core.App.Form.Models;
using Refit;

namespace Core.App.Form.Services;

public interface IFormTemplateService
{
    /// <summary>
    /// Get a list of contacts.
    /// </summary>
    /// <param name="count">The number of contacts to retrieve.</param>
    [Get("/api/formtemplate1")]
    Task<FormTemplateQueryResponse> GetAllTemplates([AliasAs("results")] int count);
}