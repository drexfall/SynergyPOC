using System.Text;
using Core.App.Form.Models;
using Core.App.Form.Data;
using Core.App.Form.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Core.App.Form.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class TemplateController(CoreDbContext dBContext) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await dBContext.Template.ToListAsync();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                var result = await dBContext.Template.FindAsync(id);
                if (result == null) return NotFound();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Create(TemplateViewModel model)
        {
            try
            {
                Template t = new()
                {
                    Name = model.Name ?? "",
                    DisplayName = model.DisplayName ?? "",
                    Code = model.Code ?? "",
                    CreatedBy = Guid.NewGuid(),
                    LastModifiedBy = Guid.NewGuid(),
                    Description = model.Description ?? "",
                    Html = model.Html ?? "<div></div>",
                    Json = model.Json ?? "{}"
                };
                dBContext.Template.Add(t);
                dBContext.SaveChanges();

                var query = $@"create table template.""{t.Name}""();";

                dBContext.Database.ExecuteSql($"{query}");
                return CreatedAtAction(nameof(Create), new { id = t.Id }, t);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Edit(Guid id, Template model)
        {
            try
            {
                await dBContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var model = await dBContext.Template.FindAsync(id);
            if (model == null) return NotFound();
            dBContext.Template.Remove(model);
            try
            {
                await dBContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest();
            }

            return Ok(new { message = "Item deleted successfully" });
        }
    }
}