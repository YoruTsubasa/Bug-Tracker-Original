using Bug_Tracker.Enums;

namespace Bug_Tracker.Models;

public class UserFrontEndModel
{
    public Guid Guid { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Place { get; set; }

    public string Email { get; set; }
    public UserType Type { get; set; }

    public UserFrontEndModel()
    {
        
    }

    public UserFrontEndModel(Guid guid, string firstName, string lastName, string place, string email, UserType type)
    {
        Guid = guid;
        FirstName = firstName;
        LastName = lastName;
        Place = place;
        Email = email;
        Type = type;
        Type = UserType.Regular;
    }
}