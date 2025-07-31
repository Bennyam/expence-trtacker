using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpenceController : ControllerBase
{
    private readonly AppDbContext _context;

    public ExpenceController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Expense>>> GetAll()
    {
        return await _context.Expenses.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Expense>> Create([FromBody] Expense expense)
    {
        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new { id = expense.Id }, expense);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var expense = await _context.Expenses.FindAsync(id);
        if (expense == null)
            return NotFound();

        _context.Expenses.Remove(expense);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
