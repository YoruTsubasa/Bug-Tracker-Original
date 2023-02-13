using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Bug_Tracker.Enums;

namespace Bug_Tracker.Models;

public class Ticket
{
    public Guid Guid { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Guid Project { get; set; }
    public string ProjectName { get; set; }
    
    public Guid SubmitterUserGuid { get; set; }
    public string SubmitterUserName { get; set; }
    public TicketPriority TicketPriority { get; set; }
    public TicketType TicketType { get; set; }
    public DateTime Updated { get; set; }
    public DateTime Created { get; set; }
    public TicketStatus TicketStatus { get; set; }
    public ICollection<Comment> Comments { get; set; }
    
    public Guid AssignedDeveloperUserGuid { get; set; }
    public string AssignedDeveloperUserName { get; set; }
   
   
    public Ticket()
    {
        Guid = Guid.NewGuid();
    }
    
    public Ticket(string title, string description, Guid submitterUserGuid, string submitterUserName ,TicketPriority ticketPriority, 
        TicketType ticketType, DateTime updated, DateTime created, 
        TicketStatus ticketStatus, Guid project, string projectName , Guid assignedDeveloperUserGuid, string assignedDeveloperUserName ,List<Comment> comments)
    {
        Guid = Guid.NewGuid();
        Title = title;
        Description = description;
        SubmitterUserGuid = submitterUserGuid;
        TicketPriority = ticketPriority;
        TicketType = ticketType;
        Updated = updated;
        Created = created;
        TicketStatus = ticketStatus;
        Project = project;
        ProjectName = projectName;
        AssignedDeveloperUserGuid = assignedDeveloperUserGuid;
        Comments = comments;
        SubmitterUserName = submitterUserName;
        AssignedDeveloperUserName = assignedDeveloperUserName;
    }
}