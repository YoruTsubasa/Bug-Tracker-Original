import {TicketType} from "../enums/ticketType";
import {TicketPriority} from "../enums/ticketPriority";
import {TicketStatus} from "../enums/ticketStatus";

export class Ticket {
  guid: string = '';
  title: string = '';
  description: string = '';
  projectGuid: string = '';
  projectName: string = '';
  submitterUserGuid: string = '';
  SubmitterUserName: string = '';
  assignedDeveloperUserGuid: string = '';
  assignedDeveloperUserName: string = '';
  ticketPriority: TicketPriority = TicketPriority.Low;
  ticketType: TicketType = TicketType.Bug;
  ticketStatus: TicketStatus = TicketStatus.Open;
  updated: Date = new Date();
  created: Date = new Date();
  comments: Comment[] = [];
}
