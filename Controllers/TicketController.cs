using System.Net;
using Bug_Tracker.Data;
using Bug_Tracker.Enums;
using Bug_Tracker.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bug_Tracker.Controllers;


[ApiController]
[Route("/tickets")]
public class TicketController : Controller
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly Authentication _authentication;

    public TicketController(DataContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
        _authentication = new Authentication(context, configuration);
    }
    
    [HttpGet("")]
    public async Task<IActionResult> GetTickets()
    {
        var ticketList = _context.Tickets.Select((ticket) => new Ticket()
        {
            Guid = ticket.Guid,
            Title = ticket.Title,
            Description = ticket.Description,
            Project = ticket.Project.Guid,
            ProjectName = ticket.Project.Name,
            SubmitterUserGuid = ticket.Submitter.Guid,
            SubmitterUserName = ticket.Submitter.FirstName + " " + ticket.Submitter.LastName,
            TicketPriority = ticket.TicketPriority,
            TicketType = ticket.TicketType,
            Updated = ticket.Updated,
            Created = ticket.Created,
            TicketStatus = ticket.TicketStatus,
            Comments = ticket.Comments.Select((comment) => new Comment()
            {
                Guid = comment.Guid,
                Commenter = comment.Commenter,
                Message = comment.Message,
                Created = comment.Created,
                TicketGuid = comment.Ticket.Guid,
            }).ToList(),
            AssignedDeveloperUserGuid = ticket.AssignedDeveloper.Guid,
            AssignedDeveloperUserName = ticket.AssignedDeveloper.FirstName + " " + ticket.AssignedDeveloper.LastName
        }).ToList();
       
       return Ok(ticketList);
    }

    [HttpGet("{ticketGuid}")]
    public async Task<IActionResult> GetTickets([FromRoute] Guid ticketGuid)
    {
        return Ok((from ticketEntry in _context.Tickets where ticketEntry.Guid == ticketGuid select ticketEntry).First());
    }


}