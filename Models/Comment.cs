using System.ComponentModel.DataAnnotations;

namespace Bug_Tracker.Models;

public class Comment
{
    public Guid Guid { get; set; }
    public User Commenter { get; set; }
    public string Message { get; set; }
    public DateTime Created { get; set; }
    
    public Guid TicketGuid { get; set; }

    public Comment()
    {
        Guid = Guid.NewGuid();
    }

    public Comment(User commenter, string message, DateTime created, Guid ticketGuid)
    {
        Guid = Guid.NewGuid();
        Commenter = commenter;
        Message = message;
        Created = created;
        TicketGuid = ticketGuid;
    }
}