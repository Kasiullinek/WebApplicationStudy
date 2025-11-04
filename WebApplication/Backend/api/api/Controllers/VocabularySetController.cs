using api.Interfaces;
using api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VocabularySetController(IVocabularySet vocabularySet) : ControllerBase
    {
        [Authorize(Roles = "User")]
        [HttpGet("GetUserSets")]
        public async Task<ActionResult<IEnumerable<SetDto>>> GetUserSets()
        {
            var result = await vocabularySet.GetUserSets();
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpGet("GetUserSet")]
        public async Task<ActionResult<SetDto>> GetUserSet(int setId)
        {
            var result = await vocabularySet.GetUserSet(setId);
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpPut("UpdateSet")]
        public async Task<IActionResult> UpdateSet(SetDto setDto)
        {
            var result = await vocabularySet.UpdateSet(setDto);
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpPost("AddSet")]
        public async Task<IActionResult> AddSet(SetDto setDto)
        {
            var result = await vocabularySet.AddSet(setDto);
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpPost("AddRow")]
        public async Task<IActionResult> AddRow(RowDto rowDto)
        {
            var result = await vocabularySet.AddRow(rowDto);
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpDelete("DeleteSet")]
        public async Task<IActionResult> DeleteSet(int setId)
        {
            var result = await vocabularySet.DeleteSet(setId);
            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpDelete("DeleteRow")]
        public async Task<IActionResult> DeleteRow(int rowId, int setId)
        {
            var result = await vocabularySet.DeleteRow(rowId, setId);
            return Ok(result);
        }
    }
}
