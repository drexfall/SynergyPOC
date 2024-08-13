using Core.App.Form.Models;
using Core.App.Form.Data;
using Core.App.Form.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Core.App.Form.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormTemplateController(CoreDbContext dBContext) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await dBContext.FormTemplate.ToListAsync();
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
                var result = await dBContext.FormTemplate.FindAsync(id);
                if (result == null) return NotFound();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(FormTemplateViewModel model)
        {
            try
            {
                Template t = new()
                {

                };
                FormTemplate ft = new()
                {
                  TemplateId  = t.Id
                };
                await dBContext.FormTemplate.AddAsync(ft);
            }
            catch (Exception e)
            {
                return BadRequest();
            }

            return Ok(model);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Edit(Guid id, FormTemplate model)
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
            var model = await dBContext.FormTemplate.FindAsync(id);
            if (model == null) return NotFound();
            dBContext.FormTemplate.Remove(model);
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