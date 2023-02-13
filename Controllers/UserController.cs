using System.Net;
using Bug_Tracker.Data;
using Bug_Tracker.Enums;
using Bug_Tracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bug_Tracker.Controllers;


[ApiController]
[Route("/user")]
public class UserController : Controller
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly Authentication _authentication;

    public UserController(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
        _authentication = new Authentication(context, configuration);
    }
    
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
       var userList = _context.Users.Select((entry) => new UserFrontEndModel()
        {
            Guid = entry.Guid,
            FirstName = entry.FirstName,
            LastName = entry.LastName,
            Place = entry.Place,
            Email = entry.Email,
            Type = entry.Type,
        }).ToList();
        
        return Ok(userList);
    }
    
    [HttpGet("user/{userGuid}")]
    public async Task<IActionResult> GetUser([FromRoute] Guid userGuid)
    {
        return Ok((from userEntry in _context.Users where userEntry.Guid == userGuid select userEntry).First());
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterModel request)
    {
        _authentication.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Place = request.Place,
            Type = UserType.Regular, // default value
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            Guid = Guid.NewGuid()
        };
        
        var entityEntry =  _context.Users.Add(user).Entity;
        _context.SaveChanges();// store in DB
        
        return Ok(entityEntry);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginModel request)
    {
        
       var user = Models.User.FindUserInContext(_context, request.Email);
        
       if (user == null)
           return BadRequest("User does not exist.");

       if (!_authentication.VerifyPasswordHash(request.Email, request.Password))
           return StatusCode((int)HttpStatusCode.Unauthorized, "Wrong password.");

       return Ok(_authentication.CreateToken(user));
    }

    [HttpPut("change-role")]
    public async Task<IActionResult> ChangeRole([FromBody] UserFrontEndModel user)
    {
        var result = _context.Users.SingleOrDefault(userDb =>  userDb.Guid == user.Guid);
        
        if (result != null)
        {
            result.Type = user.Type;
            _context.SaveChanges();
            return Ok();
        }

        return StatusCode((int)HttpStatusCode.NotFound, "user was not found.");
    }
}