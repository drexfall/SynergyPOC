using Core.App.Form.Models;
using Core.App.Form.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Core.App.Form.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController(CoreDbContext dBContext) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await dBContext.Form.ToListAsync();
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await dBContext.Form.FindAsync(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(FormModel model)
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
        public async Task<IActionResult> Put(Guid id, FormModel model)
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
            var model = await dBContext.Form.FindAsync(id);
            if (model == null) return NotFound();
            dBContext.Form.Remove(model);
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