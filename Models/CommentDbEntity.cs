using System.ComponentModel.DataAnnotations;

namespace Bug_Tracker.Models;

public class CommentDbEntity
{
    public Guid Guid { get; set; }
    [Key]
    
    public int CommentDbEntityID { get; set; }
    public User Commenter { get; set; }
    public string Message { get; set; }
    public DateTime Created { get; set; }
    
    public TicketDbEntity Ticket { get; set; }
    
    public int TicketID { get; set; }

    public CommentDbEntity()
    {
        Guid = Guid.NewGuid();
    }

    public CommentDbEntity(User commenter, string message, DateTime created, TicketDbEntity ticket)
    {
        Guid = Guid.NewGuid();
        Commenter = commenter;
        Message = message;
        Created = created;
        Ticket = ticket;
    }
}