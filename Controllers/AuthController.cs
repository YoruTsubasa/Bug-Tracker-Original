using System.Text.Json;
using Bug_Tracker.Data;
using Bug_Tracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bug_Tracker.Controllers;

[ApiController]
[Route("/authentication")]
public class AuthController : Controller
{
    public class TokenRQ
    {
        public string Token { get; set; }
    }
    
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly Authentication _authentication;

    public AuthController(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
        _authentication = new Authentication(context, configuration);
    }
    

    [HttpPost("verify-token")]
    public async Task<IActionResult> VerifyToken([FromBody] TokenRQ token)
    {
        return Ok(_authentication.ValidateJWTToken(token.Token));
    }

}