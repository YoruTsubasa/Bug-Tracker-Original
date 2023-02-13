using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Bug_Tracker.Data;
using Microsoft.IdentityModel.Tokens;

namespace Bug_Tracker.Models;

public class Authentication
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;

    public Authentication(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }


    public bool VerifyPasswordHash(string email, string password)
    {
        var user = User.FindUserInContext(_context, email);
        
        if (user == null)
            return false;

        using (var hmac = new HMACSHA512(user.PasswordSalt))
        {
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(user.PasswordHash);
        }
    }

    public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.ASCII.GetBytes(password));
        }
    }

    public string CreateToken(User user) // creates a jwt token with email and user role in the claims
    {
        List<Claim> claims = new List<Claim>()
        {
            new Claim("Email", user.Email),
            new Claim("Role", user.Type.ToString()),
        };
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:SecretKey").Value));
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
        var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: cred);
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public bool ValidateJWTToken(string token)
    { 
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:SecretKey").Value));

        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                IssuerSigningKey = key
            }, out SecurityToken validatedToken);
        }
        catch
        {
            return false;
        }

        return true;
    }
    
    public string GetClaim(string token, string claimType)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

        var stringClaimValue = securityToken.Claims.First(claim => claim.Type == claimType).Value;
        return stringClaimValue;
    }
}