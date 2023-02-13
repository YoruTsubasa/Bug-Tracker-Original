import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TicketService} from "../../services/ticket-service.service";
import {Ticket} from "../../models/ticket";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit{
  public ticketGuid: string = '';
  public ticket: Ticket = new Ticket();

  constructor(private route: ActivatedRoute, private ticketService: TicketService) {
    this.route.params.subscribe((params)=>{
     this.ticketGuid = params['guid'];
    });
  }

  ngOnInit() {
    this.ticketService.getTicket(this.ticketGuid).subscribe((result)=> {
      this.ticket = result;
    });
  }



}
