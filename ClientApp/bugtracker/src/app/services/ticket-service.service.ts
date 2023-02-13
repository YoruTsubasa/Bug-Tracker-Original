import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../models/ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private userAPI = "tickets";
  constructor(private httpService: HttpClient) { }

  getTickets() : Observable<Ticket[]>{
    var url = this.userAPI + '/';
    return this.httpService.get<Ticket[]>(url);
  }

  getTicket(guid: string) : Observable<Ticket>{
    var url = this.userAPI + '/' + guid;
    return this.httpService.get<Ticket>(url);
  }
}
