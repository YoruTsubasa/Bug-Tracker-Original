import { Component } from '@angular/core';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project-service.service";
import {SortPipe} from "../../pipes/sort-pipe";
import {PaginationPipe} from "../../pipes/pagination-pipe";
import {Ticket} from "../../models/ticket";
import {TicketService} from "../../services/ticket-service.service";
import {UserService} from "../../services/user.service";
import {TicketStatus, TicketStatusLabel} from "../../enums/ticketStatus";
import {UserTypeLabelMapping} from "../../enums/userType";
import {TicketTypeLabel} from "../../enums/ticketType";
import {TicketPriorityLabeling} from "../../enums/ticketPriority";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  public ticketName: any;
  public tickets: Ticket[] = [];
  public ticketsCopy: Ticket[] = [];

  public pageIndex: number = 0;
  public pageSize: number = 7;
  public pageNumber: any;

  public ticketStatusLabeling;
  public ticketTypeLabeling;
  public ticketPriorityLabeling;

  constructor(private ticketService: TicketService, private userService: UserService) {

    this.ticketStatusLabeling = TicketStatusLabel;
    this.ticketTypeLabeling = TicketTypeLabel;
    this.ticketPriorityLabeling = TicketPriorityLabeling;
  }

  ngOnInit() {
    this.ticketService.getTickets().subscribe((result)=>{
      this.tickets = result;
      this.ticketsCopy = result;
    });
  }


  search(){
    if(!this.ticketName){
      this.ngOnInit();
      return;
    }

    this.tickets = this.ticketsCopy.filter((ticket)=>{
      return ticket.title.toLowerCase().includes(this.ticketName.toLowerCase());
    });
  }

  ascending: boolean = false;
  sort(key: string){
    this.ascending = !this.ascending;
    let sortPipe = new SortPipe();
    this.tickets = sortPipe.transform(this.tickets, key, this.ascending);
  }

  paginate(){
    if(isNaN(parseInt(this.pageNumber)))
      return;

    if(parseInt(this.pageNumber) < 0)
      return;

    if(Number(this.pageNumber) * this.pageSize >= this.ticketsCopy.length){
      console.log('pagination');
      return;
    }

    let paginationPipe = new PaginationPipe();
    this.tickets = paginationPipe.transform(this.ticketsCopy, this.pageSize, Number(this.pageNumber));
  }

  incrementPagination(){
    if((this.pageIndex + 1) * this.pageSize >= this.ticketsCopy.length)
      return;

    this.pageIndex++;
    let paginationPipe = new PaginationPipe();
    this.tickets = paginationPipe.transform(this.ticketsCopy, this.pageSize, this.pageIndex);
  }

  decrementPagination(){
    if((this.pageIndex + 1) * this.pageSize >= this.ticketsCopy.length)
      return;

    if(this.pageIndex -1 < 0)
      return;

    this.pageIndex--;
    let paginationPipe = new PaginationPipe();
    this.tickets = paginationPipe.transform(this.ticketsCopy, this.pageSize, this.pageIndex);
  }
}
