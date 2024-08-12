using Core.App.Form.Models;
using Core.App.Form.Data;
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
            var result = await dBContext.FormTemplate.ToListAsync();
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await dBContext.FormTemplate.FindAsync(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(FormTemplateModel model)
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

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Put(Guid id, FormTemplateModel model)
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

            return Ok(new {message ="Item deleted successfully"});
        }
    }
}