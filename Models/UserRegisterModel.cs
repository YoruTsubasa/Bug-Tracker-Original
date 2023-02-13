using Bug_Tracker.Enums;

namespace Bug_Tracker.Models;

public class UserRegisterModel
{
    public string Email { get; set; } // email
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Place { get; set; }
}