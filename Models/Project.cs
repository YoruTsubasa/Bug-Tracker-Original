using System.ComponentModel.DataAnnotations;

namespace Bug_Tracker.Models;

public class Project
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<Ticket> Tickets { get; set; }

    public Project()
    {
        Guid = Guid.NewGuid();
    }

    public Project(string name, string description, List<Ticket> tickets)
    {
        Guid = Guid.NewGuid();
        Name = name;
        Description = description;
        Tickets = tickets;
    }
}