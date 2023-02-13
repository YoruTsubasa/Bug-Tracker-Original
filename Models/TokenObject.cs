namespace Bug_Tracker.Models;

public class TokenObject
{
    public string Token { get; set; }

    public TokenObject(string token)
    {
        Token = token;
    }
}