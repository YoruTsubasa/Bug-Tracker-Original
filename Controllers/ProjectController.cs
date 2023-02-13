using System.Net;
using Bug_Tracker.Data;
using Bug_Tracker.Enums;
using Bug_Tracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bug_Tracker.Controllers;


[ApiController]
[Route("/projects")]
public class ProjectController : Controller
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly Authentication _authentication;

    public ProjectController(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
        _authentication = new Authentication(context, configuration);
    }
    
    [HttpGet("")]
    public async Task<IActionResult> GetProjects()
    {
       var projectList = _context.Projects.Select((entry) => new Project()
        {
            Guid = entry.Guid,
            Name = entry.Name,
            Description = entry.Description,
            Tickets = entry.Tickets.Select((ticket)=> new Ticket()
            {
               Guid= ticket.Guid, 
               Title= ticket.Title, 
               Description= ticket.Description, 
               Project = ticket.Project.Guid, 
               SubmitterUserGuid= ticket.Submitter.Guid, 
               TicketPriority = ticket.TicketPriority, 
               TicketType= ticket.TicketType, 
               Updated= ticket.Updated, 
               Created= ticket.Created, 
               TicketStatus= ticket.TicketStatus, 
               Comments= ticket.Comments.Select((comment)=> new Comment()
               {
                   Guid = comment.Guid,
                   Commenter = comment.Commenter,
                   Message = comment.Message,
                   Created = comment.Created,
                   TicketGuid = comment.Ticket.Guid,
               }).ToList(), 
               AssignedDeveloperUserGuid = ticket.AssignedDeveloper.Guid, 
            }).ToList()
        }).ToList();
       
       return Ok(projectList);
    }

}