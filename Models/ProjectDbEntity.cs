using System.ComponentModel.DataAnnotations;

namespace Bug_Tracker.Models;

public class ProjectDbEntity
{
    public Guid Guid { get; set; }
    [Key]
    public int ProjectDbEntityID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    
    public ICollection<TicketDbEntity> Tickets { get; set; }

    public ProjectDbEntity()
    {
        Guid = Guid.NewGuid();
    }

    public ProjectDbEntity(string name, string description, List<TicketDbEntity> ticketDbEntities)
    {
        Guid = Guid.NewGuid();
        Name = name;
        Description = description;
        Tickets = ticketDbEntities;
    }
}