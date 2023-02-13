using Bug_Tracker.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bug_Tracker.Controllers;


[ApiController]
[Route("/super-hero")]
public class SuperHeroController : Controller
{
    private readonly DataContext _context;

    public SuperHeroController(DataContext context)
    {
        _context = context;
    }

    // GET
    [HttpGet("heroes")]
    public async Task<IActionResult> GetSuperHeroes()
    {
        return Ok(await _context.SuperHeroes.ToListAsync());
    }
}