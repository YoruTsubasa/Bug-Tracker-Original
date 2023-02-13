using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Bug_Tracker.Enums;

namespace Bug_Tracker.Models;

public class TicketDbEntity
{
    public Guid Guid { get; set; }
    [Key]
    public int TicketDbEntityID { get; set; }
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    
    public ProjectDbEntity Project { get; set; }
    
    [ForeignKey("ProjectDbEntity")]
    public int ProjectDbEntityID { get; set; }
    
    public User Submitter { get; set; }
    public int SubmitterID { get; set; }
    public TicketPriority TicketPriority { get; set; }
    public TicketType TicketType { get; set; }
    public DateTime Updated { get; set; }
    public DateTime Created { get; set; }
    public TicketStatus TicketStatus { get; set; }
    public ICollection<CommentDbEntity> Comments { get; set; }
    
    public User AssignedDeveloper { get; set; }
    public int AssignedDeveloperID { get; set; }
   
   
    public TicketDbEntity()
    {
        Guid = Guid.NewGuid();
    }
    
    public TicketDbEntity(string title, string description, User submitter, TicketPriority ticketPriority, 
        TicketType ticketType, DateTime updated, DateTime created, 
        TicketStatus ticketStatus, ProjectDbEntity project, User assignedDeveloper, List<CommentDbEntity> comments)
    {
        Guid = Guid.NewGuid();
        Title = title;
        Description = description;
        Submitter = submitter;
        TicketPriority = ticketPriority;
        TicketType = ticketType;
        Updated = updated;
        Created = created;
        TicketStatus = ticketStatus;
        Project = project;
        AssignedDeveloper = assignedDeveloper;
        Comments = comments;
    }
}